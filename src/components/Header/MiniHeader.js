import React from 'react';

const MiniHeader = ({ title }) => {
  return (
    <div className="container" id="mini-header">
        <h1>
          {title}
        </h1>
    </div>
  );
};

export default MiniHeader;