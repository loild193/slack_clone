import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { actionType } from '../../context/reducer'
import { useStateValue } from '../../context/StateProvider'
import { auth, provider } from '../../firebase'
import './Login.scss'

function Login(props) {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

  const signIn = () => {
    auth.signInWithPopup(provider)
      .then(result => {
        localStorage.setItem('user', JSON.stringify(result.user));
        dispatch({
          type: actionType.SET_USER,
          payload: result.user,
        })
        history.push('/');
      })
      .catch(err => {
        alert(err.message);
      })
  }

  return (
    <div className="login">
      <div className="login__container">
        <img src="https://cdn.freebiesupply.com/logos/large/2x/slack-logo-icon.png" alt="Login" />
        <h1>Let's go bro</h1>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  )
}

Login.propTypes = {

}

export default Login

