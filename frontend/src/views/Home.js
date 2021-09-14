import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Card } from '@material-ui/core';

import PageTitle from '../components/PageTitle';
import PaymentModal from '../components/PaymentModal';
import placeholder from '../assets/images/illustrations/pack1/time.svg';

const Home = ({ paymentRefused }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!paymentRefused) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [paymentRefused]);

  return (
    <>
      <PageTitle
        titleHeading="Tweeze Dashboard"
        titleDescription="Painel de controle de inteligência da Tweeze"
      />

      <Card
        style={{
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        className="rounded w-100 bg-white mt-3 p-3">
        <div style={{ fontSize: '1.8rem', opacity: '0.8' }}>
          Em construção..
        </div>
        <img
          alt="..."
          className="img-fluid"
          src={placeholder}
          style={{ width: '50%' }}
        />
      </Card>

      <PaymentModal open={open} setOpen={() => setOpen()} />
    </>
  );
};

const mapStateToProps = ({ payment }) => ({
  paymentRefused: !!payment.refuse
});

export default connect(mapStateToProps)(Home);
