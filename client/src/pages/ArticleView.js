import React from 'react';
import { useParams } from 'react-router-dom';
import ArticleViewWrapper from '../components/ArticleView/ArticleViewWrapper';

function ArticleView() {
  let { id } = useParams();
  return (
    <>
      <ArticleViewWrapper id={id} />
    </>
  );
}

export default ArticleView;
