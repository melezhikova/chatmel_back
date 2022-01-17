const uuid = require('uuid');

class Chats {
    constructor() {
        this.chatslist = [];
        this.chats = [];
        this.savedMessages = [];
        this.media = [];
    }

    getAllChats() {
        return this.chatslist;
    }

    getChatById(id) {
        const data = JSON.parse(id);
        const chat = this.chats.find((el) => el.id === data.chatId);
        if (chat) {
            if (chat.messages.length < 10) {
                return chat;
            } else if (!data.messageId) {
                return {
                    id: chat.id,
                    interlocutor: chat.interlocutor,
                    pinnedMessage: chat.pinnedMessage,
                    messages: chat.messages.slice(chat.messages.length - 10, chat.messages.length),
                    files: chat.files
                }
            } else if (data.method === 'getmoremsg') {
                const messageIndex = chat.messages.findIndex((el) => el.id === data.messageId);
                let messageToBegin = messageIndex - 10;
                if (messageToBegin < 0) {
                    messageToBegin = 0;
                }
                return {
                    id: chat.id,
                    interlocutor: chat.interlocutor,
                    pinnedMessage: chat.pinnedMessage,
                    messages: chat.messages.slice(messageToBegin, messageIndex),
                    files: chat.files
                }
            } else {
                const messageIndex = chat.messages.findIndex((el) => el.id === data.messageId);
                return {
                    id: chat.id,
                    interlocutor: chat.interlocutor,
                    pinnedMessage: chat.pinnedMessage,
                    messages: chat.messages.slice(messageIndex, chat.messages.length),
                    files: chat.files
                }
            }
          
        } else {
          return 'Чат не найден';
        }
    } 

    getAllSaved () {
        return this.savedMessages;
    }

    getAllMedia () {
        return this.media;
    }

    getAllImages () {
        return this.media.filter((item) => item.includes('image/'));
    }

    getAllVideo () {
        return this.media.filter((item) => item.includes('video/'));
    }

    getAllAudio () {
        return this.media.filter((item) => item.includes('audio/'));
    }
    
