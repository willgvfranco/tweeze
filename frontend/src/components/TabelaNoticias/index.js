import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles, lighten } from '@material-ui/core/styles';
import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Paper,
  Typography,
  Checkbox,
  TablePagination,
  TableSortLabel,
  Collapse,
  IconButton,
  Tooltip,
  Box
} from '@material-ui/core';
import { Launch, KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';

import placeholder from '../../assets/images/illustrations/pack1/wireframe.svg';
import Loader from '../Loader';

import { search } from '../../reducers/NewsDuck';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el) => [el]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Título',
    width: '45%'
  },
  {
    id: 'url',
    numeric: false,
    disablePadding: false,
    label: 'URL',
    width: '20%'
  },
  {
    id: 'source',
    numeric: false,
    disablePadding: false,
    label: 'Fonte',
    width: '15%'
  },
  {
    id: 'criado',
    numeric: false,
    disablePadding: false,
    label: 'Data',
    width: '15%'
  }
];

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
    <div style={{ width: '45%', margin: '1rem auto' }}>
      <div
        className="display-3 font-weight-bold"
        style={{ textAlign: 'center', fontSize: '2rem' }}>
        {selectedWord?._id
          ? 'Nenhuma notícia encontrada..'
          : 'Selecione um grupo de notícias'}
      </div>
      <img alt="..." className="w-100 img-fluid" src={placeholder} />
    </div>
  );

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="none" />
        <TableCell padding="none" />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={headCell?.width && { width: headCell?.width }}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

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

const EnhancedTableToolbar = ({ numSelected, ReportBtn }) => {
  const classes = useToolbarStyles();

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

          {ReportBtn && <ReportBtn />}
        </>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

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
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}));

const ROWS_PER_PAGE = 100;

const TabelaNoticias = ({
  news,
  isLoading,
  selectedNews,
  setSelectedNews,
  selectedWord,
  beginDate,
  endDate,
  search,
  ReportBtn
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
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
    if (open === '') {
      setOpen(id);
    } else {
      setOpen('');
    }
  };

  return renderTable ? (
    <Paper className={classes.paper}>
      <EnhancedTableToolbar
        numSelected={selectedNews.length}
        ReportBtn={ReportBtn}
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
            classes={classes}
            numSelected={selectedNews.length}
            order={order}
            orderBy={orderBy}
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
                        <Tooltip title="Descrição">
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
                        </Tooltip>
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
                          <Box style={{ padding: '1rem 4rem' }}>
                            Descrição: {news._source.description}
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
        count={-1}
        rowsPerPage={
          (page + 1) * ROWS_PER_PAGE - news.length <= ROWS_PER_PAGE
            ? ROWS_PER_PAGE
            : news.length
        }
        page={page}
        onChangePage={handleChangePage}
        labelDisplayedRows={({ from, count }) =>
          `${from}-${news.length} de ${count !== -1 ? count : news.length}`
        }
        nextIconButtonText="Buscar mais"
        backIconButtonText="Voltar"
        rowsPerPageOptions={[]}
      />
    </Paper>
  ) : (
    <Paper className={classes.paper}>
      <EnhancedTableToolbar numSelected={selectedNews.length} />
      <TableContainer className={`tweeze-scrollbar ${classes.tableContainer}`}>
        <PlaceHolder
          isLoading={isLoading || loadingMore}
          selectedWord={selectedWord}
        />
      </TableContainer>
    </Paper>
  );
};

const mapStateToProps = ({ news }) => ({ news: news.news });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ search }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TabelaNoticias);
