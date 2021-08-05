import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, List, ListItem } from '@material-ui/core';

import projectLogo from '../../../assets/images/react.svg';
import LogoBranca from '../../../assets/images/logo/logo_twz_branco.png';
export default function LivePreviewExample() {
  return (
    <>
      <div className="bg-second font-size-sm py-5">
        <div className="py-3">
          <a
            href="#/"
            onClick={(e) => e.preventDefault()}
            title="Bamburgh React Admin Dashboard with Material-UI PRO"
            className="d-70 d-block mx-auto tamanholog ">
            <img
              alt="Bamburgh React Admin Dashboard with Material-UI PRO"
              className="img-fluid p-2"
              src={LogoBranca}
            />
          </a>
        </div>
        <Container className="pt-5">
          <Grid container spacing={6} className="pb-3">
            <Grid item md={6} xl={3}>
              <div className="my-4 my-xl-0">
                <h6 className="text-white font-weight-bold mb-3 text-uppercase">
                  Serviços
                </h6>
                <List
                  component="div"
                  className="nav-transparent-alt flex-column">
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="px-0 py-1 text-white-50">
                    Aquisição
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="px-0 py-1 text-white-50">
                    Produtos
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="px-0 py-1 text-white-50">
                    Quem somos
                  </ListItem>
                </List>
              </div>
            </Grid>
            <Grid item md={6} xl={3}>
              <div className="my-4 my-xl-0">
                <h6 className="text-white font-weight-bold mb-3 text-uppercase">
                  Suporte
                </h6>
                <List
                  component="div"
                  className="nav-transparent-alt flex-column">
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="px-0 py-1 text-white-50">
                    FAQ
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="px-0 py-1 text-white-50">
                    Recuperação de senha
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="px-0 py-1 text-white-50">
                    àrea do cliente
                  </ListItem>
                </List>
              </div>
            </Grid>
            <Grid item md={6} xl={3}>
              <div className="my-4 my-xl-0">
                <h6 className="text-white font-weight-bold mb-3 text-uppercase">
                  Plataforma
                </h6>
                <List
                  component="div"
                  className="nav-transparent-alt flex-column">
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="px-0 py-1 text-white-50">
                    Suporte
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="px-0 py-1 text-white-50">
                    Area do investidor
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#/"
                    onClick={(e) => e.preventDefault()}
                    className="px-0 py-1 text-white-50">
                    Helpdesk
                  </ListItem>
                </List>
              </div>
            </Grid>
            <Grid item md={6} xl={3}>
              <div className="my-4 my-xl-0">
                <h6 className="text-white font-weight-bold mb-3 text-uppercase">
                  Mídias Sociais
                </h6>
                <p className="text-white-50">
                  Fique por dentro das nossas atualizações!
                </p>
                <List
                  component="div"
                  className="nav-transparent-alt d-flex justify-content-start">
                  <ListItem
                    button
                    className="px-0 mr-3 text-white-50"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon
                      icon={['fab', 'facebook']}
                      className="font-size-lg"
                    />
                  </ListItem>
                  <ListItem
                    button
                    className="px-0 mr-3 text-white-50"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon
                      icon={['fab', 'twitter']}
                      className="font-size-lg"
                    />
                  </ListItem>
                  <ListItem
                    button
                    className="px-0 mr-3 text-white-50"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon
                      icon={['fab', 'google']}
                      className="font-size-lg"
                    />
                  </ListItem>
                  <ListItem
                    button
                    className="px-0 mr-3 text-white-50"
                    href="#/"
                    onClick={(e) => e.preventDefault()}>
                    <FontAwesomeIcon
                      icon={['fab', 'instagram']}
                      className="font-size-lg"
                    />
                  </ListItem>
                </List>
              </div>
            </Grid>
          </Grid>
          <div className="divider mt-4 bg-white opacity-2" />
          <div className="divider mb-4 bg-white opacity-2" />
          <div className="py-3 d-block d-lg-flex align-items-center justify-content-between">
            <div className="text-center d-block mb-3 mb-md-0 text-white">
              Copyright &copy; 2021 - Tweeze
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
            <List
              component="div"
              className="nav-transparent text-nowrap d-flex justify-content-center">
              <ListItem
                button
                className="text-white-50"
                href="#/"
                onClick={(e) => e.preventDefault()}>
                Minha conta
              </ListItem>
            </List>
          </div>
        </Container>
      </div>
    </>
  );
}
