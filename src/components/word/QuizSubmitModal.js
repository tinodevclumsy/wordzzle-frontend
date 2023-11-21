/* eslint-disable no-unused-vars */
import React from 'react';
import { Modal, Table } from 'antd';
import PropTypes from 'prop-types';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const SubmitModal = ({ sheet, list, open, onCancel, onOk }) => {
  const COLUMNS = [
    { title: 'Question', dataIndex: 'meaning', key: 'word-question' },
    { title: 'Submission', dataIndex: 'submission', key: 'word-submission' },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'word-result',
      render: (stat) =>
        stat ? (
          <CheckCircleOutlined style={{ color: 'green' }} />
        ) : (
          <CloseCircleOutlined style={{ color: 'red' }} />
        ),
    },
    { title: 'Answer', dataIndex: 'answer', key: 'word-answer' },
  ];

  const renderRecord = () => {
    return list.map((ele, idx) => {
      return {
        meaning: ele.meaning.map((item, mIndex) => {
          return mIndex === ele.meaning.length - 1
            ? item.value
            : `${item.value}, `;
        }),
        submission: sheet[idx] !== '' ? sheet[idx] : '-',
        result: sheet[idx].toLowerCase() === ele.title.toLowerCase(),
        answer: ele.title,
      };
    });
  };

  return (
    <Modal open={open} centered onCancel={onCancel} onOk={onOk}>
      <Table columns={COLUMNS} dataSource={renderRecord()} pagination={false} />
    </Modal>
  );
};

SubmitModal.propTypes = {
  open: PropTypes.bool,
  sheet: PropTypes.array,
  list: PropTypes.array,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
};

export default SubmitModal;
