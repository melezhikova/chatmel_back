const uuid = require('uuid');

class Chats {
    constructor() {
        this.chats = [];
        this.savedMessages = [];
    }

    getAllChats() {
        return this.chats;
    }

    getChatById(id) {
        const chat = this.chats.find((el) => el.id === id);
        if (chat) {
          return chat;
        } else {
          return 'Чат не найден';
        }
    } 

    getAllSaved () {
        return this.savedMessages;
    }
    
    addMessage(obj) {
        const chat = this.chats.find((el) => el.id === obj.id);
        if (chat) {
            const message = {
                id: uuid.v4(),
                author: obj.message.author,
                time: obj.message.time,
                text: obj.message.text,
                saved: false,
                pinned: false,
            }
            chat.messages.push(message);
            return message.id;
        } else {
          return 'Чат не найден';
        }
    }

    deleteMessage (obj) {
        const chat = this.chats.find((el) => el.id === obj.id);
        if (chat) {
            const msgToDelete = chat.messages.findIndex((el) => el.id === obj.message.id);
            if (msgToDelete) {
                chat.messages.splice(msgToDelete, 1);
                return 'Сообщение удалено';
            } else {
                return 'Сообщение не найдено';
            }
        } else {
          return 'Чат не найден';
        }
    }

    updateMessage (obj) {
        const chat = this.chats.find((el) => el.id === obj.id);
        if (chat) {
            const index = chat.messages.findIndex((el) => el.id === obj.message.id);
            if (index !== -1) {
                chat.messages[index].id = obj.message.id;
                chat.messages[index].author = obj.message.author;
                chat.messages[index].time = obj.message.time;
                chat.messages[index].text = obj.message.text;
                chat.messages[index].saved = obj.message.saved;
                chat.messages[index].pinned = obj.message.pinned;
                return 'Сообщение обновлено';
            } else {
                return 'Сообщение не найдено';
            }
        } else {
          return 'Чат не найден';
        }
    }

    updatePropertySaved (obj) {
        const chat = this.chats.find((el) => el.id === obj.id);
        if (chat) {
            const index = chat.messages.findIndex((el) => el.id === obj.message.id);
            if (index !== -1) {
                chat.messages[index].saved = 'false';
                return 'Property saved - false';
            } else {
                return 'Сообщение не найдено';
            } 
        } else {
            return 'Чат не найден';
        }
    }

    addSavedMessage(obj) {
        this.savedMessages.push(obj);
        return 'Сообщение добавлено в избранное';
    }

    deleteSavedMessage(id) {
        const messageIndex = this.savedMessages.findIndex((el) => el.message.id === id);
        if (messageIndex !== -1) {
            this.savedMessages.splice(messageIndex, 1);
            return 'Сообщение удалено из избранного';
        } else {
            return 'Сообщение не найдено';
        }
    }

    addPinnedMessage(obj) {
        const chat = this.chats.find((el) => el.id === obj.id);
        if (chat) {
            chat.pinnedMessage = obj.message;
            return 'Сообщение закреплено';
        } else {
          return 'Чат не найден';
        }
    }

    deletePinnedMessage(obj) {
        const chat = this.chats.find((el) => el.id === obj.id);
        if (chat) {
            chat.pinnedMessage = null;
            return 'Сообщение откреплено';
        } else {
          return 'Чат не найден';
        }
    }

    
}

const chats = new Chats ();
chats.chats = [
    {
        id: '987654',
        interlocutor: {
            id: '123456',
            name: 'Василий',
            photo: '../src/img/man-1.png'
        },
        pinnedMessage: null,
        messages: [
            {
                id: '11111',
                author: 'interlocutor',
                time: '11:10 04.11.2021',
                text: 'Привет!',
                saved: false,
                pinned: false,
            },
            {
                id: '22222',
                author: 'interlocutor',
                time: '11:10 04.11.2021',
                text: 'Как дела?',
                saved: false,
                pinned: false,
            },
            {
                id: '33333',
                author: 'user',
                time: '11:11 04.11.2021',
                text: 'Привет! Все хорошо, как сам?',
                saved: false,
                pinned: false,
            },
            {
                id: '44444',
                author: 'interlocutor',
                time: '11:12 04.11.2021',
                text: 'и у меня хорошо',
                saved: false,
                pinned: false,
            }
        ]
    },
    {
        id: '876543',
        interlocutor:  {
            id: '234567',
            name: 'Николай',
            photo: '../src/img/man-2.png'
        },
        pinnedMessage: null,
        messages: [
            {
                id: '55555',
                author: 'interlocutor',
                time: '12:10 04.11.2021',
                text: 'Hello!',
                saved: false,
                pinned: false,
            },
            {
                id: '66666',
                author: 'interlocutor',
                time: '12:10 04.11.2021',
                text: 'How are you?',
                saved: false,
                pinned: false,
            },
            {
                id: '77777',
                author: 'user',
                time: '12:11 04.11.2021',
                text: "Hi! I'm fine, and you?",
                saved: true,
                pinned: false,
            },
            {
                id: '88888',
                author: 'interlocutor',
                time: '12:12 04.11.2021',
                text: 'me too:)',
                saved: false,
                pinned: false,
            }
        ]
    }

];

module.exports = chats;