import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Table, Space } from 'antd';
import EditModal from '../components/EditWordModal';
import DeleteModal from '../components/DeleteWordModal';
import { getWordList, updateWord, deleteWord } from '../lib/api/word';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 75px 0;
`;

const List = () => {
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
          <span onClick={() => onActionClick('edit', record)}>Edit</span>
          <span onClick={() => onActionClick('remove', record)}>Delete</span>
        </Space>
      ),
    },
  ];

  const [list, setList] = useState([]);
  const [item, setItem] = useState({});
  const [openEdit, setEditModal] = useState(false);
  const [openDelete, setDeleteModal] = useState(false);
  const [totalWords, setTotalWords] = useState(0);

  const onActionClick = (type, rec) => {
    setItem(rec);
    if (type === 'edit') {
      setEditModal((prevEditModal) => !prevEditModal);
    } else if (type === 'remove') {
      setDeleteModal((prevEditModal) => !prevEditModal);
    }
  };

  const onEditCancel = () => {
    setEditModal((prevEditModal) => !prevEditModal);
  };

  const onDeleteCancel = () => {
    setDeleteModal((prevDeleteModal) => !prevDeleteModal);
  };

  const onRemoveOk = () => {
    deleteWord({ id: item._id })
      .then((response) => {
        if (response.status === 204) {
          setDeleteModal(false);
          setList((prevList) =>
            prevList.filter((word) => word._id !== item._id),
          );
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const onEditOk = (payload) => {
    updateWord({
      id: payload._id,
      body: {
        title: payload.title,
        status: payload.status,
        meaning: payload.meaning,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setList((prevList) => {
            return prevList.map((word) => {
              if (word._id === response.data._id) {
                return response.data;
              }
              return word;
            });
          });
          onEditCancel();
          return true;
        }
      })
      .catch((e) => {
        console.error(e);
        return false;
      });
  };

  const onPageChange = (e) => {
    getList(e);
  };

  useEffect(() => {
    getList();
  }, []);

  const getList = (page = 1) => {
    getWordList(page)
      .then((response) => {
        setList(response.data.words);
        setTotalWords(response.data.totalWords);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <Container>
      <div style={{ width: '80%' }}>
        <p style={{ color: '#999' }}>Total: {totalWords}</p>
        <Table
          columns={COLUMNS}
          dataSource={list}
          rowKey={(record) => record._id}
          pagination={{
            total: totalWords,
            onChange: onPageChange,
          }}
        />
      </div>
      <EditModal
        open={openEdit}
        word={item}
        onCancel={onEditCancel}
        onOk={onEditOk}
      />
      <DeleteModal
        open={openDelete}
        word={item}
        onCancel={onDeleteCancel}
        onOk={onRemoveOk}
      />
    </Container>
  );
};

export default List;
