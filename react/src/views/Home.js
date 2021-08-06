import React from 'react';

import PageTitle from '../components/PageTitle';
import TabelaNoticias from '../components/TabelaNoticias';

export default function Home() {
  return (
    <>
      <PageTitle
        titleHeading="Tweeze Dashboard"
        titleDescription="Painel de controle de inteligência da Tweeze"
      />
      <TabelaNoticias />
    </>
  );
}
