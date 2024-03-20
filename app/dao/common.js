const { convertKeysUnderscoreToCamelCase, convertKeysCamelCaseToUnderscore } = require('../public/tool');

class CommonDao {
  constructor(app) {
    this.app = app;
  }
  tablename() {
    throw new Error('invalid table name');
  }

  toUnderscore(obj) {
    return convertKeysCamelCaseToUnderscore(obj);
  }

  toCamelCase(obj) {
    return convertKeysUnderscoreToCamelCase(obj);
  }

  async save(data) {
    const { id } = data;
    const tablename = this.tablename();
    if (id > 0) {
      // 更新数据库
      const result = await this.app.mysql.update(tablename, data, {
        where: { id },
      });
      if (result.affectedRows === 1) {
        return true;
      }
    } else {
      // 插入新记录
      return await this.insert(data);
    }
    return false;
  }

  async find(id) {
    const record = await this.app.mysql.get(this.tablename(), { id });
    return this.toCamelCase(record);
  }
  async insert(data, conn = this.app.mysql) {
    const record = this.toUnderscore(data);
    const result = await conn.insert(this.tablename(), record);
    if (result.affectedRows === 1) {
      return true;
    }
  }
}

module.exports = CommonDao;
