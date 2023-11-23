import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'antd';
import {
  updateModal,
  changeTitle,
  changeMeaning,
  addMeaning,
  deleteMeaning,
  addWord,
} from '../../modules/word';
import WordForm from './WordForm';

const AddModal = () => {
  const dispatch = useDispatch();
  const TYPE = 'add';

  const { status, item } = useSelector(({ word }) => ({
    status: word.options.add.status,
    item: word.options.add.item,
  }));

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

  const onCancel = () => {
    dispatch(
      updateModal({
        modal: TYPE,
        item: {},
      }),
    );
  };

  const onOk = () => {
    dispatch(
      addWord({
        title: item.title,
        meaning: item.meaning,
      }),
    );
  };

  return (
    <Modal
      title="Add a word"
      open={status}
      onCancel={onCancel}
      onOk={onOk}
      centered
    >
      <WordForm
        type={TYPE}
        item={item}
        onTitleChange={onTitleChange}
        onMeaningChange={onMeaningChange}
        onMeaningAdd={onMeaningAdd}
        onMeaningDelete={onMeaningDelete}
      />
    </Modal>
  );
};

export default AddModal;
