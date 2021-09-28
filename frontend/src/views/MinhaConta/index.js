import React from 'react';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Settings } from '@material-ui/icons';

import PageTitle from '../../components/PageTitle';

import AccountImg from '../../assets/images/illustrations/analysis.svg';
import FinancialImg from '../../assets/images/illustrations/businessman.svg';
import SecurityImg from '../../assets/images/illustrations/authentication.svg';

const useStyles = makeStyles((theme) => ({
  card: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  title: {
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  }
}));

const SettingsCard = ({ image, title, link }) => {
  const classes = useStyles();

  return (
    <Card>
      <div className="p-4">
        <Grid container spacing={0}>
          <Grid item md={3} className={classes.card}>
            <img
              alt="..."
              className="img-fluid"
              style={{ minHeight: '100px', maxHeight: '150px' }}
              src={image}
            />
          </Grid>
          <Grid
            item
            md={9}
            className={`d-flex align-items-center ${classes.title}`}>
            <div>
              <div className="font-size-lg font-weight-bold mb-1 ml-3">
                {title}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="divider" />
      <NavLink
        to={link}
        className="px-4 py-3 text-first btn btn-white shadow-none d-flex justify-content-between align-items-center">
        <div>Acessar</div>
        <FontAwesomeIcon icon={['fas', 'chevron-right']} />
      </NavLink>
    </Card>
  );
};

const MinhaConta = () => (
  <>
    <PageTitle
      titleHeading="Minha Conta"
      titleDescription="Alterar informações pessoais, jurídicas, financeiras e de segurança"
      icon={<Settings />}
    />

    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <SettingsCard
          image={AccountImg}
          title="Informações da Conta"
          link="/minha-conta/informacoes"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <SettingsCard
          image={SecurityImg}
          title="Segurança"
          link="/minha-conta/seguranca"
        />
      </Grid>
    </Grid>

    <Grid container spacing={2} className="mt-3">
      <Grid item xs={12} md={6}>
        <SettingsCard
          image={FinancialImg}
          title="Dados Financeiros"
          link="/minha-conta/financeiro"
        />
      </Grid>
    </Grid>
  </>
);

export default MinhaConta;