    addMessage(obj) {
        const chat = this.chats.find((el) => el.id === obj.id);
        if (chat) {
            const message = {
                id: uuid.v4(),
                author: obj.message.author,
                time: obj.message.time,
                msgdata: obj.message.msgdata,
                saved: false,
                pinned: false,
            }
            chat.messages.push(message);
            if (obj.message.msgdata.files) {
                const arrFiles = Array.from(obj.message.msgdata.files);
                arrFiles.forEach(element => {
                    chat.files.push(element);
                    this.media.push(element);
                });
            }
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
                chat.messages[index].msgdata = obj.message.msgdata;
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
chats.chatslist = [
    {
        id: '987654',
        interlocutor: {
            id: '123456',
            name: 'Василий',
            photo: '../src/img/man-1.png'
        },
    },
    {
        id: '876543',
        interlocutor:  {
            id: '234567',
            name: 'Николай',
            photo: '../src/img/man-2.png'
        }, 
    }
];
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
                id: '00001',
                author: 'interlocutor',
                time: '11:10 24.10.2021',
                msgdata: {text: 'Привет!'},
                saved: false,
                pinned: false,
            },
            {
                id: '00002',
                author: 'interlocutor',
                time: '11:10 24.10.2021',
                msgdata: {text: 'Как дела?'},
                saved: false,
                pinned: false,
            },
            {
                id: '00003',
                author: 'user',
                time: '11:11 24.10.2021',
                msgdata: {text: 'Привет! Все хорошо, как сам?'},
                saved: false,
                pinned: false,
            },
            {
                id: '00004',
                author: 'interlocutor',
                time: '11:12 24.10.2021',
                msgdata: {text: 'и у меня хорошо'},
                saved: false,
                pinned: false,
            },
            {
                id: '00005',
                author: 'interlocutor',
                time: '11:10 04.11.2021',
                msgdata: {text: 'Привет!'},
                saved: false,
                pinned: false,
            },
            {
                id: '00006',
                author: 'interlocutor',
                time: '11:10 04.11.2021',
                msgdata: {text: 'Как дела?'},
                saved: false,
                pinned: false,
            },
            {
                id: '00007',
                author: 'user',
                time: '11:11 04.11.2021',
                msgdata: {text: 'Привет! Все хорошо, как сам?'},
                saved: false,
                pinned: false,
            },
            {
                id: '00008',
                author: 'interlocutor',
                time: '11:12 04.11.2021',
                msgdata: {text: 'и у меня хорошо'},
                saved: false,
                pinned: false,
            },
            {
                id: '00009',
                author: 'user',
                time: '10:00 08.11.2021',
                msgdata: {text: 'Привет!'},
                saved: false,
                pinned: false,
            },
            {
                id: '00010',
                author: 'interlocutor',
                time: '10:05 08.11.2021',
                msgdata: {text: 'Привет! Что нового?'},
                saved: false,
                pinned: false,
            },
            {
                id: '00011',
                author: 'user',
                time: '10:10 08.11.2021',
                msgdata: {text: 'Все по-старому:)'},
                saved: false,
                pinned: false,
            },
            {
                id: '00012',
                author: 'user',
                time: '10:15 08.11.2021',
                msgdata: {text: 'Не забыл, что завтра к 12:00?'},
                saved: false,
                pinned: false,
            },
            {
                id: '00013',
                author: 'interlocutor',
                time: '10:16 08.11.2021',
                msgdata: {text: 'нет, конечно помню)'},
                saved: false,
                pinned: false,
            },
            {
                id: '00014',
                author: 'user',
                time: '10:17 08.11.2021',
                msgdata: {text: 'ну тогда до встречи'},
                saved: false,
                pinned: false,
            },
            {
                id: '00015',
                author: 'user',
                time: '13:17 09.11.2021',
                msgdata: {text: 'Привет! ну как все прошло?'},
                saved: false,
                pinned: false,
            },
            {
                id: '00016',
                author: 'interlocutor',
                time: '13:20 09.11.2021',
                msgdata: {text: 'Вроде бы все хорошо) ждем фидбэк:)'},
                saved: false,
                pinned: false,
            },
            {
                id: '00017',
                author: 'user',
                time: '13:21 09.11.2021',
                msgdata: {text: 'скрестим пальцы)'},
                saved: false,
                pinned: false,
            },
            {
                id: '00018',
                author: 'interlocutor',
                time: '14:20 10.11.2021',
                msgdata: {text: 'Ураааа!!! меня взяли в команду!)'},
                saved: false,
                pinned: false,
            },
            {
                id: '00019',
                author: 'user',
                time: '14:21 10.11.2021',
                msgdata: {text: 'Поздравляю!!! ты этого и вправду достоин!)'},
                saved: false,
                pinned: false,
            },
            {
                id: '00020',
                author: 'interlocutor',
                time: '14:22 10.11.2021',
                msgdata: {text: 'спасибо)'},
                saved: false,
                pinned: false,
            },
            {
                id: '00021',
                author: 'interlocutor',
                time: '14:23 10.11.2021',
                msgdata: {text: 'пойду готовиться) постараюсь оправдать возложенные на меня надежды)'},
                saved: false,
                pinned: false,
            },
            {
                id: '00022',
                author: 'user',
                time: '14:25 10.11.2021',
                msgdata: {text: 'у тебя все получится, даже не сомневайся!'},
                saved: false,
                pinned: false,
            },
            {
                id: '00023',
                author: 'interlocutor',
                time: '14:23 12.11.2021',
                msgdata: {text: 'первый день... полет нормальный:))'},
                saved: false,
                pinned: false,
            },
            {
                id: '00024',
                author: 'user',
                time: '14:25 12.11.2021',
                msgdata: {text: 'отлично!'},
                saved: false,
                pinned: false,
            },
        ],
        files: []
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
                msgdata: {text: 'Hello!'},
                saved: false,
                pinned: false,
            },
            {
                id: '66666',
                author: 'interlocutor',
                time: '12:10 04.11.2021',
                msgdata: {text: 'How are you?'},
                saved: false,
                pinned: false,
            },
            {
                id: '77777',
                author: 'user',
                time: '12:11 04.11.2021',
                msgdata: {text: "Hi! I'm fine, and you?"},
                saved: true,
                pinned: false,
            },
            {
                id: '88888',
                author: 'interlocutor',
                time: '12:12 04.11.2021',
                msgdata: {text: 'me too:)'},
                saved: false,
                pinned: false,
            }
        ],
        files: []
    }

];

module.exports = chats;