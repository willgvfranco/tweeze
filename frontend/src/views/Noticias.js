import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DateFnsUtils from '@date-io/date-fns';
import {
  FormControlLabel,
  Button,
  Checkbox,
  Card,
  TextField
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import 'date-fns';

import PageTitle from '../components/PageTitle';
import Select from '../components/Select';
import TabelaNoticias from '../components/TabelaNoticias';
import Loader from '../components/Loader';
import PDFDocument from '../components/PDFDocument';

import { getAllWords } from '../reducers/WordsDuck';
import { search } from '../reducers/NewsDuck';

const handleNews = (news) => {
  const newsObj = {};
  for (const key in Object(news)) {
    newsObj[news[key]._id] = news[key];
  }

  return newsObj;
};

const Noticias = ({ words, getAllWords, search, news }) => {
  const [selectedWord, setSelectedWord] = useState('');
  const [days, setDays] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date('2020-08-18'));
  const [automatic, setAutomatic] = useState(false);
  const [loadingNews, setLoadingNews] = useState(false);
  const [loadingWords, setLoadingWords] = useState(false);
  const [selectedNews, setSelectedNews] = useState([]);

  useEffect(() => {
    if (Object.keys(words).length === 0) {
      setLoadingWords(true);
      getAllWords();
      return;
    }

    if (loadingWords) {
      setLoadingWords(false);
    }
  }, [words]);

  useEffect(() => {
    if (loadingNews) {
      setLoadingNews(false);
    }
  }, [news]);

  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (!selectedWord) {
      return;
    }

    setLoadingNews(true);
    search({
      word: words[selectedWord],
      date: date
    });
  };

  const handleChange = (event, handler) => handler(event.target.value);

  const handleSelectedWord = (event) => {
    setSelectedWord(event.target.value);
    setLoadingNews(true);
    search({
      word: words[event.target.value],
      date: selectedDate
    });
  };

  return loadingWords ? (
    <Loader isLoading={loadingWords} />
  ) : (
    <>
      <PageTitle
        titleHeading="Relatórios"
        titleDescription="Consulta de clippings e geração de relatórios">
        <Select
          style={{ width: '20rem' }}
          id="clipping-word-select"
          labelId="clipping-word"
          label="Selecione o grupo para o clipping"
          value={selectedWord}
          onChange={(e) => handleSelectedWord(e)}
          items={Object.values(words)?.map((word) => word)}
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
      </PageTitle>

      <TabelaNoticias
        isLoading={loadingNews}
        selectedNews={selectedNews}
        setSelectedNews={setSelectedNews}
      />

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
          disabled={!automatic}
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
          disabled={!automatic}
        />

        <PDFDownloadLink
          document={
            <PDFDocument selectedNews={selectedNews} news={handleNews(news)} />
          }
          fileName="relatorio_tweeze.pdf"
          className="m-2 ml-auto">
          {({ loading }) =>
            loading ? (
              <Loader isLoading={loading} />
            ) : (
              <Button variant="contained" className="btn-primary">
                Gerar relatório
              </Button>
            )
          }
        </PDFDownloadLink>
      </Card>
    </>
  );
};

const mapStateToProps = ({ words, news }) => ({
  words: words.words,
  news: news.news
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getAllWords, search }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Noticias);