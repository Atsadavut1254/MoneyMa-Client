import './App.css';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import Store from './redux/store';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

//Layout
import cardLayout from './components/layouts/cardLayout';
import contactLayout from './components/layouts/contactLayout';
import guestLayout from './components/layouts/guestLayout';
import axios from 'axios';

axios.defaults.baseURL = 'https://money-ma.herokuapp.com/v1/';

const theme = createMuiTheme({
    typography: {
        fontFamily: ['Athiti', 'sans-serif'].join(','),
        h2: {
            fontWeight: 500
        }
    }
});

function App() {
    return (
        <Provider store={Store}>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <Router>
                        <Switch>
                            <Route path="/card" component={cardLayout} />
                            <Route path="/contact" component={contactLayout} />
                            <Route path="/invite" component={guestLayout} />
                        </Switch>
                    </Router>
                </div>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
