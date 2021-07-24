import React from 'react';

import { PageTitle } from '../layout-components';

import { ExampleWrapperSeamless } from '../layout-components';
import { ExampleWrapperSimple } from '../layout-components';

export default function Blank() {
  return (
    <>
      <PageTitle
        titleHeading="Titulo"
        titleDescription="Exemplo de descrição"
      />

      <ExampleWrapperSeamless>
        <div>Exemplo 1</div>
      </ExampleWrapperSeamless>
      <ExampleWrapperSimple>
        <div>Exemplo 2</div>
      </ExampleWrapperSimple>
    </>
  );
}
