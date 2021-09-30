import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const RequireVip = ({ isVip, children }) => {
  useEffect(() => {
    console.log('isVip', isVip);
    // se não é VIP e acabou o Trial, jogar usuário para /pagamento
  }, [isVip]);

  return <>{children}</>;
};

const mapStateToProps = ({ auth }) => ({
  isVip: auth.roles.includes('VIP')
});

export default connect(mapStateToProps)(RequireVip);
