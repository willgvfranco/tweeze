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
import bannerInicialPequeno from '../../../assets/images/Tweeze_banner_small.png';

import LogoBranca from '../../../assets/images/logo/logo_tweeze_branco.png';
import LogoSimbolo from '../../../assets/images/logo/logo_twz_branco.png';

const innerWidth = window.innerWidth;

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

const LinkItem = ({ title, link }) => (
  <li>
    <a href={link} className="font-weight-bold rounded-lg text-white px-3">
      {title}
    </a>
  </li>
);

export const MenuBar = ({ hideMenus }) => {
  const [collapse, setCollapse] = useState(false);
  const toggle = () => setCollapse(!collapse);

  return (
    <>
      <div
        className="header-nav-wrapper header-nav-wrapper-lg navbar-dark"
        style={{ minHeight: '50px' }}>
        <a href="/">
          <img
            className="tamanhoLogoInicial"
            src={LogoSimbolo}
            alt="Tweeze Logo"
          />
        </a>
        <div className="header-nav-menu d-none d-lg-block">
          <ul
            className="d-flex nav nav-neutral-first justify-content-center"
            style={{
              width: hideMenus && 'fit-content',
              marginLeft: hideMenus && '20px'
            }}>
            <LinkItem title="Home" link="#home" />
            {hideMenus ? null : (
              <>
                <LinkItem title="Serviços" link="#servicos" />
                <LinkItem title="Planos" link="#planos" />
                <LinkItem title="Contato" link="#contato" />
              </>
            )}
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
                  {hideMenus ? null : (
                    <>
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
                    </>
                  )}
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
    <div className="hero-wrapper bg-composed-wrapper bg-second">
      <Container className={classes.menuBar}>
        <MenuBar />
      </Container>
      <div className="hero-wrapper--content" style={{ marginTop: '30px' }}>
        <div className="bg-composed-wrapper--bg bg-sunrise-blue opacity-6" />
        <div
          className="bg-composed-wrapper--image opacity-9"
          style={{
            backgroundImage: `url(${
              innerWidth > 768 ? bannerInicial : bannerInicialPequeno
            })`
          }}
        />
        <div id="home" className="bg-composed-wrapper--content">
          <Container className="z-over shadow-container-content-5 text-white text-center pt-5">
            <img
              className="ajustelogoinicial espaçamentoInicial"
              src={LogoBranca}
              alt=""
            />
            <Grid item xs={12} className="mx-auto">
              <div>
                <p className="font-size-xxl py-3">
                  transformando dados em inteligência
                </p>
                <h3 className="font-size-xl my-5">
                  Monitoramento, captação, estruturação e distribuição
                  automatizadas do seu clipping.
                </h3>
              </div>
              <div className="py-4 mb-4">
                <NavLink className="nav-link-simple" to="/cadastro">
                  <Button
                    rel="noopener noreferrer"
                    target="_blank"
                    size="large"
                    className="btn-pill shadow-second-sm btn-danger"
                    startIcon={
                      <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                      </span>
                    }>
                    Teste Agora!
                  </Button>
                </NavLink>

                <Button
                  href="#planos"
                  size="large"
                  className="bg-white-10 text-white shadow-second-sm btn-pill ml-3">
                  Planos e Serviços
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
                        <b className="font-size-xxl pb-2">3.803.911+</b>
                        <span className="text-white-50 font-size-lg d-block">
                          Notícias captadas
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
                        <b className="font-size-xxl pb-2">1600+</b>
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
                        <b className="font-size-xxl pb-2">50.000</b>
                        <span className="text-white-50 font-size-lg d-block">
                          Notícias por dia
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
  );
};

export default Header;
