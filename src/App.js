import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Chat from './components/Chat/Chat';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <div className="app__body">
          <Sidebar />
          <Switch>
            <Route path="/room/:roomId" component={Chat} />
            {/* <Route exact path="/" component={App} /> */}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
