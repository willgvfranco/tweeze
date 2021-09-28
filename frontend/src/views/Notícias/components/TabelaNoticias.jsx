import React, { useState, useEffect, Fragment, memo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Checkbox,
  TablePagination,
  Collapse,
  IconButton,
  Box
} from '@material-ui/core';
import { Launch, KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';

import placeholder from '../../../assets/images/illustrations/wireframe.svg';
import Loader from '../../../components/Loader';
import EnhancedTableHead from './TableHead';
import EnhancedTableToolbar from './TableToolbar';

import { search } from '../../../reducers/NewsDuck';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableContainer: {
    maxHeight: '70vh'
  }
}));

const ROWS_PER_PAGE = 100;

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el) => [el]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const PlaceHolder = ({ isLoading, selectedWord }) =>
  isLoading ? (
    <div
      style={{
        height: '70vh',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center'
      }}>
      <Loader isLoading={isLoading} />
    </div>
  ) : (
    <>
      <div style={{ width: '35%', margin: '4rem auto' }}>
        <div
          className="display-3 font-weight-bold"
          style={{ textAlign: 'center', fontSize: '2rem' }}>
          {selectedWord?._id
            ? 'Nenhuma notícia encontrada..'
            : 'Selecione um grupo de notícias'}
        </div>
        <img alt="..." className="w-100 img-fluid" src={placeholder} />
      </div>
    </>
  );

const TabelaNoticias = ({
  news,
  isLoading,
  selectedWord,
  beginDate,
  endDate,
  search,
  totalNews
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedNews, setSelectedNews] = useState([]);
  const [open, setOpen] = useState('');

  useEffect(() => {
    if (news.length) {
      setLoadingMore(false);
    }
  }, [news.length]);

  useEffect(() => {
    if (loadingMore) {
      setLoadingMore(false);
    }
  }, [news]);

  useEffect(() => {
    if (page > 0) {
      setPage(0);
    }
  }, [selectedWord]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = news.map((n) => n._id);
      setSelectedNews(newSelecteds);
      return;
    }
    setSelectedNews([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selectedNews.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedNews, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedNews.slice(1));
    } else if (selectedIndex === selectedNews.length - 1) {
      newSelected = newSelected.concat(selectedNews.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedNews.slice(0, selectedIndex),
        selectedNews.slice(selectedIndex + 1)
      );
    }

    setSelectedNews(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    if (!renderTable) return;

    if (news.length === totalNews) {
      setPage(newPage);
      return;
    }

    if (newPage > page && news.length < (newPage + 1) * ROWS_PER_PAGE) {
      setLoadingMore(true);
      search({
        word: selectedWord,
        beginDate,
        endDate,
        from:
          news.length < (newPage + 1) * ROWS_PER_PAGE
            ? news.length
            : (newPage + 1) * ROWS_PER_PAGE
      });
    }

    const returnedMoreThan100 =
      (newPage + 1) * ROWS_PER_PAGE - news.length <= ROWS_PER_PAGE;
    if (returnedMoreThan100) {
      setPage(newPage);
    }
  };

  const isSelected = (id) => selectedNews.indexOf(id) !== -1;

  const renderTable = news.length !== 0 && !isLoading && !loadingMore;

  const handleOpenCollapse = (id) => {
    if (open === id) {
      setOpen('');
      return;
    }

    setOpen(id);
  };

  return renderTable ? (
    <Paper className={classes.paper}>
      <EnhancedTableToolbar
        news={news}
        numSelected={selectedNews.length}
        selectedNews={selectedNews}
        beginDate={beginDate}
        endDate={endDate}
      />
      <TableContainer
        className={`tweeze-scrollbar ${classes.tableContainer}`}
        style={{ overflowX: 'hidden' }}>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          stickyHeader
          size="small"
          aria-label="enhanced table">
          <EnhancedTableHead
            numSelected={selectedNews.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={news.length}
          />
          <TableBody>
            {stableSort(news, getComparator(order, orderBy))
              .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
              .map((news) => {
                const isItemSelected = isSelected(news._id);

                return (
                  <Fragment key={news._id}>
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      // key={news._id}
                      selected={isItemSelected}
                      style={{ cursor: 'pointer' }}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, news._id)}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          disabled={!news._source.description}
                          onClick={() => handleOpenCollapse(news._id)}>
                          {open === news._id ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" scope="rows" padding="default">
                        {news._source.title}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          whiteSpace: 'nowrap',
                          maxWidth: '220px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                        <a href={news._source.url} target="_blank">
                          <Launch style={{ marginRight: '10px' }} />
                          {news._source.url}
                        </a>
                      </TableCell>
                      <TableCell align="left">{news._source.source}</TableCell>
                      <TableCell align="left">
                        {new Date(news._source.criado).toLocaleString()}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}>
                        <Collapse in={open === news._id} timeout="auto">
                          <Box
                            style={{
                              padding: '1rem 4rem',
                              textAlign: 'justify'
                            }}>
                            Descrição:{' '}
                            {news._source.description.length > 600
                              ? `${news._source.description.slice(0, 600)}...`
                              : news._source.description}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalNews}
        rowsPerPage={
          (page + 1) * ROWS_PER_PAGE - news.length <= ROWS_PER_PAGE
            ? ROWS_PER_PAGE
            : news.length
        }
        page={page}
        onChangePage={handleChangePage}
        labelDisplayedRows={({ from }) =>
          `${from}-${news.length} de ${totalNews}`
        }
        nextIconButtonText="Buscar mais"
        backIconButtonText="Voltar"
        rowsPerPageOptions={[]}
      />
    </Paper>
  ) : (
    <Paper className={classes.paper}>
      <TableContainer className={`tweeze-scrollbar ${classes.tableContainer}`}>
        <PlaceHolder
          isLoading={isLoading || loadingMore}
          selectedWord={selectedWord}
        />
      </TableContainer>
    </Paper>
  );
};

const mapStateToProps = ({ news }) => ({
  news: news.news,
  totalNews: news.total_news
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ search }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(TabelaNoticias));
