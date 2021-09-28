import React from 'react';
import { NavLink } from 'react-router-dom';

import { Grid, Container, Card, CardContent, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import svgImage1 from '../../../assets/images/illustrations/business_plan.svg';
import svgImage13 from '../../../assets/images/illustrations/businesswoman.svg';
import svgImage14 from '../../../assets/images/illustrations/powerful.svg';

const useStyles = makeStyles((theme) => ({
  planImg: {
    width: '50%',
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
      <Container className="py-3 py-xl-5">
        <Card className="modal-content">
          <div className="card-header bg-light d-flex justify-content-center">
            <div id="planos" className={`text-center ${classes.planHeader}`}>
              <h1 className="display-4 text-black mb-2 font-weight-bold">
                Planos e preços
              </h1>
              <p className="font-size-lg mb-1 text-black-50">
                <strong>Clipping jornalístico</strong>
              </p>
              <p>Tudo que precisa saber sobre o seu tema de interesse</p>
            </div>
          </div>
          <CardContent className="p-3">
            <div className="container-fluid">
              <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                  <div className="divider-v divider-v-lg" />
                  <div className="py-3">
                    <div
                      className={`${classes.featureBox} feature-box text-center mt-2`}>
                      <img
                        src={svgImage1}
                        className={`mx-auto d-block img-fluid ${classes.planImg}`}
                        alt="..."
                      />
                      <h3 className="font-size-xxl font-weight-bold mt-4">
                        Básico
                      </h3>
                      <p className="text-black-50 mb-4">
                        Cientistas, curiosos e profissionais interessados no
                        mercado financeiro
                      </p>
                      <NavLink className="nav-link-simple" to="/cadastro">
                        <Button
                          variant="text"
                          className="btn-outline-first"
                          title="Saiba mais">
                          <span>R$ 49/mês</span>
                        </Button>
                      </NavLink>
                    </div>
                    <div className="divider my-4" />
                    <ul className="list-unstyled text-left font-weight-bold font-size-sm">
                      <li className="px-4 py-2">
                        <div className="badge badge-success badge-circle-inner mr-2">
                          Success
                        </div>
                        Acesso à 2 grupos de palavras chaves ILIMITADAS
                      </li>
                      <li className="px-4 py-2">
                        <div className="badge badge-success badge-circle-inner mr-2">
                          Danger
                        </div>
                        Support
                      </li>
                      <li className="px-4 py-2">
                        <div className="badge badge-success badge-circle-inner mr-2">
                          Sucess
                        </div>
                        Sem anúncios
                      </li>
                      <li className="px-4 py-2">
                        <div className="badge badge-danger badge-circle-inner mr-2">
                          Danger
                        </div>
                        Envio automatizado por e-mail
                      </li>
                    </ul>
                  </div>
                </Grid>

                <Grid item md={4} xs={12}>
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
                        Padrão
                      </h3>
                      <p className="text-black-50 mb-4">
                        Produto destinado a pequenas e médias empresas
                      </p>
                      <NavLink className="nav-link-simple" to="/cadastro">
                        <Button className="btn-first" title="Saiba mais">
                          <span>R$ 590/mês</span>
                        </Button>
                      </NavLink>
                    </div>
                    <div className="divider my-4" />
                    <ul className="list-unstyled text-left font-weight-bold font-size-sm">
                      <li className="px-4 py-2">
                        <div className="badge badge-success badge-circle-inner mr-2">
                          Success
                        </div>
                        Acesso à 5 grupos de palavras chaves ILIMITADAS
                      </li>
                      <li className="px-4 py-2">
                        <div className="badge badge-success badge-circle-inner mr-2">
                          Success
                        </div>
                        Relatório de Clipping com business intelligence
                      </li>
                      <li className="px-4 py-2">
                        <div className="badge badge-success badge-circle-inner mr-2">
                          Success
                        </div>
                        Sem anúncios
                      </li>
                      <li className="px-4 py-2">
                        <div className="badge badge-success badge-circle-inner mr-2">
                          Success
                        </div>
                        Suport Premium
                      </li>
                      <li className="px-4 py-2">
                        <div className="badge badge-success badge-circle-inner mr-2">
                          Success
                        </div>
                        Envio de e-mail automatizado
                      </li>
                    </ul>
                  </div>
                </Grid>

                <Grid item md={4} xs={12}>
                  <div className="py-3">
                    <div
                      className={`${classes.featureBox} feature-box text-center mt-2`}>
                      <img
                        src={svgImage14}
                        className={`mx-auto d-block img-fluid ${classes.planImg}`}
                        alt="..."
                      />
                      <h3 className="font-size-xxl font-weight-bold mt-4">
                        Ilimitado
                      </h3>
                      <p className="text-black-50 mb-4">
                        Destinado a assessoria de imprensa, agências e marcas
                      </p>
                      <NavLink className="nav-link-simple" to="/cadastro">
                        <Button
                          variant="text"
                          className="btn-outline-first"
                          title="Saiba mais">
                          <span>Sob Consulta</span>
                        </Button>
                      </NavLink>
                    </div>
                    <div className="divider my-4" />
                    <ul className="list-unstyled text-left font-weight-bold font-size-sm">
                      <li className="px-4 py-2">
                        <div className="badge badge-success badge-circle-inner mr-2">
                          Success
                        </div>
                        Mídias sociais
                      </li>
                      <li className="px-4 py-2">
                        <div className="badge badge-success badge-circle-inner mr-2">
                          Success
                        </div>
                        Grupos ilimitados de palavras chaves
                      </li>
                      <li className="px-4 py-2">
                        <div className="badge badge-success badge-circle-inner mr-2">
                          Success
                        </div>
                        Automatização por e-mail
                      </li>
                      <li className="px-4 py-2">
                        <div className="badge badge-success badge-circle-inner mr-2">
                          Success
                        </div>
                        Inteligência artificial - alerta de gerênciamento de
                        crise
                      </li>
                      <li className="px-4 py-2">
                        <div className="badge badge-success badge-circle-inner mr-2">
                          Success
                        </div>
                        API de integração do nosso sistema
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
