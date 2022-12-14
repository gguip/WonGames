/**
 * game controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::game.game", () => ({
  async populate(ctx) {
    console.log("Starting to populate...");

    await strapi.service("api::game.game").populate();

    ctx.send("Finishied populating!");
  },
}));
