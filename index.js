process.env['PORT'] = 4000
const app = require('./server/app')
const playList = require('./server/playlist');

    app.listen( 4000 )
    playList.playAll()



