import React, {useState, useEffect}  from 'react';
import FacebookLogin from 'react-facebook-login'
import Song from './components/song'
import Library from './library'

const fbDefs = {
    appId: "2301991643348749",
    autoLoad: true,
    fields: "name,email,picture"
}

    // for our web socket online & focused ????
    // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API

function App() {
  const [credentials, setCredentials] = useState(undefined)
  const [{current, songs}, setStatus] = useState({current: 'none', songs:[]})

   useEffect( () => {
    const es = new EventSource('/json2')
    es.addEventListener("update", e => setStatus(JSON.parse(e.data)))

    return () => es.close()
  }, []
  )

  return  (<>
    <h1>Songs</h1>
    <p>Playing : {current  !== 'none' ? Library[current].title : 'none'}</p>
    <ul>
      {songs.map(({id, vote}) => <Song key={id} {...Library[id]} id={id} vote={vote}/>)}
    </ul>
    {!credentials && <FacebookLogin {...fbDefs} callback={r => {setCredentials(r);
    console.log(r)}}/>}
  </>)
}

export default App;
