const Service = require('egg').Service;
const Mutex = require('async-mutex').Mutex;

class TicketService extends Service {
  constructor(ctx) {
    super(ctx);
    this.buyTicketMutex = new Mutex();
  }

  async buyTicket(ticketInfo) {
    const { showId, seatNo } = ticketInfo;
    const seat = seatNo.split('-');
    const show = await this.app.dao.showSchedule.find(showId);
    if (show.ticketQuantity < 1) {
      throw new Error('sell out');
    }
    const { roomId } = show;
    if (roomId === null) {
      throw new Error('invalid roomId');
    }
    const room = await this.app.dao.room.find(roomId);
    const { seats } = room;
    const seatArray = seats.split(',');
    const rowNo = parseInt(seat[0]);
    const colNo = parseInt(seat[1]);
    if (seatArray.length < rowNo) {
      throw new Error('invalid seatNo');
    }
    if (parseInt(seatArray[rowNo - 1]) < colNo) {
      throw new Error('invalid seatNo');
    }
    const sellRecord = {
      showId,
      seatNo,
    };
    const count = await this.app.dao.sellRecord.countByShowIdAndSeatNo(showId, seatNo);
    if (count !== 0) {
      throw new Error('The ticket for this seat has been sold.');
    }
    // lock，todo 这里应该降低锁的粒度，控制到场次或者场次+座位行号
    await this.buyTicketMutex.acquire().then(async release => {
      await this.app.mysql.beginTransactionScope(async conn => {
        const count = await this.app.dao.sellRecord.countByShowIdAndSeatNo(showId, seatNo, conn);
        if (count !== 0) {
          throw new Error('The ticket for this seat has been sold.');
        }
        const ok = await this.app.dao.showSchedule.deductionTicket(showId, 1, conn);
        if (!ok) {
          throw new Error('buy ticket fail.');
        }
        await this.app.dao.sellRecord.insert(sellRecord, conn);
        return { success: true };
      }, this.ctx);
      release();
    });
    return true;
  }
}

module.exports = TicketService;
