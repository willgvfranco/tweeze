import React from 'react';

import { Grid, Card, CardContent, Button, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import svgImage1 from '../assets/images/illustrations/pack4/business_plan.svg';
import svgImage2 from '../assets/images/illustrations/pack4/businesswoman.svg';
import svgImage3 from '../assets/images/illustrations/pack4/powerful.svg';

const useStyles = makeStyles(() => ({
  paperRoot: {
    width: '80vw',
    maxWidth: 'none'
  }
}));

const Plan = ({ title, description, img, value, features }) => (
  <Grid item xl={4}>
    <div className="divider-v divider-v-lg" />
    <div className="py-3">
      <div className="feature-box text-center mt-2 mb-5">
        <img src={img} className="w-50 mx-auto d-block img-fluid" alt="..." />
        <h3 className="font-size-xxl font-weight-bold mt-4">{title}</h3>
        <p className="text-black-50 mb-4">{description}</p>
        <Button
          href="#/"
          onClick={(e) => e.preventDefault()}
          className="btn-first"
          title="Selecionar">
          <span>{value}</span>
        </Button>
      </div>
      <div className="divider my-4" />
      <ul className="list-unstyled text-left font-weight-bold font-size-sm">
        {features.map((el, index) => (
          <li className="px-4 py-2" key={index}>
            <div className="badge badge-success badge-circle-inner mr-2">
              Success
            </div>
            {el}
          </li>
        ))}
      </ul>
    </div>
  </Grid>
);

const PaymentModal = ({ open, onClose }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{ paper: classes.paperRoot }}>
      <Card className="modal-content">
        <div className="card-header bg-light d-flex justify-content-center">
          <div id="planos" className="text-center my-4">
            <h1 className="display-4 text-black mb-2 font-weight-bold">
              Planos e preços
            </h1>
            <p className="font-size-lg mb-1 text-black-50">
              <strong>Selecione o seu plano</strong>
            </p>
          </div>
        </div>
        <CardContent className="p-3">
          <div className="container-fluid">
            <Grid container spacing={6}>
              <Plan
                title="Básico"
                description="Cientistas, curiosos e profissionais interessados no mercado financeiro"
                img={svgImage1}
                value="R$ 49/mês"
                features={[
                  'Trial de 30 dias',
                  'Acesso à 2 grupos de palavras chaves ILIMITADAS',
                  'Support',
                  'Sem Ads'
                ]}
              />
              <Plan
                title="Padrão"
                description="Produto destinado a pequenas e médias empresas"
                img={svgImage2}
                value="R$ 590/mês"
                features={[
                  'Trial de 30 dias',
                  'Acesso à 5 grupos de palavras chaves ILIMITADAS',
                  'Relatório de Clipping com business intelligence',
                  'Sem Ads',
                  'Suport Premium',
                  'Envio de e-mail automatizado'
                ]}
              />
              <Plan
                title="Ilimitado"
                description="Destinado a assessoria de imprensa, agências e marcas"
                img={svgImage3}
                value="Sob Consulta"
                features={[
                  'Trial de 30 dias',
                  'Mídias sociais',
                  'Grupos ilimitados de palavras chaves',
                  'Automatização por e-mail',
                  'Inteligência artificial - alerta de gerênciamento de crise',
                  'API de integração do nosso sistema'
                ]}
              />
            </Grid>
          </div>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default PaymentModal;
