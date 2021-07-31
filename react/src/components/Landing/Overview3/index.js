import React from 'react';

import { Grid, Container, Card, Button } from '@material-ui/core';

import GaugeChart from 'react-gauge-chart';

import { NavLink } from 'react-router-dom';

import crypto from '../../../assets/images/apps/crypto-app-material-ui-pro.jpg';
import messenger from '../../../assets/images/apps/messenger-app-material-ui-pro.jpg';
import commerce from '../../../assets/images/apps/commerce-app-material-ui-pro.jpg';
import general from '../../../assets/images/apps/admin-dashboard-material-ui-pro.jpg';

import hero1 from '../../../assets/images/hero-bg/hero-5.jpg';

import NotificationsActiveTwoToneIcon from '@material-ui/icons/NotificationsActiveTwoTone';





export default function LivePreviewExample() {
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
                <div className="badge badge-primary mb-3 h-auto py-2 px-4 font-size-xs badge-pill font-weight-normal">
                Tweeze
                </div>
                <h4 className="font-weight-bold text-white display-3">
                  Entenda como podemos te ajudar
                </h4>
                <Grid item md={11} lg={10} className="mx-auto">
                 <p className="text-white opacity-6 mt-3 mb-5 font-size-xxl">
                 Com a Tweeze, você pode pinçar as notícias mais importantes para o seu negócio, descobrir o que dizem da sua marca e ainda gerar relatórios e enviá-los de forma fácil e intuitiva.
                    </p>
                </Grid>
              </div>

              <div className="videoWrapper">
              <iframe src="https://youtube.com/embed/WZRxRf0DPfY" frameBorder="0" allowfullscreen></iframe>
            </div>

              <br></br>
              <br></br>
              <br></br>
              <br></br>
              
              <Grid container spacing={6}>
                <Grid item md={6}>
                  <div className="card shadow-sm-dark rounded-lg bg-transparent">
                    <div className="card-img-wrapper">
                      <div className="card-badges card-badges-bottom">
                        <div className="badge badge-pill h-auto py-1 px-3 badge-success shadow-xxl">
                          Active
                        </div>
                      </div>
                      <img
                        src={general}
                        className="rounded-lg img-fluid"
                        alt="..."
                      />
                    </div>
                  </div>
                  <p className="text-white font-weight-bold font-size-xxl pt-3 mb-3">
                    Gráficos decisivos
                  </p>
                </Grid>
                
                <Grid item md={6}>
                  <a
                    href="https://demo.uifort.com/bamburgh-react-messenger-application-material-ui-pro-demo"
                    className="card modal-content card-box-hover-rise rounded-lg bg-transparent">
                    <img
                      src={messenger}
                      className="rounded-lg img-fluid"
                      alt="..."
                    />
                  </a>
                  <p className="text-white font-weight-bold font-size-xxl pt-3 mb-3">
                    Tecnologia de ponta
                  </p>
                </Grid>
              </Grid>

              <div className="py-4 mb-4 buttonvideo">
                <Button
                  href="https://uifort.com/template/bamburgh-react-admin-dashboard-material-ui-pro"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="btn-pill shadow-second-sm btn-first"
                  size="large">
                  <span>Veja detalhes de nossas soluções</span>
                </Button>
              </div>
            </Container>
          </div>
        </div>
      </div>

      <div className="py-4 feature-box">
        <Container className="py-5">
          <div className="mb-4 text-center">
            <div className="badge badge-primary text mb-3 h-auto py-2 px-4 font-size-xs badge-pill font-weight-normal">
              OPÇÕES ILIMITADAS
            </div>
            <h4 className="font-weight-bold text-second display-3">
              Tenha a informação que você precisar
            </h4>
            <Grid item md={11} lg={10} className="mx-auto">
              <p className="text-second opacity-6 mt-3 mb-5 font-size-xxl">
                Sua empresa terá acesso a todas as informações divulgadas por veículos de imprensa nacionais e internacionais
              </p>
            </Grid>
          </div>
          <Grid container spacing={6} className="mt-5">
            <Grid item xl={4} className="d-flex align-items-center">
              <Grid container spacing={0} className="w-100 mb-3 mb-xl-0">
                <Grid item lg={4} xl={12}>
                  <div className="feature-box pr-4">
                    <h3 className="font-size-xl font-weight-bold my-3 text-primary">
                      Captação 
                    </h3>
                    <p className="text-black-50 mb-3">
                      Captamos dezenas de milhares de notícias diariamente. Nossa plataforma é capaz de coletar notícias nos idiomas portugues, ingles e francês. Além disso, integração com o Twiiter, onde as notícias sempre chegam primeiro.
                    </p>
                  </div>
                </Grid>
                <Grid item lg={4} xl={12}>
                  <div className="feature-box pr-4">
                    <h3 className="font-size-xl font-weight-bold my-3 text-primary">
                      Análise
                    </h3>
                    <p className="text-black-50 mb-3">
                      Todas essas notícias são organizadas imediatamente para serem facilmente encontradas por quem precisa. Nos próximos milissegundos a esse momento, nossa inteligência artifial - Jull.IA, precesso o texto, identificando nele aspectos positivos ou negativos. 
                    </p>
                  </div>
                </Grid>
                <Grid item lg={4} xl={12}>
                  <div className="feature-box pr-4">
                    <h3 className="font-size-xl font-weight-bold my-3 text-primary">
                      Monitoramento
                    </h3>
                    <p className="text-black-50 mb-3">
                      O monitoramento das informações é 24 horas por dia, 7 dias por semana e 365 dias do ano. O monitoramento se extende de veículos de imprensa à mídias sociais. Dentre em breve mais novidades!
                    </p>  
                  </div>
                </Grid>
                <Grid item lg={4} xl={12}>
                  <div className="feature-box pr-4">
                    <h3 className="font-size-xl font-weight-bold my-3 text-primary">
                      Distribuição
                    </h3>
                    <p className="text-black-50 mb-3">
                      Nossos clientes são nosssa prioridade! Somos uma empresa que presa por clientes satisfeitos e tecnologia de ponta. Construímos a mais rápida plataforma e distribuimos dados em tempo real. 
                    </p>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={8} xl={4} className="d-flex align-items-center">
              <Card className="bg-second shadow-xxl card-box card-box-hover-rise card-box-hover rounded-lg text-center p-3 p-xl-4 mb-4 mb-md-0 d-block">
                <div className="d-100 object-skew hover-scale-sm icon-blob btn-icon text-warning mx-auto">
                  <svg
                    className="blob-wrapper opacity-2"
                    viewBox="0 0 600 600"
                    xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(300,300)">
                      <path
                        d="M155,-128.8C192.2,-77,207.7,-13,197.7,50.9C187.7,114.8,152.2,178.6,96.7,208.2C41.1,237.9,-34.6,233.4,-102.6,204C-170.6,174.7,-231.1,120.6,-246.7,55.4C-262.4,-9.9,-233.2,-86.3,-184.6,-140.7C-136,-195.2,-68,-227.6,-4.6,-223.9C58.9,-220.3,117.8,-180.6,155,-128.8Z"
                        fill="currentColor"
                      />
                    </g>
                  </svg>
                  <div className="blob-icon-wrapper">
                    <NotificationsActiveTwoToneIcon />
                  </div>
                </div>
                <h5 className="font-weight-bold font-size-lg text-white mb-2">
                  Avaliação geral da marca
                </h5>
                <p className="mb-4 text-white-50">
                  Este é um dos indicadores da nossa plataforma que te possibilatará entender o quão bem ou mal estão falando sobre sua marca ou tema de interesse.
                </p>
                <GaugeChart
                  id="chartsGauges1B"
                  nrOfLevels={24}
                  colors={['rgba(0,2,255,0.6)', 'rgba(255,11,244,0.8)']}
                  arcWidth={0.3}
                  percent={0.82}
                />
                <Button
                  component={NavLink}
                  to="/DashboardMonitoring"
                  className="btn-first badge-wrapper transition-base rounded-pill py-2 px-4 text-capitalize font-size-sm mt-3 d-inline-flex">
                  <span>View Dashboard</span>
                  <div
                    className="badge badge-warning badge-position badge-position--top-right shadow-none badge-circle"
                    id="NewNotificationsTooltip1">
                    New notifications
                  </div>
                </Button>
              </Card>
            </Grid>
            
            {/* tentativa de add small chart + responsivo */}

            <h5 className="font-weight-bold font-size-lg text-white mb-2">
                Avaliação geral da marca
            </h5>
              <p className="mb-4 text-white-50">
                  Este é um dos indicadores da nossa plataforma que te possibilatará entender o quão bem ou mal estão falando sobre sua marca ou tema de interesse.
                </p>
            <Grid item md={4} xl={3} className="d-flex align-items-center">
              <div className="py-2 py-xl-4">
                <div className="d-flex align-items-end flex-column">
                  <div className="feature-box icon-blob btn-icon text-warning">
                  <GaugeChart id="gauge-chart4" 
                  nrOfLevels={5}
                  percent={0.86} 
                  arcWidth={0.9}
                  colors={["#FF5F6D", "#FFC371", "#09407e"]} 


                  />

                   {/*  <h3 className="font-size-lg font-weight-bold my-3">
                      <div className="display-4 text-primary font-weight-bold">
                        Quer entender mais sobre como podemos te ajudar?
                      </div>
                    </h3>
                    <p className="text-black-50 font-size-lg mb-0">
                      Cadastre-se agora ou solicite uma visita guiada pela nossa plataforma.
                    </p>*/}
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  )
}
