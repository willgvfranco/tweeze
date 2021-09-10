import React from 'react';
import { useHistory } from 'react-router-dom';

import { Card, CardHeader, CardActions, Button } from '@material-ui/core';
import { ArrowBack, CreditCard } from '@material-ui/icons';

import PageTitle from '../../components/PageTitle';

// Remover tabela de pagamentos e adicionar somente o status da assinatura e botão de cancelar

// const mockPaymentData = [
//   ['Março', 'dd/mm/aa', 'R$45,56', 'Pago'],
//   ['Fevereiro', 'dd/mm/aa', 'R$586,57', 'Pago'],
//   ['Janeiro', 'dd/mm/aa', 'R$657', 'Pago'],
//   ['Dezembro', 'dd/mm/aa', 'R$12,47', 'Pago'],
//   ['Novembro', 'dd/mm/aa', 'R$45,57', 'Pago']
// ];

// const PaymentTable = () => (
//   <>
//     <div className="table-responsive-md">
//       <Table className="table table-borderless text-nowrap mb-0">
//         <thead>
//           <tr>
//             <th className="text-uppercase bg-secondary">Mês de referência</th>
//             <th className="text-uppercase bg-secondary">Vencimento em</th>
//             <th className="text-uppercase bg-secondary">Valor</th>
//             <th className="text-uppercase bg-secondary">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {mockPaymentData.map((el) => (
//             <tr key={el[0]}>
//               <td>{el[0]}</td>
//               <td>{el[1]}</td>
//               <td>{el[2]}</td>
//               <td>
//                 <div
//                   className={`badge badge-${
//                     el[3] === 'Pendente' ? 'warning' : 'success'
//                   } text-uppercase`}>
//                   {el[3]}
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>

//     <Button
//       variant="contained"
//       style={{
//         backgroundColor: 'red',
//         color: 'white',
//         fontSize: '1rem',
//         margin: '0.6rem',
//         marginLeft: 'auto',
//         marginTop: '1rem'
//       }}>
//       Cancelar Plano
//     </Button>
//   </>
// );

const Informacoes = () => {
  const history = useHistory();

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

      <Card
        style={{ display: 'flex', flexDirection: 'column' }}
        className="rounded w-100 bg-white mt-3 p-3">
        <CardHeader title="Status de pagamento" />

        <CardActions>
          <Button
            variant="contained"
            style={{
              backgroundColor: 'red',
              color: 'white',
              fontSize: '1rem',
              margin: '0.6rem',
              marginLeft: 'auto',
              marginTop: '1rem'
            }}>
            Cancelar Plano
          </Button>
        </CardActions>
        {/* <PaymentTable /> */}
      </Card>
    </>
  );
};

export default Informacoes;
