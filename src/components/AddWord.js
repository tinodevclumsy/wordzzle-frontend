import React, { useState } from 'react';
import { FloatButton, Modal, Input, Space, Button } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { addWord } from '../lib/api/word';

const AddWord = () => {
  const [visible, setVisible] = useState(false);
  const [word, setWord] = useState({
    title: '',
    meaning: [],
  });

  const onTitleChange = (e) => {
    const obj = { ...word };
    obj.title = e.target.value;
    setWord(obj);
  };

  const onMeaningAdd = () => {
    const obj = { ...word };
    obj.meaning = [...word.meaning];
    obj.meaning.push({ value: '' });
    setWord(obj);
  };

  const onMeaningChange = (e, index) => {
    const obj = { ...word };
    obj.meaning = [...word.meaning];
    obj.meaning[index - 1].value = e.target.value;
    setWord(obj);
  };

  const onMeaningRemove = (index) => {
    const currentState = { ...word };
    const updatedObject = {
      ...currentState,
      meaning: currentState.meaning.filter((_, i) => i !== index - 1),
    };
    setWord(updatedObject);
  };

  const handleOk = () => {
    addWord(word).then((response) => {
      if (response.status === 201) {
        setWord({
          title: '',
          meaning: [],
        });
        // setVisible(false);
      }
    });
  };

  return (
    <>
      <FloatButton
        onClick={() => setVisible(true)}
        icon={<PlusCircleOutlined />}
        type="primary"
      />
      <Modal
        title="Add Word"
        open={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        centered
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input addonBefore="Title" value={word.title} onChange={(e) => onTitleChange(e)} />
          {word.meaning.map((ele, index) => {
            return (
              <Space.Compact
                key={`meaning-filed-${index}`}
                style={{ width: '100%' }}
              >
                <Input
                  addonBefore={`meaning #${++index}`}
                  value={ele.value}
                  onChange={(e) => onMeaningChange(e, index)}
                />
                <Button danger onClick={() => onMeaningRemove(index)}>
                  <MinusCircleOutlined />
                </Button>
              </Space.Compact>
            );
          })}
          <Button onClick={() => onMeaningAdd()}>Add meaning</Button>
        </Space>
      </Modal>
    </>
  );
};

export default AddWord;
