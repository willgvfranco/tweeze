import React, { useState } from 'react';
import {
  TextField,
  Card,
  CardHeader,
  Grid,
  Table,
  FormControlLabel,
  Checkbox,
  Button
} from '@material-ui/core';

import { PageTitle } from '../layout-components';
import Select from "../components/Select";

const PaymentTable = () => (
  <div className="table-responsive-md">
    <Table className="table table-borderless text-nowrap mb-0">
      <thead>
        <tr>
          <th className="text-uppercase bg-secondary">
            Application
          </th>
          <th className="text-uppercase bg-secondary">Date</th>
          <th className="text-uppercase bg-secondary">Payouts</th>
          <th className="text-uppercase bg-secondary">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>File Manager</td>
          <td>Aug 11, 2020</td>
          <td>$45,567</td>
          <td>
            <div className="badge badge-success">Paid</div>
          </td>
        </tr>
        <tr>
          <td>Calendar App</td>
          <td>Nov 12, 2020</td>
          <td>$586,567</td>
          <td>
            <div className="badge badge-success">Paid</div>
          </td>
        </tr>
        <tr>
          <td>Tasks Management</td>
          <td>Nov 13, 2020</td>
          <td>$657</td>
          <td>
            <div className="badge badge-warning">Pending</div>
          </td>
        </tr>
        <tr>
          <td>Tickets App</td>
          <td>Nov 22, 2020</td>
          <td>$12,478</td>
          <td>
            <div className="badge badge-danger">Overdue</div>
          </td>
        </tr>
        <tr>
          <td>Dashboard App</td>
          <td>Aug 15, 2020</td>
          <td>$45,57</td>
          <td>
            <div className="badge badge-success">Paid</div>
          </td>
        </tr>
      </tbody>
    </Table>
  </div>
);

const MinhaConta = () => {
  const [personalType, setPersonalType] = useState(false);
  const [companyType, setCompanyType] = useState(false);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

  const handleChange = (event, handler) => handler(event.target.value);

  return (
    <>
      <PageTitle
        titleHeading="Minha Conta"
        titleDescription="Alterar informações pessoais e/ou financeiras"
      >
      </PageTitle>

      <Card className="rounded w-100 bg-white p-3">
        <CardHeader title="Dados Pessoais" />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              className="m-2"
              id="cnpj-cpf"
              label="CNPJ/CPF"
              variant="outlined"
              style={{ width: "45%" }}
            />
            <TextField
              className="m-2"
              id="full-name"
              label="Nome Completo"
              variant="outlined"
              style={{ width: "45%" }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              className="m-2"
              id="password"
              label="Alterar senha"
              variant="outlined"
              style={{ width: "45%" }}
            />
            <TextField
              className="m-2"
              id="password-confirm"
              label="Confirmar nova senha"
              variant="outlined"
              style={{ width: "45%" }}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={personalType}
                  onChange={() => setPersonalType(!personalType)}
                  value="personalType"
                />
              }
              label="Pessoal"
              className="m-2"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={companyType}
                  onChange={() => setCompanyType(!companyType)}
                  value="companyType"
                />
              }
              label="Empresarial"
              className="m-2"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              className="m-2"
              id="adress"
              label="Endereço"
              variant="outlined"
              style={{ width: "45%" }}
            />
            <TextField
              className="m-2"
              id="complement"
              label="Complemento"
              variant="outlined"
              style={{ width: "45%" }}
            />
          </Grid>

          <Button variant="contained" className="btn-primary m-2 ml-auto">
            Salvar alterações
          </Button>
        </Grid>
      </Card>

      <Card style={{ displa: "flex" }} className="rounded w-100 bg-white mt-3 p-3">
        <CardHeader title="Dados Financeiros" />

        <Grid container spacing={2}>
          <Grid item xl={6} lg={12}>
            <CardHeader subheader="Formas de pagamento" />
            <TextField
              className="m-2"
              id="credit-card"
              label="Número do cartão"
              variant="outlined"
              style={{ width: "45%" }}
            />
            <TextField
              className="m-2"
              id="card-name"
              label="Nome do Titular"
              variant="outlined"
              style={{ width: "45%" }}
            />
            <TextField
              className="m-2"
              id="security-code"
              label="Código de segurança"
              variant="outlined"
              style={{ width: "45%" }}
            />
            <Select
              className="m-2"
              style={{ width: "8rem" }}
              id="month-select"
              labelId="month"
              label="Mês"
              value={month}
              onChange={(e) => handleChange(e, setMonth)}
              items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            />
            <Select
              className="m-2 ml-auto"
              style={{ width: "8rem" }}
              id="year-select"
              labelId="year"
              label="Ano"
              value={year}
              onChange={(e) => handleChange(e, setYear)}
              items={[2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032]}
            />
            <Button variant="contained" className="btn-primary m-2 mt-5">
              Adicionar forma de pagamento
            </Button>
          </Grid>

          <Grid item xl={6} lg={12}>
            <CardHeader subheader="Status de pagamento" />
            <PaymentTable />
          </Grid>
        </Grid>

      </Card>
    </>
  );
}

export default MinhaConta;
