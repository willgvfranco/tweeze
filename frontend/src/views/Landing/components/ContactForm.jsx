import React from 'react';
import { Card, Container, Button, TextField } from '@material-ui/core';

const Step1 = () => (
  <Container id="contato">
    <div className="p-4">
      <h5 className="font-size-xl mb-1 font-weight-bold">Dúvidas?</h5>
      <p className="text-black-50 mb-4">
        Para entender mais sobre nossos serviços:
      </p>
      <form id="form_contato" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="ajusteformulario" md={12} lg={12} xl={12}>
            <TextField fullWidth label="Nome" type="Nome" variant="outlined" />
          </label>
        </div>
        <div>
          <label className="ajusteformulario" md={12} lg={12} xl={12}>
            <TextField
              fullWidth
              label="Telefone"
              type="Telefone"
              variant="outlined"
            />
          </label>
        </div>
        <div>
          <label className="ajusteformulario" md={12} lg={12} xl={12}>
            <TextField
              fullWidth
              label="E-mail"
              type="E-mail"
              variant="outlined"
            />
          </label>
        </div>
        <div>
          <label className="ajusteformulario" md={12} lg={12} xl={12}>
            <TextField
              className="ajusteformulario"
              fullWidth
              label="Assunto"
              multiline
              rows={8}
              variant="outlined"
            />
          </label>
        </div>
        <Button
          variant="contained"
          style={{
            borderRadius: '10rem',
            fontSize: '1rem',
            width: '8rem'
          }}
          className="btn-primary my-3 px-4">
          Enviar
        </Button>
      </form>
    </div>
  </Container>
);

const ContactForm = (props) => (
  <Card style={props.style} className={props.className}>
    <div className="r">
      <div className=""></div>
    </div>
    <div>
      <div className="bg-secondary mb-3"></div>
      <div>
        <div>
          <Step1 />
        </div>
        <div className="mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary"></div>
      </div>
    </div>
  </Card>
);

export default ContactForm;
