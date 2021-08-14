import React, { useState } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EmojiEventsTwoToneIcon from '@material-ui/icons/EmojiEventsTwoTone';
import ListAltTwoToneIcon from '@material-ui/icons/ListAltTwoTone';
import TuneTwoToneIcon from '@material-ui/icons/TuneTwoTone';
import TrendingUpTwoToneIcon from '@material-ui/icons/TrendingUpTwoTone';
import {
  Grid,
  Container,
  Button,
  Collapse,
  List,
  ListItem
} from '@material-ui/core';

import bannerInicial from '../../../assets/images/Tweeze_banner.png';

import LogoBranca from '../../../assets/images/logo/logo_tweeze_branco.png';
import LogoSimbolo from '../../../assets/images/logo/logo_twz_branco.png';

const useStyles = makeStyles((theme) => ({
  menuBar: {
    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, #465e78)`,
    filter: 'drop-shadow(2px -2px 5px black)',
    position: 'fixed',
    zIndex: 1000,
    width: '100vw',
    maxWidth: 'none',
    padding: '0 60px'
  }
}));

export const MenuBar = () => {
  const [collapse, setCollapse] = useState(false);
  const toggle = () => setCollapse(!collapse);

  return (
    <>
      <div
        className="header-nav-wrapper header-nav-wrapper-lg navbar-dark"
        style={{ minHeight: '50px' }}>
        <div>
          <img
            className="tamanhoLogoInicial"
            src={LogoSimbolo}
            alt="Tweeze Logo"
          />
        </div>
        <div className="header-nav-menu d-none d-lg-block">
          <ul className="d-flex nav nav-neutral-first justify-content-center">
            <li>
              <a
                href="#home"
                className="font-weight-bold rounded-lg text-white px-3">
                Home
              </a>

              <span className="opacity-5"></span>
            </li>
            <li>
              <a
                href="#servicos"
                className="font-weight-bold rounded-lg text-white px-3">
                Serviços
              </a>

              <span className="opacity-5"></span>
            </li>
            <li>
              <a
                href="#planos"
                className="font-weight-bold rounded-lg text-white px-3">
                Planos
              </a>

              <span className="opacity-5"></span>
            </li>
            <li>
              <a
                href="#contato"
                className="font-weight-bold rounded-lg text-white px-3">
                Contato
              </a>

              <span className="opacity-5"></span>
            </li>
          </ul>
        </div>
        <div className="header-nav-actions flex-grow-0 flex-lg-grow-1 ajusteiconeheader">
          <span className="d-none d-lg-block">
            <NavLink className="nav-link-simple" to="/login">
              <Button
                rel="noopener noreferrer"
                target="_blank"
                className="rounded-lg text-nowrap font-size-xs text-uppercase shadow-second-sm btn-danger font-weight-bold">
                Login
              </Button>
            </NavLink>
          </span>
          <span className="d-block d-lg-none">
            <button
              onClick={toggle}
              className={clsx('navbar-toggler hamburger hamburger--elastic', {
                'is-active': collapse
              })}>
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </button>
          </span>
        </div>
        <div className="d-flex d-lg-none">
          <Collapse
            in={collapse}
            className="nav-collapsed-wrapper shadow-lg navbar-collapse">
            <div className="nav-inner-wrapper">
              <div className="p-3">
                <List
                  component="div"
                  className="nav-pills nav-neutral-primary mb-3 nav-pills-rounded flex-column">
                  <ListItem
                    onClick={toggle}
                    className="px-4 d-flex align-items-center">
                    <a href="#home">Home</a>
                  </ListItem>
                  <ListItem
                    onClick={toggle}
                    className="px-4 d-flex align-items-center">
                    <a href="#servicos">Serviços</a>
                  </ListItem>
                  <ListItem
                    onClick={toggle}
                    className="px-4 d-flex align-items-center">
                    <a href="#planos">Planos</a>
                  </ListItem>
                  <ListItem
                    onClick={toggle}
                    className="px-4 d-flex align-items-center">
                    <a href="#contato">Contato</a>
                  </ListItem>
                  <ListItem
                    component={NavLink}
                    to="/login"
                    className="px-4 d-flex align-items-center"
                    style={{ fontWeight: 'bold' }}>
                    <span>Login</span>
                  </ListItem>
                </List>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
      <div
        className={clsx('collapse-page-trigger', { 'is-active': collapse })}
        onClick={toggle}
      />
    </>
  );
};

