import React from 'react';
import { useHistory } from 'react-router-dom';

import { TextField, Card, CardHeader, Grid, Button } from '@material-ui/core';
import { ArrowBack, AccountCircle } from '@material-ui/icons';

import PageTitle from '../../components/PageTitle';

const Informacoes = () => {
  const history = useHistory();

  // FALTA
  // Telefone
  // Data de nascimento

  return (
    <>
      <PageTitle
        titleHeading="Informações da Conta"
        titleDescription="Alterar informações pessoais e/ou financeiras"
        icon={<AccountCircle />}
        action={
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              history.goBack();
            }}>
            <ArrowBack style={{ marginRight: '0.5rem' }} />
            Voltar
          </a>
        }
      />

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card
            className="rounded w-100 bg-white p-3"
            style={{ display: 'flex', flexDirection: 'column' }}>
            <CardHeader title="Pessoa Física" />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  className="m-2"
                  id="cpf"
                  label="CPF"
                  variant="outlined"
                  style={{ width: '45%' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className="m-2"
                  id="first-name"
                  label="Primeiro Nome"
                  variant="outlined"
                  style={{ width: '45%' }}
                />
                <TextField
                  className="m-2"
                  id="last-name"
                  label="Sobrenome"
                  variant="outlined"
                  style={{ width: '45%' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className="m-2"
                  id="adress"
                  label="Endereço"
                  variant="outlined"
                  style={{ width: '92%' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className="m-2"
                  id="complement"
                  label="Complemento"
                  variant="outlined"
                  style={{ width: '45%' }}
                />
                <TextField
                  className="m-2"
                  id="cep"
                  label="CEP"
                  variant="outlined"
                  style={{ width: '45%' }}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              className="btn-primary m-2 ml-auto mt-auto">
              Salvar alterações
            </Button>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card
            className="rounded w-100 bg-white p-3 h-100"
            style={{ display: 'flex', flexDirection: 'column' }}>
            <CardHeader title="Pessoa Jurídica" />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  className="m-2"
                  id="enterprise-name"
                  label="Nome Empresarial"
                  variant="outlined"
                  style={{ width: '92%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className="m-2"
                  id="cnpj"
                  label="CNPJ"
                  variant="outlined"
                  style={{ width: '92%' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className="m-2"
                  id="stadual"
                  label="Inscrição Estadual"
                  variant="outlined"
                  style={{ width: '92%' }}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              className="btn-primary m-2 ml-auto mt-auto">
              Salvar alterações
            </Button>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Informacoes;
