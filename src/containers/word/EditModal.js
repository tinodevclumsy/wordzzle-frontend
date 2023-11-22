import React from 'react';
import { Modal, Space, Input, Button, Switch } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateModal,
  changeTitle,
  changeMeaning,
  addMeaning,
  deleteMeaning,
  updateWord,
} from '../../modules/word';
import { MinusCircleOutlined } from '@ant-design/icons';

const EditModal = () => {
  const dispatch = useDispatch();

  const { status, item } = useSelector(({ word }) => ({
    status: word.options.edit.status,
    item: word.options.edit.item,
  }));

  const onCancel = () => {
    dispatch(
      updateModal({
        modal: 'edit',
        item: {},
      }),
    );
  };

  const onTitleChange = (e) => {
    dispatch(
      changeTitle({
        value: e.target.value,
      }),
    );
  };

  const onMeaningChange = (index, e) => {
    dispatch(
      changeMeaning({
        index,
        value: e.target.value,
      }),
    );
  };

  const onMeaningAdd = () => {
    dispatch(addMeaning());
  };

  const onMeaningDelete = (index) => {
    dispatch(deleteMeaning(index));
  };

  const onOk = () => {
    dispatch(
      updateWord({
        id: item._id,
        title: item.title,
        status: item.status,
        meaning: item.meaning,
      }),
    );
  };

  return (
    <Modal
      title="Edit a word"
      open={status}
      centered
      onCancel={onCancel}
      onOk={onOk}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input
          addonBefore="Title"
          value={item.title}
          onChange={onTitleChange}
        />
        {item.meaning &&
          item.meaning.map((ele, index) => {
            return (
              <Space.Compact key={`meaning-${index}`} style={{ width: '100%' }}>
                <Input
                  addonBefore={`meaning #${index + 1}`}
                  value={ele.value}
                  onChange={(e) => onMeaningChange(index, e)}
                />
                <Button danger onClick={() => onMeaningDelete(index)}>
                  <MinusCircleOutlined />
                </Button>
              </Space.Compact>
            );
          })}

        <Button type="primary" onClick={onMeaningAdd}>
          Add meaning
        </Button>
        <Switch checked={item.status} />
      </Space>
    </Modal>
  );
};

export default EditModal;
