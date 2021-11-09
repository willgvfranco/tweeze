import React from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, Card, Button } from '@material-ui/core';

import illustration2 from '../../../assets/images/illustrations/question.svg';

const Trial = () => {
  return (
    <Container className="margintop">
      <Card className="card-box p-0 mb-spacing-6-x2">
        <Grid container spacing={0}>
          <Grid item lg={5} className="d-flex align-items-center">
            <img alt="..." className="w-100 p-4 p-lg-0" src={illustration2} />
          </Grid>
          <Grid item lg={7} className="d-flex align-items-center">
            <div className="p-4 text-center text-lg-left p-lg-5">
              <div className="bg-warning btn-icon mx-auto mx-lg-0 text-white font-size-xl d-50 rounded mb-4">
                <FontAwesomeIcon icon={['far', 'lightbulb']} />
              </div>
              <h4 id="contato" className="display-4 font-weight-bold mb-3 ">
                Está em dúvida?
              </h4>
              <p className="text-warning mb-4 font-size-lg line-height-2">
                Experimente o Trial por 14 dias de graça! Sem compromisso!
              </p>
              <NavLink className="nav-link-simple" to="/cadastro">
                <Button className="btn-warning text-uppercase font-weight-bold px-4 font-size-sm">
                  <span className="btn-wrapper--label">Comece agora</span>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                  </span>
                </Button>
              </NavLink>
            </div>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default Trial;
