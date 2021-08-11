import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  Container,
  Button,
  Typography,
  TextField
} from '@material-ui/core';

import Header from './components/Header';
import Footer from './components/Footer';
import Features from './components/Features';
import Info from './components/Info';
import Pricing from './components/Pricing';
import MarketingTestimonial from '../../components/MarketingTestimonials';
import MarketingCta from '../../components/MarketingCta';

const Step1 = () => {
  return (
    <>
      <Container id="contato">
        <div className="p-4">
          <h5 className="font-size-xl mb-1 font-weight-bold">
            Dúvidas ainda sobre clipping?
          </h5>
          <p className="text-black-50 mb-4">
            Gostaria de entender mais sobre nossos serviços?
          </p>
          <form id="form_contato" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="ajusteformulario" md={12} lg={12} xl={12}>
                <TextField
                  fullWidth
                  label="Nome"
                  type="Nome"
                  variant="outlined"
                />
              </label>
            </div>
            <div>
              <label className="ajusteformulario" md={12} lg={12} xl={12}>
                <TextField
                  fullWidth
                  label="Telefone"
                  type="Telefone"
                  variant="outlined"
                />
              </label>
            </div>
            <div>
              <label className="ajusteformulario" md={12} lg={12} xl={12}>
                <TextField
                  fullWidth
                  label="E-mail"
                  type="E-mail"
                  variant="outlined"
                />
              </label>
            </div>
            <div>
              <label className="ajusteformulario" md={12} lg={12} xl={12}>
                <TextField
                  className="ajusteformulario"
                  fullWidth
                  label="Assunto"
                  multiline
                  rows={8}
                  variant="outlined"
                />
              </label>
            </div>
            <Button
              variant="contained"
              style={{
                borderRadius: '10rem',
                fontSize: '1rem',
                width: '8rem'
              }}
              className="btn-primary my-3 px-4">
              Enviar
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

function FormsSteppers() {
  return (
    <Card className="card-box">
      <div className="r">
        <div className=""></div>
      </div>
      <div>
        <div className="bg-secondary mb-3"></div>
        <div>
          <div>
            <Step1 />
          </div>
          <div className="mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary"></div>
        </div>
      </div>
    </Card>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}>
      {value === index && <div>{children}</div>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export default function Overview() {
  return (
    <>
      <Header />
      <Features />
      <Info />
      <Pricing />
      <MarketingTestimonial />
      <MarketingCta />
      <FormsSteppers />
      <Footer />
    </>
  );
}
