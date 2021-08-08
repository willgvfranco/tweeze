import React from 'react';
import { SyncLoader } from 'react-spinners';

const Loader = ({ isLoading }) => (
  <div
    className="mx-auto my-5"
    style={{
      display: `${isLoading ? 'flex' : 'none'}`,
      justifyContent: 'center'
    }}>
    <SyncLoader color={'var(--primary)'} loading={isLoading} />
  </div>
);

export default Loader;
