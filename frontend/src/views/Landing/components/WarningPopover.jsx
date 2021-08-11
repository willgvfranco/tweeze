import React from 'react';

import { Popover } from '@material-ui/core';

const WarningPopover = ({ open, anchorEl, handleClosePopover, text }) => (
  <Popover
    open={open}
    anchorEl={anchorEl}
    classes={{ paper: 'rounded font-size-md' }}
    onClose={handleClosePopover}
    anchorOrigin={{
      vertical: 'center',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'center',
      horizontal: 'center'
    }}>
    <div className="rounded-top p-3 font-weight-bold bg-secondary">{text}</div>
  </Popover>
);

export default WarningPopover;
