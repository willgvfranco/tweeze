import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';

import HomeWorkTwoToneIcon from '@material-ui/icons/HomeWorkTwoTone';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  }
}));

const PageTitle = (props) => {
  const {
    pageTitleStyle,
    pageTitleBackground,
    pageTitleShadow,
    pageTitleIconBox,
    pageTitleDescription,
    titleHeading,
    titleDescription,
    action,
    icon,
    children,
    wrapperClass,
    titleClass
  } = props;

  const classes = useStyles();

  return (
    <>
      <div
        className={clsx(
          'app-page-title',
          titleClass,
          pageTitleStyle,
          pageTitleBackground,
          {
            'app-page-title--shadow': pageTitleShadow
          }
        )}>
        <div>
          <div className="app-page-title--first">
            {pageTitleIconBox && (
              <div className={`app-page-title--iconbox d-70 ${classes.icon}`}>
                <div className="d-70 d-flex align-items-center justify-content-center display-1">
                  {icon ? (
                    icon
                  ) : (
                    <HomeWorkTwoToneIcon className="text-primary" />
                  )}
                </div>
              </div>
            )}
            <div className="app-page-title--heading">
              <h1>{titleHeading}</h1>
              {pageTitleDescription && (
                <div className="app-page-title--description">
                  {titleDescription}
                </div>
              )}
              {action && (
                <div
                  style={{
                    margin: '0.5rem 0 0',
                    fontSize: '1.1rem',
                    opacity: 0.6,
                    fontWeight: 'normal'
                  }}>
                  {action}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={`d-flex align-items-center ${wrapperClass}`}>
          {children}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  pageTitleStyle: state.ThemeOptions.pageTitleStyle,
  pageTitleBackground: state.ThemeOptions.pageTitleBackground,
  pageTitleShadow: state.ThemeOptions.pageTitleShadow,
  pageTitleIconBox: state.ThemeOptions.pageTitleIconBox,
  pageTitleDescription: state.ThemeOptions.pageTitleDescription
});

export default connect(mapStateToProps)(PageTitle);
