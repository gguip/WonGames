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

async function createManyToManyData(products) {
  const developers = new Set();
  const publishers = new Set();
  const categories = new Set();
  const platforms = new Set();

  products?.forEach((product) => {
    const { developer, publisher, genres, supportedOperatingSystems } = product;

    genres?.forEach((item) => {
      categories.add(item);
    });

    supportedOperatingSystems?.forEach((item) => {
      platforms.add(item);
    });

    developers.add(developer);
    publishers.add(publisher);
  });

  const createCall = (set, entityName) =>
    Array.from(set).map((name) => create(name, entityName));

  return Promise.all([
    ...createCall(developers, "api::developer.developer"),
    ...createCall(publishers, "api::publisher.publisher"),
    ...createCall(categories, "api::category.category"),
    ...createCall(platforms, "api::platform.platform"),
  ]);
}

module.exports = createCoreService("api::game.game", ({ strapi }) => ({
  async populate(params) {
    const gamesAPIUrl = `https://www.gog.com/games/ajax/filtered?mediaType=game&page=1&sort=popularity`;

    const {
      data: { products },
    } = await axios.get(gamesAPIUrl);

    await createManyToManyData(products);
  },
}));
