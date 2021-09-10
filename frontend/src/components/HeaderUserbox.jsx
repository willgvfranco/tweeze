import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

// import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  // Badge,
  Avatar,
  Menu,
  Button,
  List,
  ListItem,
  Backdrop,
  CircularProgress
} from '@material-ui/core';

import { logout } from '../reducers/AuthDuck';

// import avatar7 from '../assets/images/avatars/avatar7.jpg';

// const StyledBadge = withStyles({
//   badge: {
//     backgroundColor: 'var(--success)',
//     color: 'var(--success)',
//     boxShadow: '0 0 0 2px #fff',
//     '&::after': {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       borderRadius: '50%',
//       animation: '$ripple 1.2s infinite ease-in-out',
//       border: '1px solid currentColor',
//       content: '""'
//     }
//   },
//   '@keyframes ripple': {
//     '0%': {
//       transform: 'scale(.8)',
//       opacity: 1
//     },
//     '100%': {
//       transform: 'scale(2.4)',
//       opacity: 0
//     }
//   }
// })(Badge);

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

const HeaderUserbox = ({ logout, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [displayLoader, setDisplayLoader] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setDisplayLoader(true);
    setTimeout(logout, 1000);
  };

  const Loader = () =>
    displayLoader ? <PageLoader open={displayLoader} /> : null;

  return (
    <>
      <Button
        variant="text"
        onClick={handleClick}
        className="ml-2 btn-transition-none text-left ml-2 p-0 bg-transparent d-flex align-items-center"
        disableRipple>
        {/* <div className="d-block p-0 avatar-icon-wrapper">
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            badgeContent=" "
            classes={{ badge: 'bg-success badge-circle border-0' }}
            variant="dot">
            <div className="avatar-icon rounded">
              <img src={avatar7} alt="..." />
            </div>
          </StyledBadge>
        </div> */}

        <div className="d-none d-xl-block pl-2">
          <div className="font-weight-bold line-height-1">
            <Avatar>{user[0]}</Avatar>
          </div>
        </div>
        <span className="pl-1 pl-xl-3">
          <FontAwesomeIcon icon={['fas', 'angle-down']} className="opacity-5" />
        </span>
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={Boolean(anchorEl)}
        classes={{ list: 'p-0' }}
        onClose={handleClose}>
        <div className="dropdown-menu-lg overflow-hidden p-0">
          <List
            component="div"
            className="nav-neutral-primary text-left d-flex align-items-center flex-column px-3 pb-3">
            <ListItem button className="d-block text-left">
              <NavLink
                activeClassName="active"
                className="nav-link-simple"
                to="/minha-conta">
                Minha conta
              </NavLink>
            </ListItem>
            <ListItem
              button
              className="d-block text-left"
              onClick={handleLogout}>
              Logout
            </ListItem>
          </List>
        </div>
        <Loader />
      </Menu>
    </>
  );
};

const mapStateToProps = ({ auth }) => ({ user: auth?.first_name || 'Usuário' });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderUserbox);
