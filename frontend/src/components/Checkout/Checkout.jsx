import React, { useEffect } from 'react';

import { Button } from '@material-ui/core';
import { useMercadopago } from 'react-sdk-mercadopago';

const Checkout = ({ ...props }) => {
  const mercadopago = useMercadopago.v2(
    'TEST-c831723f-9ade-4270-b3e6-588d5337553a',
    {
      locale: 'pt-BR'
    }
  );

  useEffect(() => {
    if (mercadopago) {
      mercadopago.checkout({
        preference: {
          title: 'Tweeze',
          unit_price: 49.9,
          quantity: 1
        },
        render: {
          container: '.checkout-mpg',
          label: 'Pagar'
        }
      });
    }
  }, [mercadopago]);

  return (
    <>
      <Button className="checkout-mpg">Pagar</Button>
    </>
  );
};
export default Checkout;
