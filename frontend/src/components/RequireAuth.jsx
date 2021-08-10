import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { loginWithToken } from '../reducers/AuthDuck';

const RequireAuth = ({
  isLogged,
  children,
  token,
  loginWithToken,
  authError
}) => {
  const history = useHistory();

  useEffect(() => {
    shouldNavigateAway();
  }, []);

  const shouldNavigateAway = () => {
    if (token !== null && !isLogged) {
      loginWithToken(token);
      return;
    }

    if (!isLogged || authError === 'loginWithToken') {
      history.push('/login');
    }
  };

  return <>{children}</>;
};

const mapStateToProps = ({ auth }) => ({
  isLogged: auth.isLogged,
  token: auth.token,
  authError: auth.error
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ loginWithToken }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RequireAuth);
