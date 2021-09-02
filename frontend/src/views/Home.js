import React, { useState } from 'react';

import { Card, Button } from '@material-ui/core';
// import { Card } from '@material-ui/core';

import PageTitle from '../components/PageTitle';
import PaymentModal from '../components/PaymentModal';
import placeholder from '../assets/images/illustrations/pack1/time.svg';

const Home = () => {
  const [open, setOpen] = useState(false);

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
        <Button className="btn-primary m-2" onClick={() => setOpen(true)}>
          Payment
        </Button>
      </Card>

      <PaymentModal open={open} onClose={() => setOpen(!open)} />
    </>
  );
};

export default Home;
