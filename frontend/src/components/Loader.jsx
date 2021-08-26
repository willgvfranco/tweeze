import React from 'react';
import { SyncLoader } from 'react-spinners';

const Loader = ({
  isLoading,
  style = {
    display: `${isLoading ? 'flex' : 'none'}`,
    justifyContent: 'center'
  }
}) => (
  <div className="mx-auto my-5" style={style}>
    <SyncLoader color={'var(--primary)'} loading={isLoading} />
  </div>
);

export default Loader;
