import React from 'react';

import Overview1 from '../components/Landing/Overview1';
import Overview2 from '../components/Landing/Overview2';
import Overview3 from '../components/Landing/Overview3';
import Overview6 from '../components/Landing/Overview6';
import MarketingTestimonial from '../components/MarketingTestimonials';
import MarketingCta from '../components/MarketingCta';
import PricingTables from '../components/PricingTables';

export default function Overview() {
  return (
    <>
      <Overview1 />
      <Overview2 />
      <Overview3 />
      <PricingTables />
      <MarketingTestimonial />
      <MarketingCta />
      <Overview6 />
    </>
  );
}
