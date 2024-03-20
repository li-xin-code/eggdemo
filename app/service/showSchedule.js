const CommonService = require('./common');

class ShowScheduleService extends CommonService {
  tablename() {
    return 'show_schedule';
  }
  async add(form) {
    const { roomId } = form;
    const room = await this.app.dao.room.find(roomId);
    const { seats } = room;
    const sum = seats.split(',').map(Number).reduce((accumulator, currentValue) => accumulator + currentValue);
    form.ticketQuantity = sum;
    await this.app.dao.showSchedule.insert(form);
    return true;
  }
}

module.exports = ShowScheduleService;
