import React, {useState} from 'react';
import FacebookLogin from 'react-facebook-login'

const responseFacebook = (response) => {
    console.log(response);
  }

const Login = (params) => {
    const isLoggedIn = useState(false)
    const id = useState(undefined)
    return <FacebookLogin
    appId="1088597931155576"
    autoLoad={true}
    fields="name,email,picture"
    callback={responseFacebook} />
}

export default Login;