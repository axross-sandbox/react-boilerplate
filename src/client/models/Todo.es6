import moment from 'moment';

class Todo {
  constructor(params) {
    Object.keys(params).forEach(key => {
      this[key] = params[key];
    });
  }

  static toJSON(self) {
    return {
      id:             self.id,
      title:          self.title,
      isFinished:     self.isFinished,
      createdAt:      self.createdAt.format(),
      lastModifiedAt: self.lastModifiedAt.format(),
    };
  }

  static fromJSON(json) {
    return new Todo({
      id:             parseInt(json.id, 10) || 0,
      title:          String(json.title),
      isFinished:     !!json.isFinished,
      createdAt:      moment(json.createdAt),
      lastModifiedAt: moment(json.lastModifiedAt),
    });
  }
}

export default Todo;
