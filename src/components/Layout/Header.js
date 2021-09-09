import React from 'react';

import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

const Header = (props) => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Fresh Meals</h1>
        {!isLoggedIn && <Link to="/auth">Login</Link>}
        {isLoggedIn && (
          <button onClick={logoutHandler}>Logout</button>
        )}
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img
          src={mealsImage}
          alt="A table full of delicious food!"
        />
      </div>
    </React.Fragment>
  );
};

export default Header;
