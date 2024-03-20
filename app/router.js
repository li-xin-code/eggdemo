/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.put('/room', controller.room.save);
  router.post('/show-schedule', controller.showSchedule.add);
  router.post('/show-schedule/buy-ticket', controller.showSchedule.buyTicket);
};
