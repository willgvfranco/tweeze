import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SocialButton from './SocialButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { loginWithSocialMedia, setStatus } from '../../reducers/AuthDuck';

const SocialButtons = ({ loginWithSocialMedia, setStatus }) => {
  const handleSocialLogin = (user) => loginWithSocialMedia(user);

  const handleSocialLoginFailure = (err) => {
    console.error(err);
    setStatus({
      type: 'error',
      description: 'register/socialRegister',
      msg:
        'Erro ao fazer cadastro por mídia social! Por favor, tente novamente mais tarde'
    });
  };

  return (
    <>
      <SocialButton
        provider="google"
        appId="68730314092-s87t32e8cs2ka2tfqv9kt6quur02kjih.apps.googleusercontent.com"
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}
        className="m-2 btn-pill px-4 font-weight-bold btn-google"
        size="small">
        <span className="btn-wrapper--icon">
          <FontAwesomeIcon icon={['fab', 'google']} />
        </span>
        <span className="btn-wrapper--label">Login com Google</span>
      </SocialButton>
      <SocialButton
        provider="facebook"
        appId="361023348884041"
        onLoginSuccess={handleSocialLogin}
        onLoginFailure={handleSocialLoginFailure}
        className="m-2 btn-pill px-4 font-weight-bold btn-facebook"
        size="small">
        <span className="btn-wrapper--icon">
          <FontAwesomeIcon icon={['fab', 'facebook']} />
        </span>
        <span className="btn-wrapper--label">Login com Facebook</span>
      </SocialButton>
    </>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ loginWithSocialMedia, setStatus }, dispatch);

export default connect(null, mapDispatchToProps)(SocialButtons);
