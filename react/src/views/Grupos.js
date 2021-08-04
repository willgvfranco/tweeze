import React, { useState, useEffect } from 'react';
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
  TextField,
  Tooltip
  // Snackbar
} from '@material-ui/core';

import PageTitle from '../components/PageTitle';
import Select from '../components/Select';
import SearchBar from '../components/SearchBar';
import notFound from '../assets/images/illustrations/pack4/500.svg';

import {
  getAllWords,
  createWord,
  editWord,
  deleteWord
} from '../reducers/WordsDuck';

const POS = 'positive';
const NEG = 'negative';

const useStyles = makeStyles((theme) => ({
  groups: {
    border: '#7a7b97 solid 1px',
    borderRadius: '0.2rem',
    margin: '5px auto 15px auto',
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
  groupsListWrapper: {
    display: 'flex',
    overflowY: 'auto',
    maxHeight: '15rem'
  },
  groupsList: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
  },
  modalBtns: {
    margin: 'auto auto 2rem auto',
    display: 'flex',
    justifyContent: 'space-around',
    width: '30%'
  }
}));

const handleSplit = (string) => (string !== '' ? string.split(' ') : []);

const Word = ({ array, classes, type }) => {
  const label = type === POS ? 'Positivas' : 'Negativas';
  const badge = type === POS ? 'badge-success' : 'badge-danger';

  return (
    <List className={classes.groupsList}>
      <div className={`badge ${badge} text-uppercase`}>{label}</div>
      {handleSplit(array)?.map((el, index) => (
        <ListItem key={`${index}-${el}`} style={{ margin: '0' }}>
          <ListItemText
            primary={el}
            style={{ textAlign: 'center', margin: '0' }}
          />
        </ListItem>
      ))}
    </List>
  );
};

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

const ActionDialog = ({
  open,
  onClose,
  onAction,
  editing,
  selectedGroup,
  words,
  classes
}) => {
  const [pos, setPos] = useState([]);
  const [neg, setNeg] = useState([]);
  const [name, setName] = useState('');
  const [emptyName, setEmptyName] = useState(false);

  useEffect(() => {
    if (editing && selectedGroup) {
      setName(words[selectedGroup]?.name);
      setPos(handleSplit(words[selectedGroup]?.pos));
      setNeg(handleSplit(words[selectedGroup]?.neg));
    }
  }, [selectedGroup]);

  useEffect(() => {
    return () => {
      setName('');
      setPos([]);
      setNeg([]);
    };
  }, [open]);

  const handleAction = () => {
    if (!name.trim()) {
      setEmptyName(true);
      return;
    }
    editing
      ? onAction({
          _id: selectedGroup,
          name,
          pos: pos.join(' '),
          neg: neg.join(' ')
        })
      : onAction({ name, pos: pos.join(' '), neg: neg.join(' ') });
    onClose();
  };

  const ChipList = ({ type, array, setArray }) => {
    const handleDelete = (index) => {
      const newArray = [...array];
      newArray.splice(index, 1);
      setArray(newArray);
    };

    return array?.map((item, index) => (
      <Chip
        label={item}
        classes={{
          root: type === POS ? classes.chipPos : classes.chipNeg
        }}
        key={`${index}-${item.name}`}
        variant="outlined"
        onDelete={() => handleDelete(index)}
      />
    ));
  };

  const EnterInput = ({ type, action, prevState }) => {
    const labelType = type === POS ? 'positivos' : 'negativos';

    return (
      <TextField
        className="m-2 mb-4"
        fullWidth
        label={`'Enter' para adicionar termos ${labelType}`}
        variant="outlined"
        onKeyDown={(e) => {
          if (e.key === ' ') e.preventDefault();
          if (e.key === 'Enter') {
            action([...prevState, e.target.value]);
            e.target.value = '';
          }
        }}
      />
    );
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
        label="Nome do grupo"
        variant="outlined"
        value={name}
        onChange={(e) => {
          emptyName && setEmptyName(false);
          setName(e.target.value);
        }}
        error={emptyName}
        helperText={emptyName && 'Nome do grupo não pode ser vazio!'}
        required
      />
      <Divider />
      <div className={classes.wrapper}>
        <div>
          <EnterInput type={POS} action={setPos} prevState={pos} />
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <ChipList array={pos} type={POS} setArray={setPos} />
          </div>
        </div>
        <div>
          <EnterInput type={NEG} action={setNeg} prevState={neg} />
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <ChipList array={neg} type={NEG} setArray={setNeg} />
          </div>
        </div>
      </div>

      <div className={classes.modalBtns}>
        <Button
          onClick={onClose}
          variant="outlined"
          className="btn-secondary btn-pill mx-1">
          <span className="btn-wrapper--label">Cancelar</span>
        </Button>
        <Button onClick={handleAction} className="btn-primary btn-pill mx-1">
          <span className="btn-wrapper--label">Salvar</span>
        </Button>
      </div>
    </Dialog>
  );
};

