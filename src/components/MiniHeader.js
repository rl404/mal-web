import React from 'react';

const MiniHeader = ({ appName }) => {
  return (
    <div className="mini-header">
        <h1>
          {appName.toLowerCase()}
        </h1>
    </div>
  );
};

export default MiniHeader;