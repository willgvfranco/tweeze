import React from 'react';

import { Container, Card, TextField, Button } from '@material-ui/core';

const Step1 = () => {
  return (
    <>
      <Container id="contato">
        <form
          className="p-4"
          id="form_contato"
          onSubmit={(e) => e.preventDefault()}>
          <h5 className="font-size-xl mb-1 font-weight-bold">
            Dúvidas ainda sobre clipping?
          </h5>
          <p className="text-black-50 mb-4">
            Gostaria de entender mais sobre nossos serviços?
          </p>
          <form container spacing={4}>
            <div>
              <label className="ajusteformulario" item md={12} lg={12} xl={12}>
                <TextField
                  fullWidth
                  label="Nome"
                  type="Nome"
                  variant="outlined"
                />
              </label>
            </div>
            <div>
              <label className="ajusteformulario" item md={12} lg={12} xl={12}>
                <TextField
                  fullWidth
                  label="Telefone"
                  type="Telefone"
                  variant="outlined"
                />
              </label>
            </div>
            <div>
              <label className="ajusteformulario" item md={12} lg={12} xl={12}>
                <TextField
                  fullWidth
                  label="E-mail"
                  type="E-mail"
                  variant="outlined"
                />
              </label>
            </div>
            <div>
              <label className="ajusteformulario" item md={12} lg={12} xl={12}>
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
        </form>
      </Container>
    </>
  );
};

export default function LivePreviewExample() {
  return (
    <Card className="card-box">
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
}
