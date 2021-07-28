import React from 'react';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

const SelectForm = ({
  className,
  labelId,
  id,
  value,
  onChange,
  label,
  style,
  items,
  classes
}) => (
  <FormControl className={className} variant="outlined" style={style}>
    <InputLabel id={labelId}>{label}</InputLabel>
    <Select
      classes={classes}
      labelId={labelId}
      id={id}
      value={value}
      onChange={onChange}
      label={label}>
      {items?.map((item, index) => (
        <MenuItem key={`${index}-${item}`} value={item}>
          {item}
        </MenuItem>
      )) || (
        <MenuItem value="">
          <em>Nenhum</em>
        </MenuItem>
      )}
    </Select>
  </FormControl>
);

export default SelectForm;
