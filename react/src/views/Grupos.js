import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { SyncLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  Button,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Dialog,
  Chip,
  TextField
} from '@material-ui/core';

import PageTitle from '../components/PageTitle';
import Select from '../components/Select';
import SearchBar from '../components/SearchBar';
import notFound from '../assets/images/illustrations/pack4/500.svg';

import { getAllWords, createWord } from '../reducers/WordsDuck';
import BACKEND from '../config/env';

const useStyles = makeStyles((theme) => ({
  groups: {
    [theme.breakpoints.down('md')]: {
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      width: '45%'
    },
    [theme.breakpoints.up('xl')]: {
      width: '30%'
    }
  },
  select: { padding: '11.5px 14px' },
  editDialog: {
    maxWidth: '50vw',
    [theme.breakpoints.down('lg')]: {
      maxWidth: '80vw'
    },
    minHeight: '30rem'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      marginBottim: '4rem'
    },
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      margin: '1rem',
      width: '45%',
      [theme.breakpoints.down('md')]: {
        width: '80%'
      }
    }
  },
  chipPos: {
    margin: '4px 2px',
    color: theme.palette.success.main,
    border: `1px solid ${theme.palette.success.main}`,
    '& .MuiChip-deleteIcon': {
      color: theme.palette.success.main
    }
  },
  chipNeg: {
    margin: '4px 2px',
    color: theme.palette.error.main,
    border: `1px solid ${theme.palette.error.main}`,
    '& .MuiChip-deleteIcon': {
      color: theme.palette.error.main
    }
  }
}));

