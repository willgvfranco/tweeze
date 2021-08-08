import React from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Card, CardContent } from '@material-ui/core';

import people2 from '../assets/images/stock-photos/people-2.jpg';
import people3 from '../assets/images/stock-photos/people-3.jpg';
import people1 from '../assets/images/stock-photos/people-1.jpg';

function SliderArrowNext(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FontAwesomeIcon icon={['fas', 'chevron-right']} />
    </div>
  );
}

function SliderArrowPrev(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <FontAwesomeIcon icon={['fas', 'chevron-left']} />
    </div>
  );
}

export default function LivePreviewExample() {
  const marketingTestimonials1 = {
    dots: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SliderArrowNext />,
    prevArrow: <SliderArrowPrev />,
    responsive: [
      {
        breakpoint: 1100,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };

  return (
    <>
      <Container className="py-5 mb-spacing-6-x2">
        <div className="text-center">
          <h1 className="display-3 text-black mb-2 font-weight-bold">
            Nossos Clientes
          </h1>
          <p className="font-size-xl mb-0 mb-lg-5 text-black-50">
            Entenda como nossos consumidores usam a Tweeze para gerenciar suas
            marcas
          </p>
        </div>
        <Slider
          {...marketingTestimonials1}
          className="slider-arrows-outside slider-arrows-dark slider-dots-outside">
          <div>
            <Card className="m-4">
              <CardContent>
                <div className="align-box-row align-items-start">
                  <div>
                    <Card className="card-transparent">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="card-img-wrapper rounded">
                        <img
                          src={people1}
                          className="card-img-top rounded-circle"
                          style={{ width: 80 }}
                          alt="..."
                        />
                      </a>
                    </Card>
                  </div>
                  <div className="pl-4">
                    <FontAwesomeIcon
                      icon={['fas', 'quote-right']}
                      className="text-primary font-size-xxl"
                    />
                    <div className="my-3 text-warning font-size-lg">
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                    </div>
                    <blockquote className="my-3 text-black-50">
                      Melhor custo benefício do mercado. Tweeze possibilitou
                      melhor alocação de pessoal em minha equipe.
                    </blockquote>
                    <div className="font-size-lg font-weight-bold">
                      Helvio Monteiro
                      <small className="text-black-50 pl-2">ACME Company</small>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="m-4">
              <CardContent>
                <div className="align-box-row align-items-start">
                  <div>
                    <Card className="card-transparent">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="card-img-wrapper rounded">
                        <img
                          src={people2}
                          className="card-img-top rounded-circle"
                          style={{ width: 80 }}
                          alt="..."
                        />
                      </a>
                    </Card>
                  </div>
                  <div className="pl-4">
                    <FontAwesomeIcon
                      icon={['fas', 'quote-right']}
                      className="text-primary font-size-xxl"
                    />
                    <div className="my-3 text-warning font-size-lg">
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                    </div>
                    <blockquote className="my-3 text-black-50">
                      80% do meu tempo era dedicado a confecção de clipping.
                      Agora, o clipping está sempre pronto! É Incrível!
                    </blockquote>
                    <div className="font-size-lg font-weight-bold">
                      Jhon Macário
                      <small className="text-black-50 pl-2">
                        Expresso & CO
                      </small>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="m-4">
              <CardContent>
                <div className="align-box-row align-items-start">
                  <div>
                    <Card className="card-transparent">
                      <a
                        href="#/"
                        onClick={(e) => e.preventDefault()}
                        className="card-img-wrapper rounded">
                        <img
                          src={people3}
                          className="card-img-top rounded-circle"
                          style={{ width: 80 }}
                          alt="..."
                        />
                      </a>
                    </Card>
                  </div>
                  <div className="pl-4">
                    <FontAwesomeIcon
                      icon={['fas', 'quote-right']}
                      className="text-primary font-size-xxl"
                    />
                    <div className="my-3 text-warning font-size-lg">
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star']} />
                      <FontAwesomeIcon icon={['fas', 'star-half-alt']} />
                    </div>
                    <blockquote className="my-3 text-black-50">
                      Tecnologia move o mundo da Effy. Sempre bom encontrar
                      empresas que colocam a tecnologia em nosso favor.
                    </blockquote>
                    <div className="font-size-lg font-weight-bold">
                      Effy Tecnologia
                      <small className="text-black-50 pl-2">
                        Effy Tecnologia
                      </small>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Slider>
      </Container>
    </>
  );
}
