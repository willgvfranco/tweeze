import React from 'react';


import { makeStyles } from '@material-ui/core/styles';
import {
  Container
} from '@material-ui/core';

import ControlledExpansionPanels from '../../src/views/Landing/components/acordeaocontrolado';
import {MenuBar} from '../../src/views/Landing/components/Header';
import ContactForm from '../../src/views/Landing/components/ContactForm';

import Footer from '../../src/views/Landing/components/Footer';

const useStyles = makeStyles((theme) => ({
  menuBar: {
    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, #465e78)`,
    filter: 'drop-shadow(2px -2px 5px black)',
    position: 'fixed',
    zIndex: 1000,
    width: '100vw',
    maxWidth: 'none',
    padding: '0 60px'
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function Faq() {
  const classes = useStyles();

  return (
    <>
    <div className="hero-wrapper">
    <Container className={classes.menuBar}>
      <MenuBar />
    </Container> 
    <div>
      <ControlledExpansionPanels 
      style={{padding: "50px", margin: "8px"}}
      />
    </div>
    <ContactForm />
    <Footer />
    </div>

    </>
  );
}
