import React from 'react';
import Header from './header';
import HeroSections from './HeroSections';
import Features from './features';
import Services from './services';
import SaaS from './SaaS';
import Footer from './footer';
const Landingmain = () => {
  return (
    <div className='p-4'>
      <Header />
      <HeroSections />
      <Features />
      <Services />
      <SaaS />
      <Footer />
    </div>
  );
};

export default Landingmain;
