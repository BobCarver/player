const // imports
 {spawn} = require('child_process'),
 {PassThrough} = require('stream'),
 library = require('../music/index.js'),
 announcements = require('../announcements');

const // but mutable
    clients = [],   // list of clients that want sse
    playList = {current: 'none', songs:[{id:2, vote:3}, {id:1, vote:2}, {id:0, vote:0}]}

const // constants
    HEADERS = {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        // 'Keep-Alive': 'timeout=120',
        'X-Accel-Buffering': 'no'
    },
    PGM = `/usr/bin/afplay`;    // program used to play song

const
    // use PGM to async play song
    play = async(f) => new Promise(r => spawn(PGM,[f]).once('close', r)),
    // send a message to all clients that are listening for sse
    broadcast =(msg) => clients.forEach( stream => stream.write(msg))
    // broadcast message to inform clients that the playList has been updated
    update = () => broadcast(`event: update\ndata: ${JSON.stringify(playList)}\n\n`);

setInterval(broadcast, 60*1000, ':\n\n') // set up ping

module.exports =  { // exported singleton

    // reorder songs (and optionally add a new song) based on the
    // votes the song has recieved.  Assume the playList is properly ordered
    vote : (id, inc) => {
        if( !library[id] )
            throw Object.assign( new Error(`Song ${id} not found`), {status: 404})

        // compute value of vote and as a side effect remove
        // song from playList if it is in the playList
        const songs = playList.songs
        let vote = 0, indx = songs.findIndex( s => s.id === id)
        if( indx !== -1 ) {
            [{vote}] = songs.splice(indx,1) // remove old element
            vote = Math.max(0, vote + inc)
        }
        // compute where to insert the song and do it.
        const insertWhere = songs.findIndex(e=>e.vote < vote) // where to insert
        if( insertWhere === -1) insertWhere = songs.length
        songs.splice(insertWhere, 0, {id, vote}) // insert element
        update() // notify clients of an update
    },

    // set up stream for event source and add it to the list of clients
    sse: (ctx) => {
        // set up stream
        const stream = new PassThrough();
        clients.push(stream)
        // remove stream from clients on close
        stream.once('close', () => clients.splice(clients.indexOf(stream), 1))
        // send the current value of playList to (only) requesting client
        stream.write(`event: update\ndata: ${JSON.stringify(playList)}\n\n`)

        // buid response
        ctx.req.socket.setNoDelay(true); // do we need this ?
        ctx.set(HEADERS)
        ctx.body = stream;
    },

    // play all songs in playList async
    playAll: async () => {
        while( playList.current = playList.songs.shift().id ) {
            update()    // inform client playList has changed
            await play('music/'+library[playList.current].name)
        }
    }
}
