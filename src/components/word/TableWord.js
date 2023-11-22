import React, { useState } from 'react';
import { Table, Space, Input } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TableWord = ({
  list,
  totalWords,
  totalPages,
  onSearch,
  onPageChange,
  onEditClick,
  onDeleteClick,
}) => {
  const [keyword, setKeyword] = useState('');
  const { Search } = Input;

  const COLUMNS = [
    { title: 'Title', dataIndex: 'title', key: 'word-title' },
    {
      title: 'Meaning',
      dataIndex: 'meaning',
      key: 'word-meaning',
      render: (meaning) => (
        <p>
          {meaning.map((item, index) => {
            return index === meaning.length - 1
              ? item.value
              : `${item.value}, `;
          })}
        </p>
      ),
    },
    {
      title: 'Memorized',
      dataIndex: 'status',
      key: 'word-status',
      render: (stat) =>
        stat ? (
          <CheckCircleOutlined style={{ color: 'green' }} />
        ) : (
          <CloseCircleOutlined style={{ color: 'red' }} />
        ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <span onClick={() => onEditClick('edit', record)}>Edit</span>
          <span onClick={() => onDeleteClick('delete', record)}>Delete</span>
        </Space>
      ),
    },
  ];

  const onSeachChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      <TableHeader>
        <p style={{ color: '#999' }}>Total: {totalWords}</p>

        <div>
          <Search onChange={onSeachChange} onSearch={() => onSearch(keyword)} />
        </div>
      </TableHeader>
      <Table
        columns={COLUMNS}
        dataSource={list}
        rowKey={(record) => record._id}
        pagination={{
          total: totalPages,
          onChange: onPageChange,
        }}
      />
    </>
  );
};

TableWord.propTypes = {
  list: PropTypes.array,
  totalWords: PropTypes.number,
  totalPages: PropTypes.number,
  onSearch: PropTypes.func,
  onPageChange: PropTypes.func,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

export default TableWord;
