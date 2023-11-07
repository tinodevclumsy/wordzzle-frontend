import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

const DeleteModal = ({ open, word, onCancel, onOk }) => {
  return (
    <Modal open={open} onOk={onOk} onCancel={onCancel} centered>
      <p>
        Delete <b>{word.title}</b>?
      </p>
    </Modal>
  );
};

DeleteModal.propTypes = {
  open: PropTypes.bool,
  word: PropTypes.object,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
};

export default DeleteModal;