const DeleteDialog = ({ open, onClose, selectedGroup, words, onAction }) => (
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
        <Button
          onClick={() => onAction(selectedGroup)}
          className="btn-danger btn-pill mx-1">
          <span className="btn-wrapper--label">Deletar</span>
        </Button>
      </div>
    </div>
  </Dialog>
);

const FallBack = ({ isLoading, hasError }) =>
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

const Grupos = ({
  words,
  getAllWords,
  wordsError,
  createWord,
  editWord,
  deleteWord
}) => {
  const [type, setType] = useState('Todos os termos');
  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(undefined);
  const classes = useStyles();

  useEffect(() => {
    Object.keys(words).length === 0 && getAllWords();
  }, [words]);

  const isLoading = Object.keys(words).length === 0;

  const handleChange = (event, handler) => handler(event.target.value);

  const handleDialogOpen = (groupId, handler) => {
    setSelectedGroup(groupId);
    handler(true);
  };

  const handleDialogClose = (handler) => {
    handler(false);
    setSelectedGroup(undefined);
  };

  const WordsList = () =>
    Object.values(words)?.map((grupo, index) => (
      <div key={`${index}-${grupo.name}`} className={classes.groups}>
        <Header
          grupo={grupo}
          handleEdit={() => handleDialogOpen(grupo._id, setEditDialog)}
          handleDelete={() => handleDialogOpen(grupo._id, setDeleteDialog)}
        />
        <Divider />
        <div className={`tweeze-scrollbar ${classes.groupsListWrapper}`}>
          <Word type={POS} array={grupo.pos} classes={classes} />
          <Word type={NEG} array={grupo.neg} classes={classes} />
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
        <Tooltip
          title="Criar novo grupo"
          arrow
          placement="bottom-end"
          classes={{ tooltip: 'p-3' }}>
          <Button
            variant="contained"
            size="small"
            className="d-40 btn-success ml-3"
            onClick={() => setCreateDialog(true)}>
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon icon={['fas', 'plus']} className="opacity-8" />
            </span>
          </Button>
        </Tooltip>
      </PageTitle>

      <Card className="rounded w-100 bg-white p-3">
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <FallBack
            isLoading={isLoading}
            hasError={wordsError === 'getAllWords'}
          />
          <WordsList />
        </div>
      </Card>

      <ActionDialog
        open={createDialog}
        onClose={() => handleDialogClose(setCreateDialog)}
        onAction={createWord}
        classes={classes}
      />
      <ActionDialog
        open={editDialog}
        editing
        words={words}
        selectedGroup={selectedGroup}
        onClose={() => handleDialogClose(setEditDialog)}
        onAction={editWord}
        classes={classes}
      />
      <DeleteDialog
        open={deleteDialog}
        words={words}
        selectedGroup={selectedGroup}
        onClose={() => handleDialogClose(setDeleteDialog)}
        onAction={deleteWord}
      />
      {/* <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        // key={`${vertical},${horizontal}`}
        open={open}
        classes={{ root: toastrStyle }}
        onClose={handleClose}
        message={message}
      /> */}
    </>
  );
};

const mapStateToProps = ({ words }) => ({
  words: words.words,
  wordsError: words.error
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { getAllWords, createWord, editWord, deleteWord },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Grupos);
