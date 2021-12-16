const uuid = require('uuid');

class Interlocutor {
    constructor() {
      this.interlocutors = [];
    }
  
    getAllInterlocutors() {
      return this.interlocutors;
    }
  
    getInterlocutorById(id) {
      const interlocutor = this.interlocutors.find((el) => el.id === id);
      if (interlocutor) {
        return interlocutor;
      } else {
        return 'interlocutor не найден';
      }
    } 
    
    addInterlocutor (name) {
      const check = this.interlocutors.find((el) => el.name === name);
      if (check) {
        return false;
      } else {
        const id = uuid.v4();
        const user = {
          id,
          name,
          photo: '../src/img/user-without-photo.png'
        };
        this.interlocutors.push(user);
        return user;
      }
    }
}

const intrl = new Interlocutor();
intrl.interlocutors = [
  {
    id: '123456',
    name: 'Василий',
    photo: '../src/img/man-1.png'
  },
  {
    id: '234567',
    name: 'Николай',
    photo: '../src/img/man-2.png'
  },
  {
    id: '345678',
    name: 'Фёкла',
    photo: '../src/img/woman-1.png'
  }
]

module.exports = intrl;
  