import React from 'react';

import Loader from './Loader';

const ConditionalRender = ({ conditional, children }) =>
  conditional ? <Loader isLoading={conditional} /> : children;

export default ConditionalRender;
