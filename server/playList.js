const
    {spawn} = require('child_process'),
    {PassThrough} = require('stream'),
    library = require('../music/index.js'),
    announcements = require('../announcements');

const playList = {current: 'none', songs:[{id:2, vote:3}, {id:1, vote:2}, {id:0, vote:0}]}
const clients = []

const
    HEADERS = {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        // 'Keep-Alive': 'timeout=120',
        'X-Accel-Buffering': 'no'
    },
    PGM = `/usr/bin/afplay`;

const
    play = async(f) => new Promise(r => spawn(PGM,[f]).once('close', r)),
    broadcast =(msg) => clients.forEach( stream => stream.write(msg))
    update = () => broadcast(`event: update\ndata: ${JSON.stringify(playList)}\n\n`);

setInterval(broadcast, 60*1000, ':\n\n')

module.exports =  {

    vote : (id, inc) => {
        if( !library[id] )
            throw Object.assign( new Error(`Song ${id} not found`), {status: 404})
        const songs = playList.songs
        let vote = 0, indx = songs.findIndex( s => s.id === id)
        if( indx !== -1 ) {
            [{vote}] = songs.splice(indx,1) // remove old element
            vote = Math.max(0, vote + inc)
        }
        indx = songs.findIndex(e=>e.vote < vote) // where to inser
        if( indx === -1) indx = songs.length
        songs.splice(indx, 0, {id, vote}) // insert element
        update()
    },

    sse: (ctx) => {
        const stream = new PassThrough();
        clients.push(stream)
        stream.once('close', () => clients.splice(clients.indexOf(stream), 1))
        stream.write(`event: update\ndata: ${JSON.stringify(playList)}\n\n`)

        ctx.req.socket.setNoDelay(true); // do we need this ?
        ctx.set(HEADERS)
        ctx.body = stream;
    },

    playAll: async () => {
        while( playList.current = playList.songs.shift().id ) {
            update()
            await play('music/'+library[playList.current].name)
        }
    },

}
