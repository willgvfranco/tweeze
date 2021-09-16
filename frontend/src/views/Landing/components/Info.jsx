import React from 'react';
import { NavLink } from 'react-router-dom';

import { Grid, Container, Button } from '@material-ui/core';

import hero1 from '../../../assets/images/hero-bg/hero-9.jpg';

const Info = () => {
  return (
    <>
      <div className="hero-wrapper bg-deep-blue bg-composed-wrapper">
        <div className="flex-grow-1 w-100 d-flex align-items-center">
          <div
            className="bg-composed-wrapper--image opacity-5"
            style={{ backgroundImage: 'url(' + hero1 + ')' }}
          />
          <div className="bg-composed-wrapper--bg bg-second opacity-7" />
          <div className="bg-composed-wrapper--content align-self-center p-4 p-xl-5">
            <Container className="pb-5 py-lg-5 text-center">
              <div className="mb-4">
                <h4
                  id="servicos"
                  className="font-weight-bold text-white display-3">
                  Entenda como podemos te ajudar
                </h4>
                <Grid item md={11} lg={10} className="mx-auto">
                  <p className="text-white opacity-6 mt-3 mb-5 font-size-xxl">
                    Com a Tweeze, você pode pinçar as notícias mais importantes
                    para o seu negócio, descobrir o que dizem da sua marca e
                    ainda gerar relatórios e enviá-los de forma fácil e
                    intuitiva.
                  </p>
                </Grid>
              </div>

              <div className="videoWrapper">
                <iframe
                  title="Tweeze video"
                  src="https://youtube.com/embed/WZRxRf0DPfY"
                  frameBorder="0"
                  allowFullScreen></iframe>
              </div>
            </Container>
          </div>
        </div>
      </div>

      <div className="py-4 feature-box">
        <Container
          className="py-5"
          style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="mb-4 text-center">
            <h4 className="font-weight-bold text-second display-3">
              Tenha a informação que você precisar
            </h4>
            <Grid item md={11} lg={10} className="mx-auto">
              <p className="text-second opacity-6 mt-3 mb-5 font-size-xxl">
                Sua empresa terá acesso a todas as informações divulgadas por
                veículos de imprensa nacionais e internacionais
              </p>
            </Grid>
          </div>
          <Grid container spacing={4} className="">
            <Grid item className="">
              <Grid container spacing={4} className="text-center">
                <Grid className="" item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <div className="feature-box">
                    <h3 className="font-size-xl font-weight-bold my-3 text-primary">
                      Captação
                    </h3>
                    <p className="text-black-50 mb-3">
                      Captamos dezenas de milhares de notícias diariamente.
                      Nossa plataforma é capaz de coletar notícias nos idiomas
                      portugues, ingles e francês. Além disso, integração com o
                      Twiiter, onde as notícias sempre chegam primeiro.
                    </p>
                  </div>
                </Grid>

                <Grid
                  className="text-center"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}>
                  <div className="feature-box">
                    <h3 className="font-size-xl font-weight-bold my-3 text-primary">
                      Análise
                    </h3>
                    <p className="text-black-50 mb-3">
                      O monitoramento das informações é 24 horas por dia, 7 dias
                      por semana e 365 dias do ano. O monitoramento se extende
                      de veículos de imprensa à mídias sociais. Dentre em breve
                      mais novidades!
                    </p>
                  </div>
                </Grid>

                <Grid
                  className="text-center"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}>
                  <div className="feature-box">
                    <h3 className="font-size-xl font-weight-bold my-3 text-primary">
                      Monitoramento
                    </h3>
                    <p className="text-black-50 mb-3">
                      O monitoramento das informações é 24 horas por dia, 7 dias
                      por semana e 365 dias do ano. O monitoramento se extende
                      de veículos de imprensa à mídias sociais. Dentre em breve
                      mais novidades!
                    </p>
                  </div>
                </Grid>

                <Grid
                  className="text-center"
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}>
                  <div className="feature-box">
                    <h3 className="font-size-xl font-weight-bold my-3 text-primary">
                      Distribuição
                    </h3>
                    <p className="text-black-50 mb-3">
                      Nossos clientes são nosssa prioridade! Somos uma empresa
                      que presa por clientes satisfeitos e tecnologia de ponta.
                      Construímos a mais rápida plataforma e distribuimos dados
                      em tempo real.
                    </p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <NavLink to="/cadastro" className="mx-auto my-3">
            <Button
              style={{ fontSize: '1.4rem', borderRadius: '8px' }}
              className="btn-warning py-2 px-4">
              Teste agora! É grátis!!
            </Button>
          </NavLink>
        </Container>
      </div>
    </>
  );
};

export default Info;
