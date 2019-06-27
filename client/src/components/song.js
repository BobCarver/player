import React from 'react';
const Song = ({id, name, genere, title, vote}) => (<li>
    <button onClick= {()=>fetch(`up/${id}`)}>+</button>
    ({id}){title} -{genere} [{vote}]
    <button onClick= {()=>fetch(`down/${id}`)}>-</button>
</li>
)
export default Song;
