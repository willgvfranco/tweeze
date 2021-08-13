import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Features from './components/Features';
import Info from './components/Info';
import Pricing from './components/Pricing';
import Feedback from './components/Feedback';
import Trial from './components/Trial';
import ContactForm from './components/ContactForm';

export default function Overview() {
  return (
    <>
      <Header />
      <Features />
      <Info />
      <Pricing />
      <Feedback />
      <Trial />
      <ContactForm />
      <Footer />
    </>
  );
}