const Header = () => {
  const classes = useStyles();

  return (
    <>
      <div className="hero-wrapper bg-composed-wrapper bg-second">
        <Container className={classes.menuBar}>
          <MenuBar />
        </Container>
        <div className="hero-wrapper--content" style={{ marginTop: '30px' }}>
          <div className="bg-composed-wrapper--bg bg-sunrise-blue opacity-6" />
          <div
            className="bg-composed-wrapper--image opacity-9"
            style={{ backgroundImage: 'url(' + bannerInicial + ')' }}
          />
          <div id="home" className="bg-composed-wrapper--content">
            <Container className="z-over shadow-container-content-5 text-white text-center pt-5">
              <img
                className="ajustelogoinicial espaçamentoInicial"
                src={LogoBranca}
                alt=""
              />
              <Grid item md={11} lg={10} xl={8} className="mx-auto">
                <div>
                  <p className="font-size-xxl py-3">
                    Transformando dados em inteligência
                  </p>
                  <h3 className="font-size-xl">
                    Plataforma de clipping com inteligência artificial (I.A.)
                    para captação, análise, monitoramento e distribuição de
                    informações úteis a respeito de marcas e temas de interesse.
                    Diariamente são tratadas aproximadamente 50 mil notícias do
                    Brasil e do mundo.
                  </h3>
                </div>
                <div className="py-4 mb-4">
                  <Button
                    component={NavLink}
                    to="/DashboardCommerce"
                    size="large"
                    className="btn-pill shadow-second-sm btn-danger">
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                    </span>
                    <span className="btn-wrapper--label">
                      Solicite uma DEMO!
                    </span>
                  </Button>
                  <Button
                    href="#servicos"
                    rel="noopener noreferrer"
                    target="_blank"
                    size="large"
                    className="bg-white-10 text-white shadow-second-sm btn-pill ml-3">
                    <span> Planos e Serviços</span>
                  </Button>
                </div>
              </Grid>
              <Grid item lg={10} className="mx-auto">
                <div className="p-4 p-xl-5 hover-scale-rounded bg-second rounded-lg modal-content">
                  <Grid container spacing={0}>
                    <Grid item xs={6} md={3} className="p-3">
                      <div className="divider-v bg-white-10 divider-v-md d-none d-lg-block" />

                      <div className="text-center">
                        <div>
                          <TrendingUpTwoToneIcon className="d-30 text-danger" />
                        </div>
                        <div className="mt-3 line-height-sm">
                          <b className="font-size-xxl pb-2">1.789.470+</b>
                          <span className="text-white-50 font-size-lg d-block">
                            Notícias
                          </span>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6} md={3} className="p-3">
                      <div className="divider-v bg-white-10 divider-v-md d-none d-lg-block" />

                      <div className="text-center">
                        <div>
                          <ListAltTwoToneIcon className="d-30 text-warning" />
                        </div>
                        <div className="mt-3 line-height-sm">
                          <b className="font-size-xxl pb-2">1300+</b>
                          <span className="text-white-50 font-size-lg d-block">
                            Fontes
                          </span>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6} md={3} className="p-3">
                      <div className="divider-v bg-white-10 divider-v-md d-none d-lg-block" />
                      <div className="text-center">
                        <div>
                          <EmojiEventsTwoToneIcon className="d-30 text-info" />
                        </div>
                        <div className="mt-3 line-height-sm">
                          <b className="font-size-xxl pb-2">800.000+</b>
                          <span className="text-white-50 font-size-lg d-block">
                            Tweetes
                          </span>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6} md={3} className="p-3">
                      <div className="text-center">
                        <div>
                          <TuneTwoToneIcon className="d-30 text-success" />
                        </div>
                        <div className="mt-3 line-height-sm">
                          <b className="font-size-xxl pb-2">I.A.</b>
                          <span className="text-white-50 font-size-lg d-block">
                            Ready
                          </span>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Container>
            <div className="shadow-container-blocks-5 z-below">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="var(--light)"
                  fillOpacity="1"
                  d="M0,32L120,58.7C240,85,480,139,720,138.7C960,139,1200,85,1320,58.7L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
