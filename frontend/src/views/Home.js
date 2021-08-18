import React from 'react';

import { Card } from '@material-ui/core';

import PageTitle from '../components/PageTitle';
import Checkout from '../components/Checkout/Checkout';
import placeholder from '../assets/images/illustrations/pack1/time.svg';

export default function Home() {
  return (
    <>
      <PageTitle
        titleHeading="Tweeze Dashboard"
        titleDescription="Painel de controle de inteligência da Tweeze"
      />

      <Checkout></Checkout>

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
    </>
  );
}
