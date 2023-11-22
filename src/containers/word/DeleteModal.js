import React from 'react';
import { Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { updateModal, deleteWord } from '../../modules/word';

const DeleteModal = () => {
  const dispatch = useDispatch();

  const { status, item } = useSelector(({ word }) => ({
    status: word.options.delete.status,
    item: word.options.delete.item,
  }));

  const onCancel = () => {
    dispatch(
      updateModal({
        modal: 'delete',
        item: {},
      }),
    );
  };

  const onOk = () => {
    dispatch(
      deleteWord({
        id: item._id,
      }),
    );
  };

  return (
    <Modal
      title="Delete a word"
      open={status}
      centered
      onCancel={onCancel}
      onOk={onOk}
    >
      Are you sure to delete <b>{item.title && item.title}?</b>
    </Modal>
  );
};

export default DeleteModal;
