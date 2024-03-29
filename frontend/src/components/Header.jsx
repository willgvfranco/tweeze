import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import { setSidebarToggleMobile } from '../reducers/ThemeOptions';

const useStyles = makeStyles((theme) => ({
  header: {
    [theme.breakpoints.up('lg')]: {
      display: 'none'
    }
  },
  menu: {
    color: theme.palette.primary.main
  }
}));

const Header = (props) => {
  const { sidebarToggleMobile, setSidebarToggleMobile } = props;

  const classes = useStyles();

  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };

  return (
    <div
      className="app-header--pane"
      style={{
        position: 'absolute',
        zIndex: 1000,
        top: '2rem',
        left: '2rem'
      }}>
      <button
        className={clsx(
          'navbar-toggler hamburger hamburger--elastic toggle-mobile-sidebar-btn',
          classes.menu,
          { 'is-active': sidebarToggleMobile }
        )}
        onClick={toggleSidebarMobile}>
        <span className="hamburger-box">
          <span className="hamburger-inner" />
        </span>
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  headerShadow: state.ThemeOptions.headerShadow,
  headerBgTransparent: state.ThemeOptions.headerBgTransparent,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = (dispatch) => ({
  setSidebarToggleMobile: (enable) => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
