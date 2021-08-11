import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

import {
  ChevronRightTwoTone,
  BallotTwoTone,
  SettingsTwoTone,
  DevicesOtherTwoTone,
  Home
} from '@material-ui/icons';

import { setSidebarToggleMobile } from '../reducers/ThemeOptions';

const SidebarMenu = (props) => {
  const { setSidebarToggleMobile } = props;

  const toggleSidebarMobile = () => setSidebarToggleMobile(false);

  return (
    <>
      <PerfectScrollbar>
        <div className="sidebar-navigation">
          <ul>
            <li>
              <NavLink
                activeClassName="active"
                onClick={toggleSidebarMobile}
                className="nav-link-simple"
                to="/home">
                <span className="sidebar-icon">
                  <Home />
                </span>
                Home
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
          </ul>
        </div>
      </PerfectScrollbar>
    </>
  );
};

const mapStateToProps = (state) => ({
  sidebarUserbox: state.ThemeOptions.sidebarUserbox,

  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);
