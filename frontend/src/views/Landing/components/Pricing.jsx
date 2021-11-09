import React from 'react';
import { NavLink } from 'react-router-dom';

import { Grid, Container, Card, CardContent, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import svgImage13 from '../../../assets/images/illustrations/businesswoman.svg';

const useStyles = makeStyles((theme) => ({
  planImg: {
    width: '35%',
    [theme.breakpoints.down('sm')]: {
      width: '40%'
    }
  },
  planHeader: {
    margin: '1.5rem 0',
    [theme.breakpoints.down('sm')]: {
      margin: '0'
    }
  },
  featureBox: {
    marginBottom: '3rem',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '1rem'
    }
  }
}));

const Pricing = () => {
  const classes = useStyles();

  return (
    <div className="bg-royal py-3 py-xl-5">
      <Container className="py-3 py-xl-5" style={{ maxWidth: '600px' }}>
        <Card className="modal-content">
          <div className="card-header bg-light d-flex justify-content-center">
            <div id="planos" className={`text-center ${classes.planHeader}`}>
              <h1 className="display-4 text-black mb-2 font-weight-bold">
                Clipping jornalístico
              </h1>
              <p>Tudo que precisa saber sobre o seu tema de interesse</p>
            </div>
          </div>
          <CardContent className="p-3">
            <div className="container-fluid">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <div className="divider-v divider-v-lg" />
                  <div className="py-3">
                    <div
                      className={`${classes.featureBox} feature-box text-center mt-2`}>
                      <img
                        src={svgImage13}
                        className={`mx-auto d-block img-fluid ${classes.planImg}`}
                        alt="..."
                      />
                      <h3 className="font-size-xxl font-weight-bold mt-4">
                        Plano
                      </h3>
                      <p className="text-black-50 mb-4">
                        Produto destinado a profisionais liberais e empresas
                      </p>
                      <NavLink className="nav-link-simple" to="/cadastro">
                        <Button className="btn-first" title="Saiba mais">
                          <span>R$ 399/mês</span>
                        </Button>
                      </NavLink>
                    </div>
                    <div className="divider my-4" />
                    <ul className="list-unstyled text-left font-weight-bold font-size-sm">
                      <li className="px-4 py-2">
                        <div className="badge badge-success badge-circle-inner mr-2">
                          Success
                        </div>
                        Acesso ILIMITADO de palavras chaves
                      </li>
                      <li className="px-4 py-2">
                        <div className="badge badge-success badge-circle-inner mr-2">
                          Success
                        </div>
                        Acesso a milhares de notícias por dia
                      </li>
                      <li className="px-4 py-2">
                        <div className="badge badge-success badge-circle-inner mr-2">
                          Success
                        </div>
                        Envio de e-mail automatizado
                      </li>
                      <li className="px-4 py-2">
                        <div className="badge badge-success badge-circle-inner mr-2">
                          Success
                        </div>
                        Relatório de Clipping
                      </li>
                      <li className="px-4 py-2">
                        <div className="badge badge-success badge-circle-inner mr-2">
                          Success
                        </div>
                        Suport Premium
                      </li>
                    </ul>
                  </div>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Pricing;
