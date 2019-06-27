const {vote, sse} = require('./playlist')

module.exports = new require('koa-router')()
.get('/', (ctx, next) => {
  cconsole.log(ctx);
  ctx.body = ctx;
})
.get('/up/:id(\\d+)', (ctx) => vote(parseInt(ctx.params.id), 1))
.get('/down/:id(\\d+)', (ctx) => vote(parseInt(ctx.params.id), -1))
.get('/json2', sse)
  // https://stackoverflow.com/questions/53295738/koa-sse-connection-reconnecting
  // https://github.com/yklykl530/koa-sse/tree/master/lib

