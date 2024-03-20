const { Controller } = require('egg');

class RoomController extends Controller {
  async save() {
    const { ctx } = this;
    const from = ctx.request.body;
    const result = await ctx.service.room.save(from);
    ctx.body = { result };
  }
}

module.exports = RoomController;
