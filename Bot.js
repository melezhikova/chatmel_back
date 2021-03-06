class Bot {
    constructor () {
        this.weather = [
            'Всякий раз, когда люди заводят со мной разговор о погоде, я с несомненностью чувствую, что они имеют в виду что-то другое',
            'Сегодня обещали ванильное небо и нечто чудесное:) Там и правда так хорошо? А то мне не видно отсюда...',
            'Местами облачно, временами ясно, температура приемлемая. Как-то так... Не благодарите)',
            'Обещали дождь "как из ведра". Если дождя еще нет, ждите',
            'Сегодня будет температура и воздух. Возможны осадки и атмосферное давление.',
            'Вчера моя знакомая снимала сохнувшее на балконе бельё и сломала платье... Так что у вас еще тепло!',
            'Сегодня просто чудесная погода, обязательно сходите погулять!:)'
        ];
        this.quote = [
            'Счастье - это не обладание тем, чего желаешь, а желание того, чем обладаешь. (Ошо)',
            'Чудеса - там, где в них верят, и чем больше верят, тем чаще они случаются. (Дени Дидро)',
            'Веди себя так, будто ты уже счастлив, и ты действительно станешь счастливее. (Дейл Карнеги)',
            'Успех — это движение от неудачи к неудаче без потери энтузиазма. (Уинстон Черчилль)',
            'Если вы не совершаете ошибок, значит, вы и не пытаетесь что-то сделать. (Коулмен Хокинс)',
            'Любая проблема – это шанс проявить себя. (Дюк Эллингтон)',
            'Для того чтобы получить то, чего вы хотите от жизни, совершенно необходимо сделать первый шаг: решить, чего именно вы хотите. (Бен Стайн)'
        ];
        this.horoscope = [
            'Благоприятный день для общения. Запланированные встречи проходят хорошо, но и случайные радуют не меньше.',
            'Вероятно начало дружеских или романтических отношений.',
            'День неожиданных открытий. Можно по-новому взглянуть на привычные вещи, догадаться о том, что долго хранилось в тайне.',
            'Не исключено, что появятся совершенно новые цели, ради достижения которых вы будете готовы отказаться от задуманного раньше.',
            'День обещает приятные сюрпризы, подарки, а также удачные покупки. Могут удачно решиться финансовые вопросы, тревожившие вас в последнее время.',
            'Приятный плодотворный день. Можно отлично справиться со сложными делами',
            'Порой приходится вмешиваться в чужие дела. Вам удается сделать это тактично и деликатно, никого не обижая.'
        ];
        this.news = [
            'В Нижнем Тагиле из ледового городка на Театральной площади пропала Баба-яга',
            'НАТО пытается все же продвигаться на восток',
            'США рассмотрят введение очередного пакета санкций против России',
            'Число заразившихся короновирусом за сутки впервые снижается',
            'Плод беременной мумии сохранился благодаря необычному процессу разложения',
            'Золотую рыбку научили управлять автомобилем ради получения еды',
            'Курортный сбор в Сочи с 1 января вырос в пять раз',
            'На Галапагосах началось извержение вулкана Вулф',
        ];
        this.exchangeRates = [
            'USD 74.2926, EUR 84.0695',
            'USD 75.3926, EUR 85.0785',
            'USD 73.2896, EUR 83.6795',
            'USD 74.3544, EUR 84.5587',
            'USD 73.2587, EUR 83.8545',
        ];
        
        this.messages = [];
    }

    getBotMessages () {
        return this.messages;
    }

    getRandom(id) {
        let text;
        switch (id) {
            case 'weather':
                text = this.weather[Math.floor(Math.random() * this.weather.length)];
                break;
            case 'quote':
                text = this.quote[Math.floor(Math.random() * this.quote.length)];
                break;
            case 'horoscope':
                text = this.horoscope[Math.floor(Math.random() * this.horoscope.length)];
                break;
            case 'news':
                text = this.news[Math.floor(Math.random() * this.news.length)];
                break;
            case 'exchangeRates':
                text = this.exchangeRates[Math.floor(Math.random() * this.exchangeRates.length)];
                break;
        default:
            text = 'Что-то я не разобрал, что конкретно Вы имели ввиду?...'    
            break;            
        }
        const message = {
            author: 'bot',
            text: text,
        }
        this.addBotMessage(message);
        return message;
    }

    addBotMessage(message) {
        this.messages.push(message);
    }
}

const bot = new Bot ();

module.exports = bot;