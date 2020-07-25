import React from 'react';
import FetchData from './features/FetchData';
import MyList from './features/MyList';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
    return (
        <Provider store={store}>
        <Router>
            <div className="App">
                <nav className="navigation">
                    <ul>
                        <Link to="/">
                            <li>Movie list</li>
                        </Link>
                        <Link to="/list">
                            <li>My List</li>
                        </Link>
                    </ul>
                </nav>
                <Switch>
                    <Route path='/' exact component={FetchData} />
                    <Route path='/list' component={MyList} />
                </Switch>
            </div>
        </Router>
        </Provider>
    );
}

export default App;
