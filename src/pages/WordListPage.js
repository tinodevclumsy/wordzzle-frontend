//  TODO: optimize (불변성 관련) & rendering 
import React, { useEffect, useState } from 'react';
import { getWordList, updateWord } from '../lib/api/word';
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
  const [item, setItem] = useState({});

  const onEditClick = (editTarget) => {
    setItem(editTarget);
    setIsModalOpen(true);
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onStatusChange = (stat) => {
    const currentState = { ...item };
    const updatedObject = { ...currentState, status: stat };
    setItem(updatedObject);
  };

  const onMeaningAdd = () => {
    const obj = {...item}
    obj.meaning = [...item.meaning]
    obj.meaning.push({value: ''})

    setItem(obj)
  }

  const onMeaningRemove = (index) => {
    const currentState = { ...item };
    const updatedObject = {
      ...currentState,
      meaning: currentState.meaning.filter((_, i) => i !== index - 1),
    };
    setItem(updatedObject);
  };

  const onMeaningChange = (e, index) => {
    const obj = {...item}
    obj.meaning = [...item.meaning]
    obj.meaning[index - 1].value = e.target.value
    
    console.log(obj)
    setItem(obj)
  }

  const handleEditOk = () => {
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
  };

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
          <a>Delete</a>
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
                    onChange={e => onMeaningChange(e, index)}
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
