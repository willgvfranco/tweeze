import React from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';

const SearchBar = ({ style, label }) => (
  <div style={style}>
    <TextField
      variant="outlined"
      size="small"
      id="input-with-icon-textfield1"
      label={label}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchTwoToneIcon />
          </InputAdornment>
        )
      }}
    />
  </div>
);

export default SearchBar;
