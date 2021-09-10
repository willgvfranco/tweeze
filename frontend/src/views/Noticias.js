import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DateFnsUtils from '@date-io/date-fns';
import ptLocale from 'date-fns/locale/pt-BR';
import 'date-fns';

import {
  // FormControlLabel,
  Button,
  // Checkbox,
  // Card,
  // TextField,
  Snackbar
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { Ballot } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import PageTitle from '../components/PageTitle';
import Select from '../components/Select';
import TabelaNoticias from '../components/TabelaNoticias';
import PDFDocument from '../components/PDFDocument';
import ConditionalRender from '../components/ConditionalRender';

import { getAllWords } from '../reducers/WordsDuck';
import { search } from '../reducers/NewsDuck';

const useStyles = makeStyles((theme) => ({
  headerActions: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      width: '100%'
    },
    [theme.breakpoints.down('md')]: {
      marginTop: '2rem'
    }
  },
  dropdown: {
    width: '20rem',
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '17.5rem',
      marginLeft: 0,
      marginBottom: '0.5rem'
    },
    '& > label': {
      width: '80%'
    }
  },
  datePicker: {
    marginTop: '8px',
    [theme.breakpoints.down('xl')]: {
      marginLeft: '1rem'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      width: 'unset',
      marginBottom: '0.5rem'
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: '2rem',
      width: '25%'
    }
  }
}));

const QUANTITY = 100;

const handleNews = (news) => {
  const newsObj = {};
  for (const key in Object(news)) {
    newsObj[news[key]._id] = news[key];
  }

  return newsObj;
};

const Message = (props) => {
  return (
    <Alert
      elevation={6}
      variant="filled"
      {...props}
      style={{ color: 'white', fontSize: '16px' }}
    />
  );
};

const Noticias = ({ words, getAllWords, search, news, newsError, hasUser }) => {
  const beginDateDefault = () => {
    if (new Date().getDate() === 1) {
      return new Date(new Date().setDate(0));
    }
    return new Date().setDate(new Date().getDate() - 1);
  };
  const [selectedWord, setSelectedWord] = useState('');
  // const [days, setDays] = useState('');
  const [beginDate, setBeginDate] = useState(beginDateDefault());
  const [endDate, setEndDate] = useState(new Date());
  // const [automatic, setAutomatic] = useState(false);
  const [loading, setLoading] = useState('');
  const [selectedNews, setSelectedNews] = useState([]);
  const [newsObj, setNewsObj] = useState({});
  const [openWarning, setOpenWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const classes = useStyles();

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

  useEffect(() => {
    if (newsError === 'search') {
      setWarningMessage('Erro ao buscar as notícias!');
      setOpenWarning(true);
    } else if (newsError !== '') {
      setWarningMessage('Ocorreu algum erro!');
      setOpenWarning(true);
    }
  }, [newsError]);

  const handleBeginDateChange = (date) => {
    setBeginDate(date);
    if (!selectedWord) {
      return;
    }

    setLoading('news');
    search({
      word: words[selectedWord],
      beginDate: date,
      endDate,
      qnt: QUANTITY
    });
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (!selectedWord) {
      return;
    }

    setLoading('news');
    search({
      word: words[selectedWord],
      beginDate,
      endDate: date,
      qnt: QUANTITY
    });
  };

  // const handleChange = (event, handler) => handler(event.target.value);

  const handleSelectedWord = (event) => {
    setSelectedWord(event.target.value);
    setLoading('news');
    search({
      word: words[event.target.value],
      beginDate,
      endDate,
      qnt: QUANTITY
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenWarning(false);
  };

  return (
    <ConditionalRender conditional={loading === 'words'}>
      <PageTitle
        titleHeading="Relatórios"
        titleDescription="Consulta de clippings e geração de relatórios"
        wrapperClass={classes.headerActions}
        icon={<Ballot />}>
        <Select
          className={classes.dropdown}
          id="clipping-word-select"
          labelId="clipping-word"
          label="Selecione o grupo para o clipping"
          value={selectedWord}
          onChange={(e) => handleSelectedWord(e)}
          items={Object.values(words)?.map((word) => word)}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
          <KeyboardDatePicker
            className={classes.datePicker}
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="begin-date"
            label="Selecione o período"
            value={beginDate}
            maxDate={endDate}
            disableFuture
            inputVariant="outlined"
            onChange={handleBeginDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={classes.datePicker}
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="end-date"
            label="Selecione o período"
            value={endDate}
            minDate={beginDate}
            disableFuture
            inputVariant="outlined"
            onChange={handleEndDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>
      </PageTitle>

      <TabelaNoticias
        isLoading={loading === 'news'}
        selectedNews={selectedNews}
        setSelectedNews={setSelectedNews}
        selectedWord={words[selectedWord]}
        beginDate={beginDate}
        endDate={endDate}
        ReportBtn={() => (
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
              disabled={selectedNews.length === 0}
              style={{ width: '10rem', fontSize: '1rem' }}>
              Gerar relatório
            </Button>
          </PDFDownloadLink>
        )}
      />

      <Snackbar
        open={openWarning}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
        autoHideDuration={5000}>
        <Message severity="error" onClose={handleClose}>
          {warningMessage}
        </Message>
      </Snackbar>
      {/* 
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
      </Card> */}
    </ConditionalRender>
  );
};

const mapStateToProps = ({ words, news, auth }) => ({
  words: words.words,
  news: news.news,
  newsError: news.error,
  hasUser: auth.id !== ''
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getAllWords, search }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Noticias);
