const { parseFile } = require('music-metadata')
const fs = require('fs')

(async ()=>{
const now = (new Date()).getTime();
library = await Promise.all(fs.readdirSync("music").filter(name => /(\.mp3|\.m4a)$/.test(name))
    .map( name =>
        parseFile(`music/${name}`, {duration: true})
        .then(({format:{duration}, common:{title,artist,genere}})=>
            ({name, duration, title, artist, genere})
        )
    ))
    fs.writeFile('music/library.json', JSON.stringify(library), (err) => {
        if (err) throw err;
        console.log('JSON has been saved!');
      });

      fs.writeFile('music/library.js', `export default ${library}`, (err) => {
        if (err) throw err;
        console.log('Javascript has been saved!');
      });
})()

