//  TODO: optimize (불변성 관련) & rendering
import React, { useEffect, useState, useCallback } from 'react';
import { getWordList, updateWord, deleteWord } from '../lib/api/word';
import { Table, Modal, Input, Space, Switch, Button } from 'antd';
import styled from 'styled-components';
import {
  MinusCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WordListPage = () => {
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [item, setItem] = useState({});

  const onEditClick = useCallback(
    (editTarget) => {
      setItem(editTarget);
      setIsModalOpen(true);
    },
    [isModalOpen],
  );
  const onRemoveClick = useCallback(
    (removeTarget) => {
      setItem(removeTarget);
      setDeleteModal(true);
    },
    [deleteModal],
  );

  const handleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const handleRemoveModal = useCallback(() => {
    setDeleteModal(!deleteModal);
  }, [deleteModal]);

  const onStatusChange = useCallback(
    (stat) => {
      const currentState = { ...item };
      const updatedObject = { ...currentState, status: stat };
      setItem(updatedObject);
    },
    [item],
  );

  const onMeaningAdd = useCallback(() => {
    const obj = { ...item };
    obj.meaning = [...item.meaning];
    obj.meaning.push({ value: '' });

    setItem(obj);
  }, [item]);

  const onMeaningRemove = useCallback(
    (index) => {
      setItem((prevItem) => {
        const obj = { ...prevItem };
        const updated = {
          ...obj,
          meaning: obj.meaning.filter((_, i) => i !== index - 1),
        };
        return updated;
      });
    },
    [item],
  );

  const onMeaningChange = useCallback((e, index) => {
    setItem((prevItem) => {
      const obj = JSON.parse(JSON.stringify(prevItem));
      obj.meaning[index - 1].value = e.target.value;
      return obj;
    });
  }, []);

  const handleRemoveOk = useCallback(() => {
    console.log(item);
    deleteWord({ id: item._id }).then((response) => {
      console.log(response)
      if (response.status === 204) {
        setDeleteModal(false);
      }
    });
  }, [item]);

  const handleEditOk = useCallback(() => {
    updateWord({
      id: item._id,
      body: {
        title: item.title,
        status: item.status,
        meaning: item.meaning,
      },
    }).then((response) => {
      if (response.status === 200) {
        const l = [...list];
        const index = list.findIndex((ele) => ele._id === response.data._id);
        l[index] = response.data;
        setList(l);
        setIsModalOpen(false);
      }
    });
  }, [item]);

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
          <a onClick={() => onEditClick(record)}>Edit</a>
          <a onClick={() => onRemoveClick(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getWordList().then((response) => {
      setList(response.data);
    });
  }, []);

  return (
    <Container>
      <Table
        style={{ width: '80%' }}
        columns={COLUMNS}
        dataSource={list}
        rowKey={(record) => record._id}
      />

      <Modal
        title="Delete a word"
        open={deleteModal}
        onOk={handleRemoveOk}
        onCancel={handleRemoveModal}
        centered
      >
        <p>
          Delete <b>{item.title}</b>?
        </p>
      </Modal>

      <Modal
        title="Edit a word"
        open={isModalOpen}
        onOk={handleEditOk}
        onCancel={handleModal}
        centered
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input addonBefore="Title" defaultValue={item.title} />
          {item.meaning &&
            item.meaning.map((ele, index) => {
              return (
                <Space.Compact
                  key={`meaning-filed-${index}`}
                  style={{ width: '100%' }}
                >
                  <Input
                    addonBefore={`meaning #${++index}`}
                    defaultValue={ele.value}
                    onChange={(e) => onMeaningChange(e, index)}
                  />
                  <Button danger onClick={() => onMeaningRemove(index)}>
                    <MinusCircleOutlined />
                  </Button>
                </Space.Compact>
              );
            })}
          <Button onClick={() => onMeaningAdd()}>Add meaning</Button>
          <label>Memorized</label>
          <Switch checked={item.status} onChange={onStatusChange} />
        </Space>
      </Modal>
    </Container>
  );
};

export default WordListPage;
