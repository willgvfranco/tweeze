import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  TextField,
  Card,
  CardHeader,
  Grid,
  Table,
  Button
} from '@material-ui/core';
import { ArrowBack, CreditCard } from '@material-ui/icons';

import PageTitle from '../../components/PageTitle';
import Select from '../../components/Select';

const mockData = [
  ['Março', 'dd/mm/aa', 'R$45,56', 'Pago'],
  ['Fevereiro', 'dd/mm/aa', 'R$586,57', 'Pago'],
  ['Janeiro', 'dd/mm/aa', 'R$657', 'Pago'],
  ['Dezembro', 'dd/mm/aa', 'R$12,47', 'Pago'],
  ['Novembro', 'dd/mm/aa', 'R$45,57', 'Pago']
];

const PaymentTable = () => (
  <div className="table-responsive-md">
    <Table className="table table-borderless text-nowrap mb-0">
      <thead>
        <tr>
          <th className="text-uppercase bg-secondary">Mês de referência</th>
          <th className="text-uppercase bg-secondary">Vencimento em</th>
          <th className="text-uppercase bg-secondary">Valor</th>
          <th className="text-uppercase bg-secondary">Status</th>
        </tr>
      </thead>
      <tbody>
        {mockData.map((el) => (
          <tr key={el[0]}>
            <td>{el[0]}</td>
            <td>{el[1]}</td>
            <td>{el[2]}</td>
            <td>
              <div
                className={`badge badge-${
                  el[3] === 'Pendente' ? 'warning' : 'success'
                } text-uppercase`}>
                {el[3]}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

const Informacoes = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const history = useHistory();

  const handleChange = (event, handler) => handler(event.target.value);

  return (
    <>
      <PageTitle
        titleHeading="Dados Financeiros"
        titleDescription="Cadastro de novas formas de pagamento e status de pagamentos"
        icon={<CreditCard />}
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
        }></PageTitle>

      <Card
        style={{ displa: 'flex' }}
        className="rounded w-100 bg-white mt-3 p-3">
        <CardHeader title="Dados Financeiros" />

        <Grid container spacing={2}>
          <Grid item xl={6} lg={12}>
            <CardHeader subheader="Formas de pagamento" />
            <TextField
              className="m-2"
              id="credit-card"
              label="Número do cartão"
              variant="outlined"
              style={{ width: '45%' }}
            />
            <TextField
              className="m-2"
              id="card-name"
              label="Nome do Titular"
              variant="outlined"
              style={{ width: '45%' }}
            />
            <TextField
              className="m-2"
              id="security-code"
              label="Código de segurança"
              variant="outlined"
              style={{ width: '45%' }}
            />
            <Select
              className="m-2"
              style={{ width: '8rem' }}
              id="month-select"
              labelId="month"
              label="Mês"
              value={month}
              onChange={(e) => handleChange(e, setMonth)}
              items={['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            />
            <Select
              className="m-2 ml-auto"
              style={{ width: '8rem' }}
              id="year-select"
              labelId="year"
              label="Ano"
              value={year}
              onChange={(e) => handleChange(e, setYear)}
              items={[
                '',
                2022,
                2023,
                2024,
                2025,
                2026,
                2027,
                2028,
                2029,
                2030,
                2031,
                2032
              ]}
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
};

export default Informacoes;
