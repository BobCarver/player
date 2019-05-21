//require('dotenv').config();

import Koa from 'koa';
import passport from './passport.mjs';
import routes from './routes.mjs';
import koaBody from 'koa-bodyparser';
import session from 'koa-session';

const app = new Koa();

// Sessions
app.keys = process.env['SESSION_SECRET']
const errorHandler = async   (ctx, next) => {
    try{
        await next();

    } catch ( err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
}

app
.use( koaBody({ jsonLimit: '1kb'}))
.use (errorHandler)
.on('error' , (err, ctx) => {
    // whatever
})
.use(session({}, app))
.use(passport.initialize()) // Initialize Passpor
.use(passport.session()) //restore authentication state, if any, from the session.
.use(routes.routes());
export default app;
