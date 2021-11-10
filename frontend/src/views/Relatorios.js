import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Button,
  Tooltip,
  List,
  ListItem,
  Card,
  Grid,
  Dialog
} from '@material-ui/core';
import { Assignment, Add, Edit, Delete, Close } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import PageTitle from '../components/PageTitle';
import Select from '../components/Select';
import ConditionalRender from '../components/ConditionalRender';

import { getAllWords } from '../reducers/WordsDuck';

const useStyles = makeStyles((theme) => ({
  title: {
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  titleIcon: {
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      right: '50px'
    },
    [theme.breakpoints.down('xs')]: {
      position: 'initial',
      right: 'unset'
    }
  },
  dialog: {
    maxWidth: '50vw',
    [theme.breakpoints.down('lg')]: {
      maxWidth: '80vw'
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '90vw'
    },
    minHeight: '30rem'
  },
  modalBtns: {
    margin: 'auto auto 2rem auto',
    display: 'flex',
    justifyContent: 'space-around',
    width: '70%'
  }
}));

const mockReports = [
  'Relatório 1',
  'Relatório 2',
  'Relatório 3',
  'Relatório 4',
  'Relatório 5',
  'Relatório 6',
  'Relatório 7',
  'Relatório 7',
  'Relatório 7',
  'Relatório 7',
  'Relatório 7',
  'Relatório 7',
  'Relatório 7',
  'Relatório 7',
  'Relatório 7',
  'Relatório 7',
  'Relatório 7',
  'Relatório 7',
  'Relatório 7',
  'Relatório 7',
  'Relatório 7',
  'Relatório 7',
  'Relatório 7'
];

const CreateReport = ({ open, onClose, words, classes }) => {
  const [days, setDays] = useState('');
  const [group, setGroup] = useState('');

  const handleChange = (event, handler) => handler(event.target.value);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{
        paper: `modal-content rounded-lg w-100 p-3 ${classes.editDialog}`
      }}
      aria-labelledby="simple-dialog-title">
      <div className="p-3 font-size-xl font-weight-bold">Criar Relatório</div>

      <div style={{ display: 'flex', margin: '1rem 0 3rem 0' }}>
        <Select
          className="m-3"
          style={{ width: '15rem' }}
          id="frequency-select"
          labelId="frequency"
          label="Defina o grupo"
          value={group}
          onChange={(e) => handleChange(e, setGroup)}
          items={[...words]}
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
      </div>

      <div className={classes.modalBtns}>
        <Button
          onClick={onClose}
          variant="outlined"
          className="btn-secondary btn-pill mx-1"
          style={{ minWidth: 'fit-content' }}>
          <span className="btn-wrapper--label">Cancelar</span>
        </Button>
        <Button
          // onClick={handleAction}
          className="btn-primary btn-pill mx-1"
          style={{ minWidth: 'fit-content' }}>
          <span className="btn-wrapper--label">Salvar</span>
        </Button>
      </div>
    </Dialog>
  );
};

// const DeleteReport = ({ open, onClose, selectedGroup, words, onAction }) => {
const DeleteReport = ({ open, onClose }) => {
  // const handleAction = () => {
  //   onAction(selectedGroup);
  //   onClose();
  // };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: 'shadow-lg rounded' }}>
      <div className="text-center p-5">
        <div className="avatar-icon-wrapper rounded-circle m-0">
          <div className="d-inline-flex justify-content-center p-0 rounded-circle btn-icon avatar-icon-wrapper bg-neutral-danger text-danger m-0 d-80">
            <Close className="d-flex align-self-center display-3" />
          </div>
        </div>
        <h4 className="font-weight-bold mt-4">
          {/* Tem certeza que deseja deletar o grupo '{words[selectedGroup]?.name}'? */}
          Tem certeza que deseja deletar o relatório?
        </h4>
        <p className="mb-0 font-size-lg text-muted">
          Você não poderá desfazer essa ação.
        </p>
        <div className="pt-4">
          <Button
            onClick={onClose}
            className="btn-neutral-secondary btn-pill mx-1">
            <span className="btn-wrapper--label">Cancelar</span>
          </Button>
          {/* <Button onClick={handleAction} className="btn-danger btn-pill mx-1"> */}
          <Button className="btn-danger btn-pill mx-1">
            <span className="btn-wrapper--label">Deletar</span>
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

const Relatorios = ({ words, getAllWords, hasUser }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [wordsArray, setWordsArray] = useState([]);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
    if (Object.keys(words).length === 0) {
      setLoading(true);
      getAllWords();
    }
  }, [words, hasUser]);

  useEffect(() => {
    if (Object.keys(words).length) {
      setWordsArray(Object.values(words).map((word) => word.name));
    }
  }, [words]);

  return (
    <ConditionalRender conditional={!!loading}>
      <PageTitle
        titleHeading="Relatórios"
        titleDescription="Administrar seus relatórios automatizados"
        titleClass={classes.title}
        wrapperClass={classes.titleIcon}
        icon={<Assignment />}>
        <Tooltip
          title="Criar novo relatório"
          arrow
          placement="bottom-end"
          classes={{ tooltip: 'p-3' }}>
          <Button
            variant="contained"
            size="small"
            className="d-40 btn-success ml-3"
            onClick={() => setCreateDialog(true)}>
            <span className="btn-wrapper--icon">
              <Add className="opacity-8" />
            </span>
          </Button>
        </Tooltip>
      </PageTitle>

      <Card className="card-box">
        <div className="card-header bg-light">
          <div className="card-header--title">
            <b>Relatórios Automáticos Cadastrados</b>
          </div>
        </div>
        <List
          component="div"
          className="list-group-flush tweeze-scrollbar"
          style={{ overflowY: 'auto', maxHeight: '73vh' }}>
          {mockReports.map((report, index) => (
            <ListItem key={index} className="py-3">
              <Grid container spacing={0}>
                <Grid item xl={6} md={12} className="d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <div>
                      <div className="font-weight-bold text-black">
                        {report}
                      </div>
                      <span className="text-black-50 d-block">
                        Criado em 20/09/21
                      </span>
                    </div>
                  </div>
                </Grid>
                <Grid
                  item
                  xl={6}
                  md={12}
                  className="pt-3 pt-xl-0 d-flex align-items-center">
                  <div
                    className="align-box-row flex-grow-1"
                    style={{ justifyContent: 'flex-end' }}>
                    <Button
                      className="btn-outline-dark border-1 m-2 px-3 py-1"
                      variant="outlined">
                      <Edit fontSize="small" />
                    </Button>
                    <Button
                      className="btn-outline-dark border-1 m-2 px-3 py-1"
                      variant="outlined"
                      onClick={() => setDeleteDialog(true)}>
                      <Delete fontSize="small" />
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Card>

      <CreateReport
        open={createDialog}
        words={wordsArray}
        onClose={() => setCreateDialog(false)}
        classes={classes}
      />

      <DeleteReport
        open={deleteDialog}
        // words={words}
        // selectedGroup={selectedGroup}
        onClose={() => setDeleteDialog(false)}
        // onAction={deleteWord}
      />
    </ConditionalRender>
  );
};

const mapStateToProps = ({ words, auth }) => ({
  words: words.words,
  hasUser: auth.id !== ''
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getAllWords }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Relatorios);
