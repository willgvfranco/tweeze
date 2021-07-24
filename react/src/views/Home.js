import React from 'react';

import { PageTitle } from '../layout-components';

import DashboardMonitoring1 from '../components/DashboardMonitoring/DashboardMonitoring1';
import DashboardMonitoring2 from '../components/DashboardMonitoring/DashboardMonitoring2';
import DashboardMonitoring3 from '../components/DashboardMonitoring/DashboardMonitoring3';
import DashboardMonitoring4 from '../components/DashboardMonitoring/DashboardMonitoring4';
import DashboardMonitoring5 from '../components/DashboardMonitoring/DashboardMonitoring5';
import DashboardMonitoring6 from '../components/DashboardMonitoring/DashboardMonitoring6';
export default function Home() {
  return (
    <>
      <PageTitle
        titleHeading="Tweeze Dashboard"
        titleDescription="Painel de controle de inteligência da Tweeze"
      />

      <DashboardMonitoring1 />
      <DashboardMonitoring2 />
      <DashboardMonitoring3 />
      <DashboardMonitoring4 />
      <DashboardMonitoring5 />
      <DashboardMonitoring6 />
    </>
  );
}
