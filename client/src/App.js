import React, {useState, useEffect}  from 'react';
import FacebookLogin from 'react-facebook-login'
import Song from './components/song'
import Library from './library'

const Login = ({cb}) =>
<FacebookLogin
    appId="2301991643348749"
    autoLoad={true}
    fields="name,email,picture"
    callback={cb} />

    // for our web socket online & focused ????
    // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API

function App() {
  // const [credentials, setCredentials] = useState(undefined)
  const [{current, songs}, setStatus] = useState({current: 'none', songs:[]})
  // const cb = response => {
  //   console.log(response)
  //   setCredentials(response)
  // }

   useEffect( () => {
    const es = new EventSource('/json2')
    console.log('es is: ', es)

    es.addEventListener("update", e => {
      console.log(`setting play list to ${e.data}`);
      setStatus(prev => JSON.parse(e.data))
    })

    return () => {
      console.log('closing event source');
      es.close()}
  }, []
  )

  return  (<><h1>Songs</h1>
  <p>Playing : {current}</p>
  <ul>
    {songs.map(({id, vote}) =>
            <Song
              key={id}
              id={id}
              { ... Library[id]}
              vote= {vote}
            />
    )}
  </ul>
  {/* {!credentials ? <Login cb={cb}/> :''} */}
  </>)


}

export default App;
