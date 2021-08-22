
import React from 'react';
import hero1 from '../../../assets/images/hero-bg/hero-9.jpg';
import LogoBranca from '../../../assets/images/logo/logo_tweeze_branco.png';

const Bannerfaq = () => (
  <div className="hero-wrapper bg-deep-blue bg-composed-wrapper">
  <img
   className="z-over shadow-container-content-5 text-white text-center ajustelogoinicial espaçamentoInicial align-self-center p-4 p-xl-5"
   src={LogoBranca}
   alt=""
   />  
      <div className="flex-grow-1 w-100 d-flex align-items-center">
          <div
            className="bg-composed-wrapper--image opacity-5"
            style={{ backgroundImage: 'url(' + hero1 + ')' }}
          />
          <div className="bg-composed-wrapper--bg bg-second opacity-7" />
          <div className="bg-composed-wrapper--content align-self-center p-4 p-xl-5">
              <div className="mb-4">
                <h4
                  className="font-weight-bold text-white display-3 align-self-center">
                  Central de ajuda
                </h4>
                <div className="mx-auto">
                  <p className="text-white opacity-6 mt-3 mb-5 font-size-xxl align-self-center">
                    Navegue pelas perguntas mais frequentes e envie as suas próprias perguntas para o Suporte da Tweeze.
                  </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    
  );

  export default Bannerfaq;