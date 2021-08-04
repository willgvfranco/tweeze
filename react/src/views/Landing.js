import React from 'react';

import Overview1 from '../components/Landing/Overview1';
import Overview2 from '../components/Landing/Overview2';
import Overview3 from '../components/Landing/Overview3';
import Overview4 from '../components/Landing/Overview4';
import MarketingCta from '../example-components/MarketingCta/MarketingCta6';
import Overview6 from '../components/Landing/Overview6';
import PricingTables4 from '../example-components/MarketingPricingTables/MarketingPricingTables4';



export default function Overview() {
  return (
    <>
      <Overview1 />
      <Overview2 />
      <Overview3 />
      <PricingTables4 />
      <MarketingCta />
      <Overview6 />
    </>
  );
}
