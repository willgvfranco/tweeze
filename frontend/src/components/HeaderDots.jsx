import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Popover,
  Badge,
  Button,
  Divider
} from '@material-ui/core';
import NotificationsActiveTwoToneIcon from '@material-ui/icons/NotificationsActiveTwoTone';

import avatar1 from '../assets/images/avatars/avatar1.jpg';
import avatar2 from '../assets/images/avatars/avatar2.jpg';
import avatar6 from '../assets/images/avatars/avatar6.jpg';
import people1 from '../assets/images/stock-photos/people-1.jpg';
import people3 from '../assets/images/stock-photos/people-3.jpg';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const HeaderDots = () => {
  const chartHeaderDotsOptions = {
    chart: {
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
      stacked: true
    },
    dataLabels: {
      enabled: true
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '65%'
      }
    },
    stroke: {
      show: false,
      width: 0,
      colors: ['transparent']
    },
    colors: ['#7a7b97', 'rgba(122, 123, 151, 0.15)'],
    fill: {
      opacity: 1
    },
    legend: {
      show: false
    },
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
      'Last week',
      'Last month',
      'Last year',
      'Last quarter'
    ],
    xaxis: {
      crosshairs: {
        width: 1
      }
    },
    yaxis: {
      min: 0
    }
  };
  const chartHeaderDotsData = [
    {
      name: 'Net Profit',
      data: [2.3, 3.1, 4.0, 3.8, 5.1, 3.6, 4.0, 3.8, 5.1, 3.6, 3.2]
    },
    {
      name: 'Net Loss',
      data: [2.1, 2.1, 3.0, 2.8, 4.0, 3.8, 5.1, 3.6, 4.1, 2.6, 1.2]
    }
  ];

  const [anchorEl1, setAnchorEl1] = useState(null);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const open1 = Boolean(anchorEl1);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="d-flex align-items-center popover-header-wrapper">
        <span className="pr-2">
          <Badge
            variant="dot"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            badgeContent=" "
            classes={{ badge: 'bg-success badge-circle' }}>
            <Button
              onClick={handleClick1}
              className="btn-transition-none bg-neutral-success text-success font-size-lg p-0 d-inline-block shadow-none border-0 text-center d-44 rounded position-relative">
              <span>
                <NotificationsActiveTwoToneIcon />
              </span>
            </Button>
          </Badge>

          <Popover
            open={open1}
            anchorEl={anchorEl1}
            onClose={handleClose1}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            classes={{
              paper: 'app-header-dots'
            }}>
            <div className="popover-custom-lg overflow-hidden">
              <div className="bg-composed-wrapper bg-midnight-bloom border-0 text-center rounded-sm m-2">
                <div className="bg-composed-img-3 bg-composed-wrapper--image" />
                <div className="bg-composed-wrapper--content text-white px-2 py-4">
                  <h4 className="font-size-xl font-weight-bold mb-2">
                    Notifications
                  </h4>
                  <p className="opacity-8 mb-0">
                    You have <b className="text-success">472</b> new messages
                  </p>
                </div>
              </div>
              <div className="mx-2">
                <Tabs
                  className="nav-tabs-primary"
                  value={value}
                  variant="fullWidth"
                  onChange={handleChange}>
                  <Tab label="Timeline" />
                  <Tab label="Tasks" />
                  <Tab label="Reports" />
                </Tabs>
              </div>
              <div className="height-280">
                <PerfectScrollbar>
                  <TabPanel value={value} index={0}>
                    <div className="timeline-list timeline-list-offset timeline-list-offset-dot">
                      <div className="timeline-item">
                        <div className="timeline-item-offset">9:25</div>
                        <div className="timeline-item--content">
                          <div className="timeline-item--icon" />
                          <h4 className="timeline-item--label mb-2 font-weight-bold">
                            1991
                          </h4>
                          <p>
                            The World Wide Web goes live with its first web
                            page.
                          </p>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-item-offset">9:25</div>
                        <div className="timeline-item--content">
                          <div className="timeline-item--icon" />
                          <h4 className="timeline-item--label mb-2 font-weight-bold">
                            Java exam day
                          </h4>
                          <p>
                            Bill Clinton's presidential scandal makes it online.
                          </p>
                          <div className="avatar-wrapper-overlap mt-2 mb-1">
                            <div className="avatar-icon-wrapper avatar-icon-sm">
                              <div className="avatar-icon">
                                <img alt="..." src={avatar1} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon-sm">
                              <div className="avatar-icon">
                                <img alt="..." src={avatar2} />
                              </div>
                            </div>
                            <div className="avatar-icon-wrapper avatar-icon-sm">
                              <div className="avatar-icon">
                                <img alt="..." src={avatar6} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-item-offset">9:25</div>
                        <div className="timeline-item--content">
                          <div className="timeline-item--icon" />
                          <h4 className="timeline-item--label mb-2 font-weight-bold">
                            Business investor meeting
                          </h4>
                          <p>
                            Mosaic, the first graphical browser, is introduced
                            to the average consumer.
                          </p>
                          <div className="mt-3">
                            <a href="#/" onClick={(e) => e.preventDefault()}>
                              <img
                                alt="..."
                                className="img-fluid rounded mr-3 shadow-sm"
                                src={people1}
                                width="70"
                              />
                            </a>
                            <a href="#/" onClick={(e) => e.preventDefault()}>
                              <img
                                alt="..."
                                className="img-fluid rounded shadow-sm"
                                src={people3}
                                width="70"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-item-offset">9:25</div>
                        <div className="timeline-item--content">
                          <div className="timeline-item--icon" />
                          <h4 className="timeline-item--label mb-2 font-weight-bold">
                            Learning round table gathering
                          </h4>
                          <p>First ever iPod launches.</p>
                          <div className="mt-2">
                            <Button
                              size="small"
                              variant="contained"
                              className="btn-primary">
                              Submit Report
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="timeline-item">
                        <div className="timeline-item-offset">9:25</div>
                        <div className="timeline-item--content">
                          <div className="timeline-item--icon" />
                          <h4 className="timeline-item--label mb-2 font-weight-bold">
                            2003
                          </h4>
                          <p>
                            MySpace becomes the most popular social network.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <div className="text-center my-2">
                      <div className="avatar-icon-wrapper rounded-circle m-0">
                        <div className="d-inline-flex justify-content-center p-0 rounded-circle avatar-icon-wrapper bg-neutral-danger text-danger m-0 d-130">
                          <FontAwesomeIcon
                            icon={['fas', 'times']}
                            className="d-flex align-self-center display-3"
                          />
                        </div>
                      </div>
                      <h6 className="font-weight-bold font-size-lg mb-1 mt-4 text-black">
                        Incoming messages
                      </h6>
                      <p className="text-black-50 mb-0">
                        You have pending actions to take care of.
                      </p>
                    </div>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <div className="text-center text-black font-size-lg pb-1 font-weight-bold">
                      Total Sales
                      <small className="d-block text-black-50">
                        Total performance for selected period
                      </small>
                    </div>
                    <div className="px-2 pb-3 pt-2">
                      <Chart
                        options={chartHeaderDotsOptions}
                        series={chartHeaderDotsData}
                        type="bar"
                        height={148}
                      />
                    </div>
                  </TabPanel>
                </PerfectScrollbar>
              </div>
              <Divider />
              <div className="text-center py-3">
                <Badge
                  color="error"
                  variant="dot"
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}>
                  <Button
                    className="btn-gradient bg-midnight-bloom px-4"
                    variant="contained">
                    <span className="btn-wrapper--label">Learn more</span>
                    <span className="btn-wrapper--icon">
                      <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                    </span>
                  </Button>
                </Badge>
              </div>
            </div>
          </Popover>
        </span>
      </div>
    </>
  );
};

export default HeaderDots;
