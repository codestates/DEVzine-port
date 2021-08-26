import React from 'react';
import { useParams } from 'react-router-dom';
import ContributionUpdateWrapper from '../components/ContributionUpdate/ContributionUpdateWrapper';

function ContributionUpdate() {
  let { id } = useParams();

  return (
    <>
      <ContributionUpdateWrapper id={id} />
    </>
  );
}

export default ContributionUpdate;
