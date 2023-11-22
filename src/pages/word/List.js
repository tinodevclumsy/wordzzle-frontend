import React from 'react';
import Layout from '../../layout';
import WordTable from '../../containers/word/WordList';

const List = () => {
  return (
    <Layout>
        <div style={{ width: '100%' }}>
          <WordTable />
        </div>
    </Layout>
  );
};

export default List;
