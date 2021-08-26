import React from 'react';

import CheckIcon from '@material-ui/icons/Check';
import { Card, Grid, Container } from '@material-ui/core';

const Features = () => {
  return (
    <>
      <div className="bg-light z-over" style={{ marginTop: '-30px' }}>
        <Container className="pb-5 text-center">
          <div>
            {/*<div className="badge badge-success mb-4 h-auto py-2 px-4 font-size-xs badge-pill font-weight-normal">
              Overview
            </div>*/}
            <h4 className="font-weight-bold text-second display-3">
              Descubra o que falam da sua marca:
            </h4>
            <h2>é fácil, simples e instantâneo.</h2>
            <Grid item md={8} lg={6} className="mx-auto">
              <p className="text-second opacity-6 mt-3 mb-5 font-size-xxl">
                Você terá acesso gratuitamente a milhares de notícias sobre o
                seu tema de interesse.
              </p>
              <button className=" buttonregister badge badge-primary mb-4 h-auto py-2 px-4 font-size-xs badge-pill font-weight-normal">
                Registre-se!
              </button>
            </Grid>
          </div>

          <div className="mb-spacing-6">
            <Grid container spacing={6}>
              <Grid item md={6} xl={4}>
                <Card className="card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 d-block">
                  <div className="d-130 object-skew hover-scale-sm icon-blob btn-icon text-success mx-auto">
                    <svg
                      className="blob-wrapper opacity-1"
                      viewBox="0 0 600 600"
                      xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(300,300)">
                        <path
                          d="M169,-144C206.7,-87.5,216.5,-18,196.9,35.7C177.3,89.4,128.3,127.1,75.2,150.7C22,174.2,-35.4,183.5,-79.7,163.1C-124,142.7,-155.1,92.6,-164.1,40.9C-173.1,-10.7,-160.1,-64,-129,-118.9C-98,-173.8,-49,-230.4,8.3,-237.1C65.7,-243.7,131.3,-200.4,169,-144Z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                    <div className="blob-icon-wrapper">
                      <CheckIcon />
                    </div>
                  </div>
                  <h5 className="font-weight-bold font-size-lg text-second mb-2">
                    Clipping jornalístico
                  </h5>
                  <p className="mb-4 text-black-50">
                    Nossa plataforma em questões de poucos segundos realiza o
                    serviço de clipping jornalístico
                  </p>
                </Card>
              </Grid>
              <Grid item md={6} xl={4}>
                <Card className="card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 d-block">
                  <div className="d-130 object-skew hover-scale-sm icon-blob btn-icon text-success mx-auto">
                    <svg
                      className="blob-wrapper opacity-1"
                      viewBox="0 0 600 600"
                      xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(300,300)">
                        <path
                          d="M169,-144C206.7,-87.5,216.5,-18,196.9,35.7C177.3,89.4,128.3,127.1,75.2,150.7C22,174.2,-35.4,183.5,-79.7,163.1C-124,142.7,-155.1,92.6,-164.1,40.9C-173.1,-10.7,-160.1,-64,-129,-118.9C-98,-173.8,-49,-230.4,8.3,-237.1C65.7,-243.7,131.3,-200.4,169,-144Z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                    <div className="blob-icon-wrapper">
                      <CheckIcon />
                    </div>
                  </div>
                  <h5 className="font-weight-bold font-size-lg text-second mb-2">
                    E-mail automatizado
                  </h5>
                  <p className="mb-4 text-black-50">
                    Configure a frequência desejada para receber um relatório de
                    clipping personalizado
                  </p>
                </Card>
              </Grid>
              <Grid item md={6} xl={4}>
                <Card className="card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 d-block">
                  <div className="d-130 object-skew hover-scale-sm icon-blob btn-icon text-success mx-auto">
                    <svg
                      className="blob-wrapper opacity-1"
                      viewBox="0 0 600 600"
                      xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(300,300)">
                        <path
                          d="M169,-144C206.7,-87.5,216.5,-18,196.9,35.7C177.3,89.4,128.3,127.1,75.2,150.7C22,174.2,-35.4,183.5,-79.7,163.1C-124,142.7,-155.1,92.6,-164.1,40.9C-173.1,-10.7,-160.1,-64,-129,-118.9C-98,-173.8,-49,-230.4,8.3,-237.1C65.7,-243.7,131.3,-200.4,169,-144Z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                    <div className="blob-icon-wrapper">
                      <CheckIcon />
                    </div>
                  </div>
                  <h5 className="font-weight-bold font-size-lg text-second mb-2">
                    Notícias
                  </h5>
                  <p className="mb-4 text-black-50">
                    Analisamos milhares de noticias diariamente. Tecnologia para
                    manter você bem informado
                  </p>
                </Card>
              </Grid>
              <Grid item md={6} xl={4}>
                <Card className="card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 d-block">
                  <div className="d-130 object-skew hover-scale-sm icon-blob btn-icon text-success mx-auto">
                    <svg
                      className="blob-wrapper opacity-1"
                      viewBox="0 0 600 600"
                      xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(300,300)">
                        <path
                          d="M169,-144C206.7,-87.5,216.5,-18,196.9,35.7C177.3,89.4,128.3,127.1,75.2,150.7C22,174.2,-35.4,183.5,-79.7,163.1C-124,142.7,-155.1,92.6,-164.1,40.9C-173.1,-10.7,-160.1,-64,-129,-118.9C-98,-173.8,-49,-230.4,8.3,-237.1C65.7,-243.7,131.3,-200.4,169,-144Z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                    <div className="blob-icon-wrapper">
                      <CheckIcon />
                    </div>
                  </div>
                  <h5 className="font-weight-bold font-size-lg text-second mb-2">
                    Twitter
                  </h5>
                  <p className="mb-4 text-black-50">
                    Integrados completamente com o Tweeter analisamos milhões de
                    informações relevantes para você
                  </p>
                </Card>
              </Grid>
              <Grid item md={6} xl={4}>
                <Card className="card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 d-block">
                  <div className="d-130 object-skew hover-scale-sm icon-blob btn-icon text-success mx-auto">
                    <svg
                      className="blob-wrapper opacity-1"
                      viewBox="0 0 600 600"
                      xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(300,300)">
                        <path
                          d="M169,-144C206.7,-87.5,216.5,-18,196.9,35.7C177.3,89.4,128.3,127.1,75.2,150.7C22,174.2,-35.4,183.5,-79.7,163.1C-124,142.7,-155.1,92.6,-164.1,40.9C-173.1,-10.7,-160.1,-64,-129,-118.9C-98,-173.8,-49,-230.4,8.3,-237.1C65.7,-243.7,131.3,-200.4,169,-144Z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                    <div className="blob-icon-wrapper">
                      <CheckIcon />
                    </div>
                  </div>
                  <h5 className="font-weight-bold font-size-lg text-second mb-2">
                    Responsivo
                  </h5>
                  <p className="mb-4 text-black-50">
                    Acesse de qualquer lugar e em qualquer dispositivo, seja
                    computador, tablet ou Smartphone
                  </p>
                </Card>
              </Grid>
              <Grid item md={6} xl={4}>
                <Card className="card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 d-block">
                  <div className="d-130 object-skew hover-scale-sm icon-blob btn-icon text-success mx-auto">
                    <svg
                      className="blob-wrapper opacity-1"
                      viewBox="0 0 600 600"
                      xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(300,300)">
                        <path
                          d="M169,-144C206.7,-87.5,216.5,-18,196.9,35.7C177.3,89.4,128.3,127.1,75.2,150.7C22,174.2,-35.4,183.5,-79.7,163.1C-124,142.7,-155.1,92.6,-164.1,40.9C-173.1,-10.7,-160.1,-64,-129,-118.9C-98,-173.8,-49,-230.4,8.3,-237.1C65.7,-243.7,131.3,-200.4,169,-144Z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                    <div className="blob-icon-wrapper">
                      <CheckIcon />
                    </div>
                  </div>
                  <h5 className="font-weight-bold font-size-lg text-second mb-2">
                    Intuitivo
                  </h5>
                  <p className="mb-4 text-black-50">
                    Plataforma fácil de utilizar e intuitiva. Design moderno com
                    suporte com horário extendido
                  </p>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Features;
