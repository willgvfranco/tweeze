import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { loginWithToken } from '../reducers/AuthDuck';

const RequireAuth = ({ isLogged, children, token, loginWithToken, status }) => {
  const history = useHistory();

  useEffect(() => {
    shouldNavigateAway();
  }, [isLogged]);

  const shouldNavigateAway = () => {
    if (token !== null && !isLogged) {
      loginWithToken(token);
      return;
    }

    if (
      !isLogged ||
      (status.description.includes('loginWithToken') && status.type === 'error')
    ) {
      history.push('/login');
    }
  };

  return <>{children}</>;
};

const mapStateToProps = ({ auth }) => ({
  isLogged: auth.isLogged,
  token: auth.accessToken,
  status: auth.status
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ loginWithToken }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RequireAuth);
