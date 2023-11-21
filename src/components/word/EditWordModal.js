import React, { useState, useEffect } from 'react';
import { Modal, Space, Input, Button, Switch } from 'antd';
import PropTypes from 'prop-types';
import { MinusCircleOutlined } from '@ant-design/icons';

const EditModal = ({ open, word, onCancel, onOk }) => {
  const [item, setItem] = useState({});

  useEffect(() => {
    setItem(JSON.parse(JSON.stringify(word)));
  }, [word]);

  const handleEditOk = () => {
    onOk(item);
  };

  const handleCancel = () => {
    setItem(JSON.parse(JSON.stringify(word)));
    onCancel();
  };

  const onMeaningChange = (e, index) => {
    setItem((prevItem) => {
      const updatedItem = { ...prevItem };
      updatedItem.meaning[index - 1] = {
        ...updatedItem.meaning[index - 1],
        value: e.target.value,
      };
      return updatedItem;
    });
  };

  const onMeaningAdd = () => {
    setItem((prevItem) => ({
      ...prevItem,
      meaning: [...prevItem.meaning].concat([{ value: '' }]),
    }));
  };

  const onTitleChange = (e) => {
    setItem((prevItem) => ({
      ...prevItem,
      title: e.target.value,
    }));
  };

  const onMeaningRemove = (index) => {
    setItem((prevItem) => ({
      ...prevItem,
      meaning: [...prevItem.meaning].filter((_, i) => i !== index - 1),
    }));
  };

  const onStatusChange = (e) => {
    setItem((prevItem) => ({
      ...prevItem,
      status: e,
    }));
  };

  return (
    <div>
      <Modal
        title="Edit a word"
        open={open}
        onOk={handleEditOk}
        onCancel={handleCancel}
        centered
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            addonBefore="Title"
            value={item.title}
            onChange={(e) => onTitleChange(e)}
          />
          {item.meaning &&
            item.meaning.map((ele, index) => {
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
          <Button onClick={onMeaningAdd}>Add meaning</Button>
          <label>Memorized</label>
          <Switch checked={item.status} onChange={onStatusChange} />
        </Space>
      </Modal>
    </div>
  );
};

EditModal.propTypes = {
  open: PropTypes.bool,
  word: PropTypes.object,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
};

export default EditModal;
