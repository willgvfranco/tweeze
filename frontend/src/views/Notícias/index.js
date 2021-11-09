import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DateFnsUtils from '@date-io/date-fns';
import ptLocale from 'date-fns/locale/pt-BR';
import 'date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { Ballot } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import TabelaNoticias from './components/TabelaNoticias';
import PageTitle from '../../components/PageTitle';
import Notify from '../../components/Notify';
import Select from '../../components/Select';
import ConditionalRender from '../../components/ConditionalRender';

import { getAllWords } from '../../reducers/WordsDuck';
import { search, clearStatus } from '../../reducers/NewsDuck';

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

const Noticias = ({
  words,
  getAllWords,
  search,
  news,
  status,
  clearStatus,
  hasUser
}) => {
  const beginDateDefault = () => {
    if (new Date().getDate() === 1) {
      return new Date(new Date().setDate(0));
    }
    return new Date().setDate(new Date().getDate() - 1);
  };
  const [selectedWord, setSelectedWord] = useState('');
  const [beginDate, setBeginDate] = useState(beginDateDefault());
  const [endDate, setEndDate] = useState(new Date());
  const [loading, setLoading] = useState('');
  const [openNotify, setOpenNotify] = useState(false);
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
  }, [news]);

  useEffect(() => {
    if (status.description.includes('search')) {
      setOpenNotify(true);
      setLoading('');
    }
  }, [status]);

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
    setOpenNotify(false);
    clearStatus();
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
        selectedWord={words[selectedWord]}
        beginDate={beginDate}
        endDate={endDate}
      />

      <Notify
        open={openNotify}
        handleClose={handleClose}
        msg={status.msg}
        type={status.type || 'error'}
      />
    </ConditionalRender>
  );
};

const mapStateToProps = ({ words, news, auth }) => ({
  words: words.words,
  news: news.news,
  status: news.status,
  hasUser: auth.id !== ''
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getAllWords, search, clearStatus }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Noticias);
