import React from 'react';
import { Container } from 'react-bootstrap';

const MiniHeader = ({ title }) => {
  return (
    <Container id="mini-header">
      <h1>{title}</h1>
    </Container>
  );
};

export default MiniHeader;