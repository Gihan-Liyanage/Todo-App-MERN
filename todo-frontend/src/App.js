import SignUp from './layouts/SignUp';
import SignIn from './layouts/SignIn';
import HomePage from './layouts/HomePage';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch } from 'react-router-dom';


function App() {

  return (
    <>
      <CssBaseline />
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/" component={localStorage.token ? HomePage : SignIn} />
      </Switch>
    </>
  );
}

export default App;
