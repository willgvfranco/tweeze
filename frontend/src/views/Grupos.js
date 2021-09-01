import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DevicesOther } from '@material-ui/icons';
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
  Tooltip,
  Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import PageTitle from '../components/PageTitle';
import Loader from '../components/Loader';
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
    minWidth: '21rem',
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
    padding: '8px 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  wordHeader: {
    '& span': {
      textOverflow: 'ellipsis',
      overflowX: 'hidden',
      whiteSpace: 'nowrap',
      maxWidth: '15rem',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '35vw'
      },
      [theme.breakpoints.up('sm')]: {
        maxWidth: '20vw'
      },
      [theme.breakpoints.up('md')]: {
        maxWidth: '10vw'
      }
    }
  },
  title: {
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row'
    }
  },
  select: { padding: '11.5px 14px' },
  editDialog: {
    maxWidth: '50vw',
    [theme.breakpoints.down('lg')]: {
      maxWidth: '80vw'
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '90vw'
    },
    minHeight: '30rem'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    maxHeight: '45vh',
    overflowY: 'auto',
    marginBottom: '2rem',
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
        width: '95%',
        margin: '0.5rem 0'
      }
    }
  },
  wordItem: {
    '& > span': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: '175px'
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

const handleNegSplit = (string) => {
  let splittedStrings = string.split('NOT');
  const array = splittedStrings.map((str) =>
    str.trim().replace('("', '').replace('")', '')
  );

  return typeof string === 'string' && string !== '' ? array : [];
};

const handlePosSplit = (string) => {
  let splittedStrings = string.split('OR');
  const array = splittedStrings.map((str) =>
    str.trim().replace('("', '').replace('")', '')
  );

  return typeof string === 'string' && string !== '' ? array : [];
};

const Word = ({ array, classes, type }) => {
  const label = type === POS ? 'Positivas' : 'Negativas';
  const badge = type === POS ? 'badge-success' : 'badge-danger';

  const split = type === POS ? handlePosSplit(array) : handleNegSplit(array);

  return (
    <List className={classes.groupsList}>
      <div className={`badge ${badge} text-uppercase`}>{label}</div>
      {split?.map((el, index) => (
        <ListItem
          key={`${index}-${el}`}
          style={{ margin: '0', padding: '5px 0' }}>
          <ListItemText
            primary={el}
            className={classes.wordItem}
            style={{ textAlign: 'center', margin: '0' }}
          />
        </ListItem>
      ))}
    </List>
  );
};

const Header = ({ grupo, classes, handleEdit, handleDelete }) => (
  <div style={{ display: 'flex' }}>
    <CardHeader
      title={grupo.name}
      classes={{ root: classes.wordHeader }}
      style={{ marginRight: 'auto' }}
    />
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
      setPos(handlePosSplit(words[selectedGroup]?.pos));
      setNeg(handleNegSplit(words[selectedGroup]?.neg));
    }
  }, [selectedGroup]);

  useEffect(() => {
    return () => {
      setName('');
      setPos([]);
      setNeg([]);
    };
  }, [open]);

  const handlePosJoin = (array) => {
    if (array.length > 1) {
      return `("${array.join('") OR ("')}")`;
    }
    if (array.length === 1) {
      return `("${array}")`;
    }
    return '';
  };

  const handleNegJoin = (array) => {
    if (array.length > 1) {
      return `("${array.join('") NOT ("')}")`;
    }
    if (array.length === 1) {
      return `("${array}")`;
    }
    return '';
  };

  const handleAction = () => {
    if (!name.trim()) {
      setEmptyName(true);
      return;
    }
    editing
      ? onAction({
          _id: selectedGroup,
          name,
          pos: handlePosJoin(pos),
          neg: handleNegJoin(neg)
        })
      : onAction({
          name,
          pos: handlePosJoin(pos),
          neg: handleNegJoin(neg)
        });
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
      <div className={`tweeze-scrollbar ${classes.wrapper}`}>
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
          className="btn-secondary btn-pill mx-1"
          style={{ minWidth: 'fit-content' }}>
          <span className="btn-wrapper--label">Cancelar</span>
        </Button>
        <Button
          onClick={handleAction}
          className="btn-primary btn-pill mx-1"
          style={{ minWidth: 'fit-content' }}>
          <span className="btn-wrapper--label">Salvar</span>
        </Button>
      </div>
    </Dialog>
  );
};

const DeleteDialog = ({ open, onClose, selectedGroup, words, onAction }) => {
  const handleAction = () => {
    onAction(selectedGroup);
    onClose();
  };

  return (
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
          <Button onClick={handleAction} className="btn-danger btn-pill mx-1">
            <span className="btn-wrapper--label">Deletar</span>
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

const FallBack = ({ isLoading, hasError, emptyWords }) => {
  if (hasError) {
    return (
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
    );
  }
  return emptyWords ? (
    <div
      className="mx-auto my-5"
      style={{ display: `${isLoading ? '' : 'none'}` }}>
      <img
        src={notFound}
        className="w-50 mx-auto d-block mb-5 img-fluid"
        alt="..."
      />
      <h1 className="display-1 mb-3 px-4 font-weight-bold">
        Nenhum grupo de palavras cadastrado
      </h1>
    </div>
  ) : (
    <Loader isLoading={isLoading} />
  );
};

const Grupos = ({
  words,
  user,
  getAllWords,
  wordsError,
  firstFetch,
  createWord,
  editWord,
  deleteWord
}) => {
  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(undefined);
  const [openWarning, setOpenWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const classes = useStyles();

  const messages = {
    getAllWords: 'Ocorreu um erro ao buscar os grupos!',
    createWord: 'Ocorreu um erro ao criar o grupo!',
    editWord: 'Ocorreu um erro ao criar o grupo!',
    deleteWord: 'Ocorreu um erro ao deletar o grupo!'
  };

  useEffect(() => {
    if (!firstFetch) {
      getAllWords();
    }
  }, [words, user]);

  useEffect(() => {
    if (wordsError !== '') {
      setWarningMessage(
        messages[wordsError]
          ? messages[wordsError]
          : 'Ocorreu um erro desconhecido'
      );
    }
  }, [wordsError]);

  const isLoading = Object.keys(words).length === 0;
  const emptyWords = firstFetch && Object.keys(words).length === 0;

  const handleDialogOpen = (groupId, handler) => {
    setSelectedGroup(groupId);
    handler(true);
  };

  const handleDialogClose = (handler) => {
    handler(false);
    setSelectedGroup(undefined);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenWarning(false);
  };

  const WordsList = () =>
    Object.values(words)?.map((grupo, index) => (
      <div key={`${index}-${grupo.name}`} className={classes.groups}>
        <Header
          grupo={grupo}
          classes={classes}
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
        titleDescription="Administrar seus grupos e termos"
        titleClass={classes.title}
        icon={<DevicesOther />}>
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

      <Card
        className="rounded w-100 bg-white p-3"
        style={{ minWidth: '22rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <FallBack
            isLoading={isLoading}
            hasError={wordsError === 'getAllWords'}
            emptyWords={emptyWords}
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

      <Snackbar
        open={openWarning}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
        autoHideDuration={5000}>
        <Message severity="error" onClose={handleClose}>
          {warningMessage}
        </Message>
      </Snackbar>
    </>
  );
};

const mapStateToProps = ({ words, auth }) => ({
  words: words.words,
  wordsError: words.error,
  firstFetch: words.firstFetch,
  user: auth.id
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { getAllWords, createWord, editWord, deleteWord },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Grupos);
