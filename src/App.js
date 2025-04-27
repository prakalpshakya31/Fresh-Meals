import { Switch, Route, Redirect } from 'react-router-dom';

// import Layout from './components/Layout/Layout';
// import UserProfile from './components/Profile/UserProfile';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { useContext} from 'react';
import AuthContext from './store/auth-context'

function App() {
  const authCtx = useContext(AuthContext) ;

  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      {!authCtx.isLoggedIn && <Route path="/auth">
        <AuthPage />
      </Route>}
      <Route path='*'>
        <Redirect to='/' />
      </Route>
    </Switch>
  );
}

export default App;
