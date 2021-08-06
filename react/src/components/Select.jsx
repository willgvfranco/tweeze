import React from 'react';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

const SelectForm = ({
  className,
  labelId,
  value,
  onChange,
  label,
  style,
  items,
  ...props
}) => (
  <FormControl className={className} variant="outlined" style={style}>
    <InputLabel id={labelId}>{label}</InputLabel>
    <Select
      labelId={labelId}
      value={value}
      onChange={onChange}
      label={label}
      {...props}>
      {items?.map((item, index) =>
        item?._id ? (
          <MenuItem key={item._id} value={item._id}>
            {item.name}
          </MenuItem>
        ) : (
          (
            <MenuItem key={`${index}-${item}`} value={item}>
              {item}
            </MenuItem>
          ) || (
            <MenuItem value="">
              <em>Nenhum</em>
            </MenuItem>
          )
        )
      )}
    </Select>
  </FormControl>
);

export default SelectForm;
