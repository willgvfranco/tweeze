import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Container, List, ListItem } from '@material-ui/core';

import LogoBranca from '../../../assets/images/logo/logo_tweeze_branco.png';
import WarningPopover from './WarningPopover';

const Footer = () => {
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const open = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);

  const handleClosePopover1 = () => setAnchorEl1(null);
  const handleClosePopover2 = () => setAnchorEl2(null);

  const handleClickPopover1 = (event) => setAnchorEl1(event.currentTarget);
  const handleClickPopover2 = (event) => setAnchorEl2(event.currentTarget);

  return (
    <>
      <div className="bg-second font-size-sm py-5">
        <div className="py-3">
          <a
            href="#home"
            title="Tweeze"
            className="d-70 d-block mx-auto tamanholog ">
            <img alt="Tweeze" className="img-fluid p-2" src={LogoBranca} />
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
                    href="#servicos"
                    className="px-0 py-1 text-white-50">
                    Quem somos
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#planos"
                    className="px-0 py-1 text-white-50">
                    Produtos
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="#contato"
                    className="px-0 py-1 text-white-50">
                    Aquisição
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
                    href="/faq"
                    className="px-0 py-1 text-white-50">
                    FAQ
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="/recuperar-senha"
                    className="px-0 py-1 text-white-50">
                    Recuração de senha
                  </ListItem>
                  <ListItem
                    component="a"
                    button
                    href="/login"
                    className="px-0 py-1 text-white-50">
                    Area do cliente
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
                    onClick={handleClickPopover1}
                    className="px-0 py-1 text-white-50">
                    Suporte
                  </ListItem>
                  <WarningPopover
                    open={open}
                    anchorEl={anchorEl1}
                    handleClosePopover={handleClosePopover1}
                    text="tweeze.suporte@gmail.com"
                  />
                  <ListItem
                    component="a"
                    button
                    onClick={handleClickPopover2}
                    className="px-0 py-1 text-white-50">
                    Area do investidor
                  </ListItem>
                  <WarningPopover
                    open={open2}
                    anchorEl={anchorEl2}
                    handleClosePopover={handleClosePopover2}
                    text="Área exclusiva"
                  />
                  <ListItem
                    component="a"
                    button
                    onClick={handleClickPopover2}
                    className="px-0 py-1 text-white-50">
                    Helpdesk
                  </ListItem>
                  <WarningPopover
                    open={open2}
                    anchorEl={anchorEl2}
                    handleClosePopover={handleClosePopover2}
                    text="Em construção"
                  />
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
                      href=""
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
                  <a href="https://www.instagram.com/tweezebrasil/">
                    <ListItem
                      button
                      className="px-0 mr-3 text-white-50"
                      href="https://www.instagram.com/tweezebrasil/">
                      <FontAwesomeIcon
                        icon={['fab', 'instagram']}
                        className="font-size-lg"
                      />
                    </ListItem>
                  </a>
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
                component="a"
                button
                href="/login"
                className="px-0 py-1 text-white-50">
                Minha Conta
              </ListItem>
            </List>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;
