const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const WS = require('ws');
const cors = require('koa2-cors');
const uuid = require('uuid');

const intrl = require('./Interlocutor');
const chats = require('./Chats');
const bot = require('./Bot');

const app = new Koa();

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  text: true,
  json: true,
}));

app.use(
  cors({
    origin: '*',
    credentials: true,
    'Access-Control-Allow-Origin': true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);


app.use(async (ctx) => {
  let method;
  console.log(ctx.request.query);

  if (ctx.request.method === 'GET') ({ method, id } = ctx.request.query);
  else if (ctx.request.method === 'POST') ({ method, object } = ctx.request.body);

  ctx.response.status = 200;
  switch (method) {
    case 'allInterlocutors': ctx.response.body = intrl.getAllInterlocutors();
      break;
    case 'interlocutById': ctx.response.body = intrl.getInterlocutorById(id);
      break;
    case 'addInterlocutor': ctx.response.body = intrl.addInterlocutor(object.name);
      break;
    case 'allChats': ctx.response.body = chats.getAllChats();
      break;
    case 'chatById': ctx.response.body = chats.getChatById(id);
      break;
    case 'getAllSaved': ctx.response.body = chats.getAllSaved();
      break;
    case 'getAllMedia': ctx.response.body = chats.getAllMedia();
      break;
    case 'getAllImages': ctx.response.body = chats.getAllImages();
      break;
    case 'getAllVideo': ctx.response.body = chats.getAllVideo();
      break;
    case 'getAllAudio': ctx.response.body = chats.getAllAudio();
      break;
    case 'addMessage': ctx.response.body = chats.addMessage(object);
      break;
    case 'deleteMessage': ctx.response.body = chats.deleteMessage(object);
      break;
    case 'updateMessage': ctx.response.body = chats.updateMessage(object);
      break;
    case 'addPinnedMessage': ctx.response.body = chats.addPinnedMessage(object);
      break;
    case 'deletePinnedMessage': ctx.response.body = chats.deletePinnedMessage(object);
      break;
    case 'addSavedMessage': ctx.response.body = chats.addSavedMessage(object);
      break;
    case 'deleteSavedMessage': ctx.response.body = chats.deleteSavedMessage(object.id);
      break;
    case 'updatePropertySaved': ctx.response.body = chats.updatePropertySaved(object);
      break;
    case 'addBotMessage': ctx.response.body = bot.addBotMessage(object);
      break;
    case 'getBotMessages': ctx.response.body = bot.getBotMessages();
      break;
    case 'botmel': ctx.response.body = bot.getRandom(id);
      break;
    default:
      ctx.response.status = 400;
      ctx.response.body = `Unknown method '${method}' in request parameters`;
  }
});

const router = new Router();

router.get('/index', async (ctx) => {
  ctx.response.body = 'hello';
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7000;
const server = http.createServer(app.callback())
const wsServer = new WS.Server({ server });

wsServer.on('connection', (ws, req) => {
  ws.on('message', msg => {
    // console.log('msg');
    // ws.send('response');
    [...wsServer.clients]
    .filter(o => o.readyState === WS.OPEN)
    .forEach(o => o.send('some message'));
  });

  ws.send('welcome');
});

server.listen(port, (error) => {
  if (error) {
    console.log('Error occured:', error);
    return;
  }
  console.log(`Server is listening on ${port} port`);
});