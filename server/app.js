//require('dotenv').config();

const Koa = require('koa')
const serve = require('koa-static')
const routes = require('./routes.js')

const app = new Koa();

const errorHandler = async (ctx, next) => {
    try{
        await next();
    } catch ( err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
}

app
    .use(serve('./public'))
    .use(serve('./images'))
    .use (errorHandler)
    .on('error' , (err, ctx) => {
        console.log('error:', err)
        debugger;
        // whatever
    })
    .use(async (ctx, next) => {
        console.log('enter ', ctx)
        await next()
        console.log('finish');
    })
    .use(routes.routes());
module.exports = app;
