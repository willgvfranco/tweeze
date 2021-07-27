import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  FormControlLabel,
  Button,
  Checkbox,
  Card,
  InputAdornment,
  TextField
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import 'date-fns';

import { PageTitle } from '../layout-components';
import Select from '../components/Select';
import TabelaNoticias from '../components/TabelaNoticias';

const SearchBar = () => (
  <div style={{ width: '30rem' }}>
    <TextField
      variant="outlined"
      size="small"
      id="input-with-icon-textfield1"
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

const Noticias = () => {
  const [group, setGroup] = useState('');
  const [reportType, setReportType] = useState('');
  const [days, setDays] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date('2020-08-18'));
  const [automatic, setAutomatic] = useState(false);

  const handleDateChange = (date) => setSelectedDate(date);

  const handleChange = (event, handler) => handler(event.target.value);

  return (
    <>
      <PageTitle
        titleHeading="Relatórios"
        titleDescription="Consulta de clippings e geração de relatórios">
        <SearchBar />
      </PageTitle>

      <Card
        style={{ display: 'flex', alignItems: 'center' }}
        className="rounded w-100 bg-white p-3 mb-3">
        <Select
          className="w-50"
          id="clipping-group-select"
          labelId="clipping-group"
          label="Selecione o grupo para o clipping"
          value={group}
          onChange={(e) => handleChange(e, setGroup)}
          items={['grupo 1', 'grupo 2', 'grupo 3']}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="ml-5 mr-3">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker"
              label="Selecione o período"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </div>
        </MuiPickersUtilsProvider>

        <Select
          className="m-3"
          style={{ width: '15rem' }}
          id="report-type-select"
          labelId="report-type"
          label="Incluir relatórios de"
          value={reportType}
          onChange={(e) => handleChange(e, setReportType)}
          items={['tipo 1', 'tipo 2', 'tipo 3']}
        />
      </Card>

      <TabelaNoticias />

      <Card
        style={{ display: 'flex', alignItems: 'center' }}
        className="rounded w-100 bg-white mt-3 p-3">
        <FormControlLabel
          control={
            <Checkbox
              checked={automatic}
              onChange={() => setAutomatic(!automatic)}
              value="automatic"
            />
          }
          label="Deseja habilitar o envio automático desse clipping?"
        />

        <TextField
          className="m-2"
          id="email"
          label="Digite seu e-mail"
          variant="outlined"
        />

        <Select
          className="m-3"
          style={{ width: '15rem' }}
          id="frequency-select"
          labelId="frequency"
          label="Defina a frequência"
          value={days}
          onChange={(e) => handleChange(e, setDays)}
          items={['7 dias', '15 dias', '30 dias']}
        />

        <Button variant="contained" className="btn-primary m-2 ml-auto">
          Gerar relatório
        </Button>
      </Card>
    </>
  );
};

export default Noticias;
