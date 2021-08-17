import React from 'react';
import { NavLink } from 'react-router-dom';

import { Card, Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Settings } from '@material-ui/icons';

import PageTitle from '../../components/PageTitle';

import illustration1 from '../../assets/images/illustrations/pack1/analysis.svg';
import illustration2 from '../../assets/images/illustrations/pack1/businessman.svg';
import illustration3 from '../../assets/images/illustrations/pack1/authentication.svg';

const MinhaConta = () => (
  <>
    <PageTitle
      titleHeading="Minha Conta"
      titleDescription="Alterar informações pessoais, jurídicas, financeiras e de segurança"
      icon={<Settings />}
    />

    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Card>
          <div className="p-4">
            <Grid container spacing={0}>
              <Grid item md={3}>
                <img
                  alt="..."
                  className="img-fluid"
                  style={{ minHeight: '100px', maxHeight: '150px' }}
                  src={illustration1}
                />
              </Grid>
              <Grid item md={9} className="d-flex align-items-center">
                <div>
                  <div className="font-size-lg font-weight-bold mb-1">
                    Informações da Conta
                  </div>
                  <p className="opacity-7 font-size-md mb-0">
                    Acccess this page in order to manage and customize all
                    aspects of your profile data and accounts.
                  </p>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className="divider" />
          <NavLink
            to="/minha-conta/informacoes"
            className="px-4 py-3 text-first btn btn-white shadow-none d-flex justify-content-between align-items-center">
            <div>Acessar</div>
            <FontAwesomeIcon icon={['fas', 'chevron-right']} />
          </NavLink>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <div className="p-4">
            <Grid container spacing={0}>
              <Grid item md={3}>
                <img
                  alt="..."
                  className="img-fluid"
                  style={{ minHeight: '100px', maxHeight: '150px' }}
                  src={illustration3}
                />
              </Grid>
              <Grid item md={9} className="d-flex align-items-center">
                <div>
                  <div className="font-size-lg font-weight-bold mb-1">
                    Segurança
                  </div>
                  <p className="opacity-7 font-size-md mb-0">
                    Acccess this page in order to manage and customize all
                    aspects of your profile data and accounts.
                  </p>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className="divider" />
          <NavLink
            to="/minha-conta/seguranca"
            className="px-4 py-3 text-first btn btn-white shadow-none d-flex justify-content-between align-items-center">
            <div>Acessar</div>
            <FontAwesomeIcon icon={['fas', 'chevron-right']} />
          </NavLink>
        </Card>
      </Grid>
    </Grid>

    <Grid container spacing={2} className="mt-3">
      <Grid item xs={6}>
        <Card>
          <div className="p-4">
            <Grid container spacing={0}>
              <Grid item md={3}>
                <img
                  alt="..."
                  className="img-fluid"
                  style={{ minHeight: '100px', maxHeight: '150px' }}
                  src={illustration2}
                />
              </Grid>
              <Grid item md={9} className="d-flex align-items-center">
                <div>
                  <div className="font-size-lg font-weight-bold mb-1">
                    Dados Financeiros
                  </div>
                  <p className="opacity-7 font-size-md mb-0">
                    Control everything related to your profile and trading
                    accounts as shown in this page.
                  </p>
                </div>
              </Grid>
            </Grid>
          </div>
          <div className="divider" />
          <NavLink
            to="/minha-conta/financeiro"
            className="px-4 py-3 text-first btn btn-white shadow-none d-flex justify-content-between align-items-center">
            <div>Acessar</div>
            <FontAwesomeIcon icon={['fas', 'chevron-right']} />
          </NavLink>
        </Card>
      </Grid>
    </Grid>
  </>
);

export default MinhaConta;
