import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Collapse,
  Typography,
  Button,
  List,
  ListItem
} from '@material-ui/core';

import LogoSimbolo from '../../../assets/images/logo/logo_twz_branco.png';

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

export default function LivePreviewExample() {
  const [collapse, setCollapse] = useState(false);
  const toggle = () => setCollapse(!collapse);

  return (
    <>
      <div className="header-nav-wrapper header-nav-wrapper-lg navbar-dark">
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
        <div className="header-nav-actions flex-grow-0 flex-lg-grow-1">
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
              <Button
                onClick={toggle}
                className="btn-danger btn-icon d-40 shadow-sm hover-scale-lg btn-animated-icon-sm nav-toggle-inner-btn p-0">
                <span className="btn-wrapper--icon">
                  <FontAwesomeIcon icon={['fas', 'times']} />
                </span>
              </Button>
              <div className="p-3">
                <div className="px-4 text-uppercase py-2 text-primary font-weight-bold font-size-sm">
                  Dashboards
                </div>
                <List
                  component="div"
                  className="nav-pills nav-neutral-primary mb-3 nav-pills-rounded flex-column">
                  <ListItem
                    button
                    component={NavLink}
                    to="/DashboardMonitoring"
                    className="px-4 d-flex align-items-center">
                    <span>Monitoring</span>
                    <FontAwesomeIcon
                      icon={['fas', 'angle-right']}
                      className="opacity-6 ml-auto"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={NavLink}
                    to="/DashboardCommerce"
                    className="px-4 d-flex align-items-center">
                    <span>Commerce</span>
                    <FontAwesomeIcon
                      icon={['fas', 'angle-right']}
                      className="opacity-6 ml-auto"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={NavLink}
                    to="/DashboardAnalytics"
                    className="px-4 d-flex align-items-center">
                    <span>Analytics</span>
                    <FontAwesomeIcon
                      icon={['fas', 'angle-right']}
                      className="opacity-6 ml-auto"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={NavLink}
                    to="/DashboardStatistics"
                    className="px-4 d-flex align-items-center">
                    <span>Statistics</span>
                    <FontAwesomeIcon
                      icon={['fas', 'angle-right']}
                      className="opacity-6 ml-auto"
                    />
                  </ListItem>
                </List>
                <div className="px-4 text-uppercase pb-2 text-primary font-weight-bold font-size-sm">
                  Apps Pages
                </div>
                <List
                  component="div"
                  className="nav-pills nav-neutral-primary nav-pills-rounded flex-column">
                  <ListItem
                    button
                    component={NavLink}
                    to="/PageCalendar"
                    className="px-4 d-flex align-items-center">
                    <span>Calendar</span>
                    <FontAwesomeIcon
                      icon={['fas', 'angle-right']}
                      className="opacity-6 ml-auto"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={NavLink}
                    to="/PageChat"
                    className="px-4 d-flex align-items-center">
                    <span>Chat</span>
                    <FontAwesomeIcon
                      icon={['fas', 'angle-right']}
                      className="opacity-6 ml-auto"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={NavLink}
                    to="/PageFileManager"
                    className="px-4 d-flex align-items-center">
                    <span>File Manager</span>
                    <FontAwesomeIcon
                      icon={['fas', 'angle-right']}
                      className="opacity-6 ml-auto"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={NavLink}
                    to="/PageProjects"
                    className="px-4 d-flex align-items-center">
                    <span>Projects</span>
                    <FontAwesomeIcon
                      icon={['fas', 'angle-right']}
                      className="opacity-6 ml-auto"
                    />
                  </ListItem>
                  <ListItem
                    button
                    component={NavLink}
                    to="/PageProfile"
                    className="px-4 d-flex align-items-center">
                    <span>Profile</span>
                    <FontAwesomeIcon
                      icon={['fas', 'angle-right']}
                      className="opacity-6 ml-auto"
                    />
                  </ListItem>
                </List>
              </div>
              <div className="divider" />
              <div className="m-3">
                <div className="bg-primary px-3 py-4 rounded">
                  <div className="px-4 text-uppercase pb-2 text-white font-weight-bold font-size-sm">
                    Individual Apps
                  </div>
                  <List
                    component="div"
                    className="nav-pills nav-transparent nav-pills-rounded flex-column">
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      selected
                      className="px-4 text-white-50 d-flex align-items-center">
                      <span>General</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-right']}
                        className="opacity-6 ml-auto"
                      />
                    </ListItem>
                    <ListItem
                      button
                      href="https://demo.uifort.com/bamburgh-react-crypto-application-material-ui-pro-demo"
                      target="_blank"
                      className="px-4 d-flex text-white-50 align-items-center">
                      <span>Crypto</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-right']}
                        className="opacity-6 ml-auto"
                      />
                    </ListItem>
                    <ListItem
                      button
                      href="https://demo.uifort.com/bamburgh-react-messenger-application-material-ui-pro-demo"
                      target="_blank"
                      className="px-4 d-flex text-white-50 align-items-center">
                      <span>Messenger</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-right']}
                        className="opacity-6 ml-auto"
                      />
                    </ListItem>
                    <ListItem
                      button
                      href="https://demo.uifort.com/bamburgh-react-commerce-application-material-ui-pro-demo"
                      target="_blank"
                      className="px-4 d-flex text-white-50 align-items-center">
                      <span>Commerce</span>
                      <FontAwesomeIcon
                        icon={['fas', 'angle-right']}
                        className="opacity-6 ml-auto"
                      />
                    </ListItem>
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      disabled
                      className="px-4 d-flex text-white-50 align-items-center">
                      <span>Learning</span>
                    </ListItem>
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-4 d-flex text-white-50 align-items-center"
                      disabled>
                      <span>Monitoring</span>
                    </ListItem>
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-4 d-flex text-white-50 align-items-center"
                      disabled>
                      <span>Fleet Manager</span>
                    </ListItem>
                    <ListItem
                      component="a"
                      button
                      href="#/"
                      onClick={(e) => e.preventDefault()}
                      className="px-4 d-flex text-white-50 align-items-center"
                      disabled>
                      <span>Banking</span>
                    </ListItem>
                  </List>
                </div>
              </div>
              <div className="divider" />
              <div className="card-footer bg-secondary text-center p-3">
                <Button
                  href="https://uifort.com/template/bamburgh-react-admin-dashboard-material-ui-pro"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="rounded-lg text-nowrap font-size-sm text-uppercase shadow-second-sm btn-success">
                  Buy Now
                </Button>
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
}
