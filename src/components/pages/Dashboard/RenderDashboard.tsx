import React from 'react';
import { useHistory } from 'react-router-dom';
import { clearToken } from '../../../utils';

const RenderDashboard = (): React.ReactElement => {
  const { push } = useHistory();
  return (
    <div className="dashboard">
      <button
        onClick={() => {
          clearToken();
          push('/');
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default RenderDashboard;
