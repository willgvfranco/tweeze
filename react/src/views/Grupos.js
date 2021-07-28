import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  Button,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Dialog
} from '@material-ui/core';

import PageTitle from '../components/PageTitle';
import Select from '../components/Select';
import SearchBar from '../components/SearchBar';

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
  select: { padding: '11.5px 14px' }
}));

const GRUPOS = [
  {
    name: 'Grupo 01',
    pos: ['termo 1', ' termo grande texto largo quebra de linha', 'termo 3'],
    neg: ['termo grande texto largo', ' termo 2', 'termo 3']
  },
  {
    name: 'Grupo 02',
    pos: ['termo 1', 'termo 2', 'termo 3'],
    neg: ['termo 1', 'termo 2', 'termo 3']
  },
  {
    name: 'Grupo 03',
    pos: ['termo 1', 'termo 2', 'termo 3'],
    neg: ['termo 1', 'termo 2', 'termo 3']
  },
  {
    name: 'Grupo 04',
    pos: [
      'termo 1',
      'termo 2',
      'termo 3',
      'termo 3',
      'termo 3',
      'termo 3',
      'termo 3'
    ],
    neg: ['termo 1', 'termo 2', 'termo 3']
  },
  {
    name: 'Grupo 05',
    pos: ['termo 1', 'termo 2', 'termo 3'],
    neg: ['termo 1', 'termo 2', 'termo 3']
  },
  {
    name: 'Grupo 06',
    pos: ['termo 1', 'termo 2', 'termo 3'],
    neg: ['termo 1', 'termo 2', 'termo 3']
  },
  {
    name: 'Grupo 07',
    pos: ['termo 1', 'termo 2', 'termo 3'],
    neg: [
      'termo 1',
      'termo 2',
      'termo 3',
      'termo 3',
      'termo 3',
      'termo 3',
      'termo 3'
    ]
  }
];

const emails = ['example1@example.com', 'example2@example.com'];

const Positivas = ({ grupo }) => (
  <List
    style={{
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
    <div className={`badge badge-success text-uppercase`}>Positivas</div>
    {grupo.pos.map((el, index) => (
      <ListItem key={`${index}-${el}`}>
        <ListItemText primary={el} style={{ textAlign: 'center' }} />
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
    {grupo.neg.map((el, index) => (
      <ListItem key={`${index}-${el}`}>
        <ListItemText primary={el} style={{ textAlign: 'center' }} />
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

const EditDialog = (props) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      classes={{ paper: 'modal-content rounded-lg w-100 p-3' }}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <div className="p-3 font-size-xl font-weight-bold">Editar Grupo</div>
      <CardHeader title={GRUPOS[0].name} />
      <Divider />
      <List>
        {GRUPOS[0].pos.map((pos, index) => (
          <ListItem button key={`${index}-${pos.name}-${index}`}>
            <ListItemText primary={pos} />
          </ListItem>
        ))}
        <Divider />
        {GRUPOS[0].neg.map((neg, index) => (
          <ListItem button key={`${index}-${neg.name}-${index}`}>
            <ListItemText primary={neg} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

const DeleteDialog = ({ open, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
    classes={{ paper: 'shadow-lg rounded' }}>
    <div className="text-center p-5">
      <div className="avatar-icon-wrapper rounded-circle m-0">
        <div className="d-inline-flex justify-content-center p-0 rounded-circle btn-icon avatar-icon-wrapper bg-neutral-danger text-danger m-0 d-130">
          <FontAwesomeIcon
            icon={['fas', 'times']}
            className="d-flex align-self-center display-3"
          />
        </div>
      </div>
      <h4 className="font-weight-bold mt-4">
        Tem certeza que deseja deletar esse grupo?
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

const Grupos = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('Todos os termos');
  const [modal2, setModal2] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const classes = useStyles();

  const handleChange = (event, handler) => handler(event.target.value);

  const toggle2 = () => setModal2(!modal2);

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

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
      </PageTitle>

      <Card className="rounded w-100 bg-white p-3">
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {GRUPOS.map((grupo, index) => (
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
                handleEdit={handleClickOpen}
                handleDelete={toggle2}
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
          ))}
        </div>
      </Card>

      <EditDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />

      <DeleteDialog open={modal2} onClose={toggle2} />
    </>
  );
};

export default Grupos;
