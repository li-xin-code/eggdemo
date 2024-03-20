const { Controller } = require('egg');

class ShowScheduleController extends Controller {
  async add() {
    const { ctx } = this;
    const from = ctx.request.body;
    const result = await ctx.service.showSchedule.add(from);
    ctx.body = { result };
  }
  async buyTicket() {
    const { ctx } = this;
    const from = ctx.request.body;
    const result = await ctx.service.ticket.buyTicket(from);
    ctx.body = { result };
  }
}

module.exports = ShowScheduleController;