const Positivas = ({ grupo }) => (
  <List
    style={{
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
    <div className={`badge badge-success text-uppercase`}>Positivas</div>
    {grupo.pos.split(' ').map((el, index) => (
      <ListItem key={`${index}-${el}`} style={{ margin: '0' }}>
        <ListItemText
          primary={el}
          style={{ textAlign: 'center', margin: '0' }}
        />
      </ListItem>
    ))}
  </List>
);

const Negativas = ({ grupo }) => (
  <List
    style={{
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
    <div className={`badge badge-danger text-uppercase`}>Negativas</div>
    {grupo.neg.split(' ').map((el, index) => (
      <ListItem key={`${index}-${el}`} style={{ margin: '0' }}>
        <ListItemText
          primary={el}
          style={{ textAlign: 'center', margin: '0' }}
        />
      </ListItem>
    ))}
  </List>
);

const Header = ({ grupo, handleEdit, handleDelete }) => (
  <div style={{ display: 'flex' }}>
    <CardHeader title={grupo.name} style={{ marginRight: 'auto' }} />
    <Button
      className="btn-outline-dark border-1 m-2 px-3 py-1"
      variant="outlined"
      onClick={handleEdit}>
      <FontAwesomeIcon icon={['far', 'edit']} className="font-size-xs" />
    </Button>
    <Button
      className="btn-outline-dark border-1 m-2 px-3 py-1"
      variant="outlined"
      onClick={handleDelete}>
      <FontAwesomeIcon icon={['far', 'trash-alt']} className="font-size-xs" />
    </Button>
  </div>
);

const EditDialog = ({ open, onClose, selectedGroup, words }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{
        paper: `modal-content rounded-lg w-100 p-3 ${classes.editDialog}`
      }}
      aria-labelledby="simple-dialog-title">
      <div className="p-3 font-size-xl font-weight-bold">Editar Grupo</div>
      <CardHeader title={words[selectedGroup]?.name} />
      <Divider />
      <div className={classes.wrapper}>
        <div>
          <TextField
            className="m-2 mb-4"
            fullWidth
            id="pos"
            label="Insira os termos positivos"
            variant="outlined"
          />
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {words[selectedGroup]?.pos.split(' ').map((pos, index) => (
              <Chip
                label={pos}
                classes={{ root: classes.chipPos }}
                key={`${index}-${pos.name}-${index}`}
                variant="outlined"
                onDelete={() => {}}
              />
            ))}
          </div>
        </div>
        <div>
          <TextField
            className="m-2 mb-4"
            fullWidth
            id="neg"
            label="Insira os termos negativos"
            variant="outlined"
          />
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {words[selectedGroup]?.neg.split(' ').map((neg, index) => (
              <Chip
                label={neg}
                classes={{ root: classes.chipNeg }}
                key={`${index}-${neg.name}-${index}`}
                variant="outlined"
                onDelete={() => {}}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          margin: 'auto auto 2rem auto',
          display: 'flex',
          justifyContent: 'space-around',
          width: '30%'
        }}>
        <Button
          onClick={onClose}
          variant="outlined"
          className="btn-secondary btn-pill mx-1">
          <span className="btn-wrapper--label">Cancelar</span>
        </Button>
        <Button onClick={onClose} className="btn-primary btn-pill mx-1">
          <span className="btn-wrapper--label">Salvar</span>
        </Button>
      </div>
    </Dialog>
  );
};

const CreateDialog = ({ open, onClose, onAdd }) => {
  const [pos, setPos] = useState([]);
  const [neg, setNeg] = useState([]);
  const [name, setName] = useState('');
  const classes = useStyles();

  const handleAdd = () => {
    onAdd({ name, pos: pos.join(' '), neg: neg.join(' ') });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{
        paper: `modal-content rounded-lg w-100 p-3 ${classes.editDialog}`
      }}
      aria-labelledby="simple-dialog-title">
      <div className="p-3 font-size-xl font-weight-bold">Editar Grupo</div>
      <TextField
        className="m-2 mb-4 w-80"
        id="pos"
        label="Nome do grupo"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Divider />
      <div className={classes.wrapper}>
        <div>
          <TextField
            className="m-2 mb-4"
            fullWidth
            id="pos"
            label="'Enter' para adicionar termos positivos"
            variant="outlined"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setPos([...pos, e.target.value]);
                e.target.value = '';
              }
            }}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {pos.map((pos, index) => (
              <Chip
                label={pos}
                classes={{ root: classes.chipPos }}
                key={`${index}-${pos.name}-${index}`}
                variant="outlined"
                onDelete={() => {}}
              />
            ))}
          </div>
        </div>
        <div>
          <TextField
            className="m-2 mb-4"
            fullWidth
            id="neg"
            label="'Enter' para adicionar termos negativos"
            variant="outlined"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setNeg([...neg, e.target.value]);
                e.target.value = '';
              }
            }}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {neg.map((neg, index) => (
              <Chip
                label={neg}
                classes={{ root: classes.chipNeg }}
                key={`${index}-${neg.name}-${index}`}
                variant="outlined"
                onDelete={() => {}}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          margin: 'auto auto 2rem auto',
          display: 'flex',
          justifyContent: 'space-around',
          width: '30%'
        }}>
        <Button
          onClick={onClose}
          variant="outlined"
          className="btn-secondary btn-pill mx-1">
          <span className="btn-wrapper--label">Cancelar</span>
        </Button>
        <Button
          onClick={handleAdd}
          className="btn-primary btn-pill mx-1">
          <span className="btn-wrapper--label">Salvar</span>
        </Button>
      </div>
    </Dialog>
  );
};

const DeleteDialog = ({ open, onClose, selectedGroup, words }) => (
  <Dialog
    open={open}
    onClose={onClose}
    classes={{ paper: 'shadow-lg rounded' }}>
    <div className="text-center p-5">
      <div className="avatar-icon-wrapper rounded-circle m-0">
        <div className="d-inline-flex justify-content-center p-0 rounded-circle btn-icon avatar-icon-wrapper bg-neutral-danger text-danger m-0 d-80">
          <FontAwesomeIcon
            icon={['fas', 'times']}
            className="d-flex align-self-center display-3"
          />
        </div>
      </div>
      <h4 className="font-weight-bold mt-4">
        Tem certeza que deseja deletar o grupo '{words[selectedGroup]?.name}'?
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
        <Button onClick={onClose} className="btn-danger btn-pill mx-1">
          <span className="btn-wrapper--label">Deletar</span>
        </Button>
      </div>
    </div>
  </Dialog>
);

