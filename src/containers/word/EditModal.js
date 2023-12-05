import React from 'react';
import { Modal, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateModal,
  changeTitle,
  changeMeaning,
  changeStatus,
  addMeaning,
  deleteMeaning,
  updateWord,
} from '../../modules/word';
import WordForm from './WordForm';

const EditModal = () => {
  const dispatch = useDispatch();
  const TYPE = 'edit';

  const { status, item } = useSelector(({ word }) => ({
    status: word.options.edit.status,
    item: word.options.edit.item,
  }));

  const onCancel = () => {
    dispatch(
      updateModal({
        modal: TYPE,
        item: {},
      }),
    );
  };

  const onTitleChange = (e) => {
    dispatch(
      changeTitle({
        value: e.target.value,
        type: TYPE,
      }),
    );
  };

  const onMeaningChange = (index, e) => {
    dispatch(
      changeMeaning({
        index,
        value: e.target.value,
        type: TYPE,
      }),
    );
  };

  const onMeaningAdd = () => {
    dispatch(addMeaning({ type: TYPE }));
  };

  const onMeaningDelete = (index) => {
    dispatch(deleteMeaning({ index, type: TYPE }));
  };

  const onStatusChange = () => {
    dispatch(changeStatus());
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
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          form={`${TYPE}Form`}
          key="submit"
          htmlType="submit"
          type="primary"
        >
          Submit
        </Button>,
      ]}
    >
      <WordForm
        type={TYPE}
        item={item}
        onTitleChange={onTitleChange}
        onMeaningChange={onMeaningChange}
        onMeaningAdd={onMeaningAdd}
        onMeaningDelete={onMeaningDelete}
        onStatusChange={onStatusChange}
        onOk={onOk}
      />
    </Modal>
  );
};

export default EditModal;
