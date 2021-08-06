import React from 'react';

import {
  Grid,
  Container,
  Card,
  CardContent,
  Button,
  List,
  ListItem
} from '@material-ui/core';

import svgImage1 from '../assets/images/illustrations/pack4/business_plan.svg';
import svgImage13 from '../assets/images/illustrations/pack4/businesswoman.svg';
import svgImage14 from '../assets/images/illustrations/pack4/powerful.svg';

export default function PricingTables4() {
  return (
    <>
      <div className="bg-royal py-3 py-xl-5">
        <Container className="py-3 py-xl-5">
          <Card className="modal-content">
            <div className="card-header bg-light d-flex justify-content-center">
              <div className="text-center my-4">
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
              <List
                component="div"
                className="nav-line mb-4 nav-tabs-primary d-flex align-items-center justify-content-center">
                <ListItem button disableRipple selected>
                  <span>Planos mensais</span>
                  <div className="divider" />
                </ListItem>
                <ListItem button disableRipple>
                  <span>Planos anuais</span>
                  <div className="divider" />
                </ListItem>
              </List>
              <div className="container-fluid">
                <Grid container spacing={6}>
                  <Grid item xl={4}>
                    <div className="divider-v divider-v-lg" />
                    <div className="py-3">
                      <div className="feature-box text-center mt-2 mb-5">
                        <img
                          src={svgImage1}
                          className="w-50 mx-auto d-block img-fluid"
                          alt="..."
                        />
                        <h3 className="font-size-xxl font-weight-bold mt-4">
                          Básico
                        </h3>
                        <p className="text-black-50 mb-4">
                          Cientistas, curiosos e profissionais interessados no
                          mercado financeiro
                        </p>
                        <Button
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          variant="text"
                          className="btn-outline-first"
                          title="Learn more">
                          <span>R$ 49</span>
                        </Button>
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
                          Sem Ads
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
                  <Grid item xl={4}>
                    <div className="divider-v divider-v-lg" />
                    <div className="py-3">
                      <div className="feature-box text-center mt-2 mb-5">
                        <img
                          src={svgImage13}
                          className="w-50 mx-auto d-block img-fluid"
                          alt="..."
                        />
                        <h3 className="font-size-xxl font-weight-bold mt-4">
                          Marcas
                        </h3>
                        <p className="text-black-50 mb-4">
                          Produto destinado a pequenas e médias empresas
                        </p>
                        <Button
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          className="btn-first"
                          title="Learn more">
                          <span>R$ 590</span>
                        </Button>
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
                          Sem Ads
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
                  <Grid item xl={4}>
                    <div className="py-3">
                      <div className="feature-box text-center mt-2 mb-5">
                        <img
                          src={svgImage14}
                          className="w-50 mx-auto d-block img-fluid"
                          alt="..."
                        />
                        <h3 className="font-size-xxl font-weight-bold mt-4">
                          Ilimitado
                        </h3>
                        <p className="text-black-50 mb-4">
                          Destinado a assessoria de imprensa, agências que
                          adminitrem várias contas e grandes marcas
                        </p>
                        <Button
                          href="#/"
                          onClick={(e) => e.preventDefault()}
                          variant="text"
                          className="btn-outline-first"
                          title="Learn more">
                          <span>Sob Consulta</span>
                        </Button>
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
    </>
  );
}
