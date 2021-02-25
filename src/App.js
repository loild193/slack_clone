import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat/Chat';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
import { actionType } from './context/reducer';
import { useStateValue } from './context/StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      dispatch({
        type: actionType.SET_USER,
        payload: JSON.parse(localStorage.getItem('user')),
      })
    }
  }, []);

  return (
    <div className="App">
      <Router>
      {
        !user ? <Login /> : 
        <>
          <Header />

          <div className="app__body">
            <Sidebar />
            <Switch>
              <Route path="/room/:roomId" component={Chat} />
              <Route path="/sign-in" component={Login} />
            </Switch>
          </div>
        </>
      }
      </Router>
    </div>
  );
}

export default App;