const Grupos = ({ words, getAllWords, wordsError, createWord }) => {
  const [type, setType] = useState('Todos os termos');
  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(undefined);
  const classes = useStyles();

  useEffect(() => {
    getAllWords();
  }, [words]);

  const isLoading = Object.keys(words).length === 0;
  const hasError = wordsError === 'getAllWords';

  const handleChange = (event, handler) => handler(event.target.value);

  const handleDialogOpen = (groupId, handler) => {
    setSelectedGroup(groupId);
    handler(true);
  };

  const handleDialogClose = (handler) => {
    handler(false);
    setSelectedGroup(undefined);
  };

  const FallBack = () =>
    hasError ? (
      <div
        className="mx-auto my-5"
        style={{ display: `${isLoading ? '' : 'none'}` }}>
        <img
          src={notFound}
          className="w-50 mx-auto d-block mb-5 img-fluid"
          alt="..."
        />
        <h1 className="display-1 mb-3 px-4 font-weight-bold">
          Erro ao buscar os grupos
        </h1>
      </div>
    ) : (
      <div
        className="mx-auto my-5"
        style={{ display: `${isLoading ? '' : 'none'}` }}>
        <SyncLoader color={'var(--primary)'} loading={isLoading} />
      </div>
    );

  const WordsList = () =>
    Object.values(words).map((grupo, index) => (
      <div
        key={`${index}-${grupo.name}`}
        className={classes.groups}
        style={{
          border: '#7a7b97 solid 1px',
          borderRadius: '0.2rem',
          margin: '5px auto 15px auto'
        }}>
        <Header
          grupo={grupo}
          handleEdit={() => handleDialogOpen(grupo._id, setEditDialog)}
          handleDelete={() => handleDialogOpen(grupo._id, setDeleteDialog)}
        />
        <Divider />
        <div
          style={{
            display: 'flex',
            overflowY: 'auto',
            maxHeight: '15rem'
          }}
          className="tweeze-scrollbar">
          <Positivas grupo={grupo} />
          <Negativas grupo={grupo} />
        </div>
      </div>
    ));

  return (
    <>
      <PageTitle
        titleHeading="Meus Termos e Grupos"
        titleDescription="Administrar seus grupos e termos">
        <Select
          className="m-2"
          classes={{ select: classes.select }}
          style={{ width: '15rem' }}
          id="filter-by-select"
          labelId="filter-by"
          label="Filtrar por"
          value={type}
          onChange={(e) => handleChange(e, setType)}
          items={['Somente negativos', 'Somente positivos', 'Todos os termos']}
          size="small"
        />
        <SearchBar style={{ width: '15rem' }} label="Encontre o termo aqui" />
        <Button
          variant="contained"
          size="small"
          className="d-40 btn-success ml-3"
          onClick={() => setCreateDialog(true)}>
          <span className="btn-wrapper--icon">
            <FontAwesomeIcon icon={['fas', 'plus']} className="opacity-8" />
          </span>
        </Button>
      </PageTitle>

      <Card className="rounded w-100 bg-white p-3">
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <FallBack />
          <WordsList />
        </div>
      </Card>

      <CreateDialog
        open={createDialog}
        onClose={() => handleDialogClose(setCreateDialog)}
        onAdd={createWord}
      />
      <EditDialog
        open={editDialog}
        words={words}
        selectedGroup={selectedGroup}
        onClose={() => handleDialogClose(setEditDialog)}
      />
      <DeleteDialog
        open={deleteDialog}
        words={words}
        selectedGroup={selectedGroup}
        onClose={() => handleDialogClose(setDeleteDialog)}
      />
    </>
  );
};

const mapStateToProps = ({ words }) => ({
  words: words.words,
  wordsError: words.error
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getAllWords, createWord }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Grupos);
