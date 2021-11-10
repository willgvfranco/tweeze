import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

import {
  Avatar,
  Button,
  Backdrop,
  CircularProgress,
  Divider
} from '@material-ui/core';
import {
  ChevronRightTwoTone,
  BallotTwoTone,
  SettingsTwoTone,
  DevicesOtherTwoTone,
  ExitToApp,
  Assignment
} from '@material-ui/icons';

import { setSidebarToggleMobile } from '../reducers/ThemeOptions';
import { logout } from '../reducers/AuthDuck';

const PageLoader = ({ open }) => (
  <div style={{ zIndex: '2000' }}>
    <Backdrop
      open={open}
      style={{ display: 'flex', flexDirection: 'column', zIndex: '2000' }}>
      <CircularProgress style={{ color: 'white' }} />
      <span style={{ color: 'white', fontSize: '22px', marginTop: '20px' }}>
        Saindo...
      </span>
    </Backdrop>
  </div>
);

const SidebarMenu = ({ user, setSidebarToggleMobile, logout }) => {
  const [displayLoader, setDisplayLoader] = useState(false);

  const toggleSidebarMobile = () => setSidebarToggleMobile(false);

  const handleLogout = () => {
    setDisplayLoader(true);
    setTimeout(logout, 1000);
  };

  const Loader = () =>
    displayLoader ? <PageLoader open={displayLoader} /> : null;

  return (
    <>
      <PerfectScrollbar>
        <div className="sidebar-navigation h-100">
          <ul className="h-100">
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/noticias">
                <span className="sidebar-icon">
                  <BallotTwoTone />
                </span>
                Notícias
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRightTwoTone />
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/grupos">
                <span className="sidebar-icon">
                  <DevicesOtherTwoTone />
                </span>
                Grupos
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRightTwoTone />
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/relatorios">
                <span className="sidebar-icon">
                  <Assignment />
                </span>
                Relatórios
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRightTwoTone />
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/minha-conta">
                <span className="sidebar-icon">
                  <SettingsTwoTone />
                </span>
                Minha conta
                <span className="sidebar-icon-indicator sidebar-icon-indicator-right">
                  <ChevronRightTwoTone />
                </span>
              </NavLink>
            </li>

            <Divider
              style={{
                marginTop: 'auto',
                marginBottom: '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.15)'
              }}
            />

            <li
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Avatar variant="rounded" style={{ marginBottom: '0.5rem' }}>
                {user[0]}
              </Avatar>
              <Button
                startIcon={<ExitToApp />}
                style={{ color: 'white' }}
                onClick={handleLogout}>
                Sair
              </Button>
            </li>
          </ul>
        </div>
      </PerfectScrollbar>
      <Loader />
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth?.first_name || 'Usuário'
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable)),
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);
