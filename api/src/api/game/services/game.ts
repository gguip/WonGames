// /**
//  * game service
//  */

// import { factories } from '@strapi/strapi';

// export default factories.createCoreService('api::game.game', ({ strapi }) => ({
//   async customService(...args) {

//   }
// }));

const { createCoreService } = require("@strapi/strapi").factories;

const axios = require("axios");
const slugify = require("slugify");

async function getGameInfo(slug) {
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  const body = await axios.get(`https://www.gog.com/game/${slug}`);
  const dom = new JSDOM(body.data);

  const description = dom.window.document.querySelector(".description");

  return {
    rating: "FREE",
    short_description: description.textContent.slice(0, 160),
    description: description.innerHTML,
  };
}

async function getByName(name, entityName) {
  const item = await strapi.service(entityName).find({ name });
  console.log("🚀 ~ file: game.ts:35 ~ getByName ~ item", item);
  return item ? item : null;
}

async function create(name, entityName) {
  const item = await getByName(name, entityName);

  if (!item) {
    return await strapi.service(entityName).create({
      data: {
        name,
        slug: slugify(name, { lower: true }),
        publishedAt: new Date(),
      },
    });
  }
}

module.exports = createCoreService("api::game.game", ({ strapi }) => ({
  async populate(params) {
    const gamesAPIUrl = `https://www.gog.com/games/ajax/filtered?mediaType=game&page=1&sort=popularity`;

    const {
      data: { products },
    } = await axios.get(gamesAPIUrl);

    // console.log(products[0]);

    await create(products[1].publisher, "api::publisher.publisher");
    await create(products[1].developer, "api::developer.developer");
  },
}));
