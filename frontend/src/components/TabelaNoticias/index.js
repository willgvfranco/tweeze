import React, { useState } from 'react';
import { connect } from 'react-redux';
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
  TableSortLabel
} from '@material-ui/core';

import placeholder from '../../assets/images/illustrations/pack1/wireframe.svg';
import Loader from '../Loader';

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
    width: '35%'
  },
  {
    id: 'url',
    numeric: false,
    disablePadding: false,
    label: 'URL',
    width: '25%'
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
    width: '20%'
  }
];

const PlaceHolder = ({ isLoading }) =>
  isLoading ? (
    <Loader isLoading={isLoading} />
  ) : (
    <div style={{ width: '45%', margin: '0 auto' }}>
      <div
        className="display-3 font-weight-bold"
        style={{ textAlign: 'center', fontSize: '2rem' }}>
        Nenhuma notícia encontrada..
      </div>
      <img alt="..." className="w-100 img-fluid" src={placeholder} />
    </div>
  );

function EnhancedTableHead(props) {
  const {
    classes,
    // onSelectAllClick,
    order,
    orderBy,
    // numSelected,
    // rowCount,
    onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          /> */}
        </TableCell>
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
  // onSelectAllClick: PropTypes.func.isRequired,
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

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}>
      {numSelected > 0 && (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div">
          {numSelected} notícia(s) selecionada(s)
        </Typography>
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

const TabelaNoticias = ({ news, isLoading, selectedNews, setSelectedNews }) => {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = news.map((n) => n._id);
  //     setSelectedNews(newSelecteds);
  //     return;
  //   }
  //   setSelectedNews([]);
  // };

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
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selectedNews.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, news.length - page * rowsPerPage);

  return (
    <>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selectedNews.length} />
        <TableContainer>
          {news.length !== 0 && !isLoading ? (
            <>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size="small"
                aria-label="enhanced table">
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selectedNews.length}
                  order={order}
                  orderBy={orderBy}
                  // onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={news.length}
                />
                <TableBody>
                  {stableSort(news, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((news) => {
                      const isItemSelected = isSelected(news._id);

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={news._id}
                          selected={isItemSelected}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onClick={(event) => handleClick(event, news._id)}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="rows"
                            padding="default">
                            {news._source.title}
                          </TableCell>
                          <TableCell align="left">
                            <a href={news._source.url} target="_blank">
                              {news._source.url.slice(0, 50) + '...'}
                            </a>
                          </TableCell>
                          <TableCell align="left">
                            {news._source.source}
                          </TableCell>
                          <TableCell align="left">
                            {new Date(news._source.criado).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 40 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[20, 50, 100]}
                component="div"
                count={news.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                labelRowsPerPage="Notícias por página:"
              />
            </>
          ) : (
            <PlaceHolder isLoading={isLoading} />
          )}
        </TableContainer>
      </Paper>
    </>
  );
};

const mapStateToProps = ({ news }) => ({ news: news.news });

export default connect(mapStateToProps)(TabelaNoticias);
