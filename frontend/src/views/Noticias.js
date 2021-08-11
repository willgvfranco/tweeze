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
import PDFDocument from '../components/PDFDocument';
import ConditionalRender from '../components/ConditionalRender';

import { getAllWords } from '../reducers/WordsDuck';
import { search } from '../reducers/NewsDuck';

const handleNews = (news) => {
  const newsObj = {};
  for (const key in Object(news)) {
    newsObj[news[key]._id] = news[key];
  }

  return newsObj;
};

const Noticias = ({ words, getAllWords, search, news, hasUser }) => {
  const [selectedWord, setSelectedWord] = useState('');
  const [days, setDays] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date('2020-08-18'));
  const [automatic, setAutomatic] = useState(false);
  const [loading, setLoading] = useState('');
  const [selectedNews, setSelectedNews] = useState([]);
  const [newsObj, setNewsObj] = useState({});

  useEffect(() => {
    if (loading === 'words') {
      setLoading('');
    }
    if (Object.keys(words).length === 0) {
      setLoading('words');
      getAllWords();
    }
  }, [words, hasUser]);

  useEffect(() => {
    if (loading === 'news') {
      setLoading('');
    }

    setNewsObj(handleNews(news));
  }, [news]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (!selectedWord) {
      return;
    }

    setLoading('news');
    search({
      word: words[selectedWord],
      date: date
    });
  };

  const handleChange = (event, handler) => handler(event.target.value);

  const handleSelectedWord = (event) => {
    setSelectedWord(event.target.value);
    setLoading('news');
    search({
      word: words[event.target.value],
      date: selectedDate
    });
  };

  return (
    <ConditionalRender conditional={loading === 'words'}>
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
        isLoading={loading === 'news'}
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
            selectedNews.length !== 0 ? (
              <PDFDocument selectedNews={selectedNews} news={newsObj} />
            ) : (
              <></>
            )
          }
          fileName="relatorio_tweeze.pdf"
          className="m-2 ml-auto">
          <Button
            variant="contained"
            className="btn-primary"
            disabled={selectedNews.length === 0}>
            Gerar relatório
          </Button>
        </PDFDownloadLink>
      </Card>
    </ConditionalRender>
  );
};

const mapStateToProps = ({ words, news, auth }) => ({
  words: words.words,
  news: news.news,
  hasUser: auth.user !== ''
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getAllWords, search }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Noticias);
