import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { usePDF } from '@react-pdf/renderer';

import {
  Toolbar,
  Typography,
  Button,
  CircularProgress
} from '@material-ui/core';
import { makeStyles, lighten } from '@material-ui/core/styles';

import PDFDocument from './PDFDocument';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: '1 1 100%'
  }
}));

const handleNews = (news) => {
  const newsObj = {};
  for (const key in Object(news)) {
    newsObj[news[key]._id] = news[key];
  }

  return newsObj;
};

const EnhancedTableToolbar = ({ news, selectedNews, numSelected }) => {
  const classes = useToolbarStyles();
  const [newsObj, setNewsObj] = useState({});
  const [download, setDownload] = useState(false);
  const [instance, updateInstance] = usePDF({
    document: PDFDocument({ selectedNews: selectedNews, news: newsObj })
  });

  useEffect(() => {
    setNewsObj(handleNews(news));
  }, [news]);

  const handleDownload = () => {
    updateInstance();
    setDownload(true);
  };

  const downloadFile = () => {
    const link = document.createElement('a');
    link.setAttribute('href', instance.url);
    link.setAttribute('download', 'relatorio_tweeze.pdf');

    document.body.appendChild(link);
    link.click();
    setDownload(false);
  };

  useEffect(() => {
    if (!instance.loading && instance.url && download) {
      downloadFile();
    }
  }, [instance, download]);

  const ReportBtn = () => (
    <Button
      variant="contained"
      className="btn-primary"
      onClick={handleDownload}
      disabled={selectedNews.length === 0}
      style={{ width: '10rem', fontSize: '1rem' }}>
      {instance.loading ? (
        <CircularProgress
          style={{
            width: '18px',
            height: '18px',
            color: 'white'
          }}
        />
      ) : (
        'Gerar relatório'
      )}
    </Button>
  );

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}>
      {numSelected > 0 && (
        <>
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
            component="div">
            {numSelected} notícia(s) selecionada(s)
          </Typography>

          <ReportBtn />
        </>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selectedNews: PropTypes.array.isRequired,
  news: PropTypes.array.isRequired
};

export default EnhancedTableToolbar;
