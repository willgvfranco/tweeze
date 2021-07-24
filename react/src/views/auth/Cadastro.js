import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Container,
  Card,
  Button,
  List,
  ListItem,
  TextField
} from '@material-ui/core';

import hero3 from '../../assets/images/hero-bg/hero-5.jpg';

export default function PageRegister() {
  return (
    <>
      <div className="app-wrapper min-vh-100 bg-white">
        <div className="hero-wrapper w-100 bg-composed-wrapper bg-light-pure min-vh-100">
          <div className="flex-grow-1 w-100 d-flex align-items-center">
            <div
              className="bg-composed-wrapper--image opacity-6"
              style={{ backgroundImage: 'url(' + hero3 + ')' }}
            />
            <div className="bg-composed-wrapper--bg bg-second opacity-7" />
            <div className="bg-composed-wrapper--bg bg-premium-dark opacity-5" />
            <div className="bg-composed-wrapper--content p-3 p-md-5">
              <Container>
                <Card className="rounded-sm modal-content p-3 bg-white-10">
                  <Card className="rounded-sm shadow-none font-size-sm p-3 p-sm-0">
                    <Grid container spacing={0}>
                      <Grid
                        item
                        lg={6}
                        className="d-flex align-items-center justify-content-center flex-column">
                        <div className="divider-v divider-v-lg d-none d-lg-block" />
                        <div className="text-center mt-4">
                          <h1 className="font-size-xxl mb-1 font-weight-bold">
                            Criação de conta
                          </h1>
                          <p className="mb-0 text-black-50">
                            Comece com os benefícios de nossa plataforma agora mesmo.
                          </p>
                        </div>
                        <div className="px-5 py-4">
                          <div className="mb-3">
                            <label className="font-weight-bold mb-2">
                              Email
                            </label>
                            <TextField
                              variant="outlined"
                              size="small"
                              fullWidth
                              placeholder="Entre com seu e-mail"
                              type="email"
                            />
                          </div>
                          <div className="mb-3">
                            <div className="d-flex justify-content-between">
                              <label className="font-weight-bold mb-2">
                                Senha
                              </label>
                            </div>
                            <TextField
                              variant="outlined"
                              size="small"
                              fullWidth
                              placeholder="Entre com a sua senha"
                              type="password"
                            />
                          </div>
                          <Grid container spacing={6}>
                            <Grid item md={6}>
                              <div>
                                <label className="font-weight-bold mb-2">
                                  Nome
                                </label>
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  placeholder="Nome"
                                />
                              </div>
                            </Grid>
                            <Grid item md={6}>
                              <div>
                                <label className="font-weight-bold mb-2">
                                  Sobrenome
                                </label>
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  fullWidth
                                  placeholder="Sobrenome"
                                />
                              </div>
                            </Grid>
                          </Grid>
                          <div className="my-4">
                            Clicando no botão <strong>Criação de Conta</strong>{' '}
                            você concorda com os termos de serviço e a política de privacidade.
                          </div>
                          <div className="text-center mb-4">
                            <Button className="btn-primary text-uppercase font-weight-bold font-size-sm my-3">
                              Criação de Conta
                            </Button>
                          </div>
                        </div>
                      </Grid>
                      <Grid
                        item
                        lg={6}
                        className="d-flex align-items-center justify-content-center flex-column">
                        <div className="p-3">
                          <div className="p-4">
                            <div className="d-block d-xl-flex">
                              <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                                <FontAwesomeIcon
                                  icon={['far', 'heart']}
                                  className="font-size-xl text-first"
                                />
                              </div>
                              <div className="pl-0 pl-xl-3">
                                <div className="text-black font-weight-bold font-size-lg mb-1">
                                  Tweeze
                                </div>
                                <p className="mb-0 text-black-50">
                                  As mais modernas tecnologias para captura, análise e distribuição de informações.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="d-block d-xl-flex">
                              <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                                <FontAwesomeIcon
                                  icon={['far', 'lightbulb']}
                                  className="font-size-xl text-first"
                                />
                              </div>
                              <div className="pl-0 pl-xl-3">
                                <div className="text-black font-weight-bold font-size-lg mb-1">
                                  Compromisso!
                                </div>
                                <p className="mb-0 text-black-50">
                                 Nosso compromisso é deixar nossos clientes o mais informado possível. Somente nos ultimos 4 meses foram captadas aproximadamente 2 milhões de notícias do Brasil e do mundo. 
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="d-block d-xl-flex">
                              <div className="mt-0 mt-xl-1 mb-md-2 mb-lg-0">
                                <FontAwesomeIcon
                                  icon={['far', 'user']}
                                  className="font-size-xl text-first"
                                />
                              </div>
                              <div className="pl-0 pl-xl-3">
                                <div className="text-black font-weight-bold font-size-lg mb-1">
                                  Jul.IA
                                </div>
                                <p className="mb-0 text-black-50">
                                  Jul.IA é inteligência artificial desenvolvida com foco no processamento de linguagem natural. Do Brasil para o mundo, antenada, conectada e extremamente rápida. Jul.IA está presente em todo o nosso sistema, gerenciamento marcas e auxiliando na identificação de potenciais crises.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Card>
                </Card>
              </Container>
            </div>
          </div>
          <div className="hero-footer w-100 pb-4">
            <Container>
              <div className="py-3 d-block d-lg-flex font-size-xs justify-content-between">
                <div className="text-center d-block mb-3 mb-md-0 text-white">
                  Copyright &copy; 2020 - UiFort.com
                </div>
                <List
                  component="div"
                  className="nav-transparent text-nowrap d-flex justify-content-center">
                  <ListItem
                    button
                    className="text-white-50"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    Privacy Policy
                  </ListItem>
                  <ListItem
                    button
                    className="text-white-50"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    Terms of Service
                  </ListItem>
                </List>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
