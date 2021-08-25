// import React, { useState } from 'react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  // TextField,
  Card,
  CardHeader,
  // Grid,
  Table
  // Button
  // Radio
} from '@material-ui/core';
import { ArrowBack, CreditCard } from '@material-ui/icons';

import PageTitle from '../../components/PageTitle';
// import Select from '../../components/Select';

// import { creditCardValidation, CpfValidation } from 'utils/validations';

const mockPaymentData = [
  ['Março', 'dd/mm/aa', 'R$45,56', 'Pago'],
  ['Fevereiro', 'dd/mm/aa', 'R$586,57', 'Pago'],
  ['Janeiro', 'dd/mm/aa', 'R$657', 'Pago'],
  ['Dezembro', 'dd/mm/aa', 'R$12,47', 'Pago'],
  ['Novembro', 'dd/mm/aa', 'R$45,57', 'Pago']
];

// const mockCreditCardData = [
//   ['(Crédito) Mastercard', '12/2028', 'Nome Sobrenome'],
//   ['(Crédito) Mastercard', '12/2028', 'Nome Sobrenome'],
//   ['(Crédito) Mastercard', '12/2028', 'Nome Sobrenome'],
//   ['(Crédito) Mastercard', '12/2028', 'Nome Sobrenome']
// ];

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
        {mockPaymentData.map((el) => (
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

// const CreditCardsTable = () => {
//   const [selectedCard, setSelectedCard] = useState(0);

//   return (
//     <div
//       className="table-responsive-md tweeze-scrollbar"
//       style={{ maxHeight: '20rem', overflowY: 'auto' }}>
//       <Table className="table table-borderless text-nowrap mb-0">
//         <thead>
//           <tr>
//             <th className="text-uppercase bg-secondary">Cartão</th>
//             <th className="text-uppercase bg-secondary">Expira em</th>
//             <th className="text-uppercase bg-secondary">Nome no Cartão</th>
//             <th className="text-uppercase bg-secondary"></th>
//           </tr>
//         </thead>
//         <tbody>
//           {mockCreditCardData.map((el, index) => (
//             <tr key={index}>
//               <td>{el[0]}</td>
//               <td>{el[1]}</td>
//               <td>{el[2]}</td>
//               <td>
//                 <Radio
//                   checked={selectedCard === index}
//                   onChange={(e) => setSelectedCard(Number(e.target.value))}
//                   value={index}
//                   style={{ margin: '0 auto' }}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

const Informacoes = () => {
  // const [creditCardForm, setCreditCardForm] = useState({
  //   number: '',
  //   name: '',
  //   code: '',
  //   month: '',
  //   year: '',
  //   cpf: ''
  // });
  const history = useHistory();

  // const handleCardFormChange = (event) => {
  //   if (event.target.id === 'code') {
  //     if (event.target.value.length <= 3 && !isNaN(event.target.value)) {
  //       setCreditCardForm({
  //         ...creditCardForm,
  //         [event.target.id]: event.target.value
  //       });
  //     }
  //     return;
  //   }

  //   if (event.target.id === 'number') {
  //     const number = creditCardValidation(event);
  //     if (number || number === '') {
  //       setCreditCardForm({
  //         ...creditCardForm,
  //         [event.target.id]: number
  //       });
  //     }
  //     return;
  //   }

  //   if (event.target.id === 'cpf') {
  //     const cpf = CpfValidation(event);
  //     if (cpf || cpf === '') {
  //       setCreditCardForm({
  //         ...creditCardForm,
  //         [event.target.id]: cpf
  //       });
  //     }
  //     return;
  //   }
  //   setCreditCardForm({
  //     ...creditCardForm,
  //     [event.target.id || event.target.name]: event.target.value
  //   });
  // };

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
        }
      />

      {/* <Card
        style={{ displa: 'flex' }}
        className="rounded w-100 bg-white mt-3 p-3">
        <CardHeader title="Dados Financeiros" />
        <Grid container spacing={2}>
          <Grid item xl={6} lg={12}>
            <CardHeader subheader="Formas de pagamento" />
            <TextField
              className="m-2"
              id="number"
              value={creditCardForm.number}
              onChange={(e) => handleCardFormChange(e)}
              label="Número do cartão"
              variant="outlined"
              style={{ width: '45%' }}
            />
            <TextField
              className="m-2"
              id="name"
              value={creditCardForm.name}
              onChange={handleCardFormChange}
              label="Nome do Titular"
              variant="outlined"
              style={{ width: '45%' }}
            />
            <TextField
              className="m-2"
              id="code"
              value={creditCardForm.code}
              onChange={handleCardFormChange}
              label="Código de segurança"
              variant="outlined"
              style={{ width: '45%' }}
            />
            <Select
              className="m-2"
              style={{ width: '8rem' }}
              name="month"
              onChange={handleCardFormChange}
              labelId="month"
              label="Mês"
              value={creditCardForm.month}
              items={['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            />
            <Select
              className="m-2 ml-auto"
              style={{ width: '8rem' }}
              name="year"
              onChange={handleCardFormChange}
              labelId="year"
              label="Ano"
              value={creditCardForm.year}
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
            <TextField
              className="m-2"
              id="cpf"
              value={creditCardForm.cpf}
              onChange={handleCardFormChange}
              label="CPF"
              variant="outlined"
              style={{ width: '45%', marginRight: 'auto' }}
            />
            <Button
              variant="contained"
              className="btn-primary"
              style={{ margin: '5rem 0.5rem 0.5rem 0.5rem' }}>
              Adicionar forma de pagamento
            </Button>
          </Grid>

          <Grid item xl={6} lg={12}>
            <CardHeader subheader="Seus cartões cadastrados" />
            <CreditCardsTable />
          </Grid>
        </Grid>
      </Card> */}

      <Card
        style={{ displa: 'flex' }}
        className="rounded w-100 bg-white mt-3 p-3">
        <CardHeader title="Status de pagamento" />

        <PaymentTable />
      </Card>
    </>
  );
};

export default Informacoes;
