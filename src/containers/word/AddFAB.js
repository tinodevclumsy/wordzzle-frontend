import React from 'react';
import { FloatButton } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateModal } from '../../modules/word';

const AddFAB = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user.user);

  const onClick = () => {
    dispatch(
      updateModal({
        modal: 'add',
        item: { title: '', meaning: [{ value: null }] },
      }),
    );
  };
  return (
    <>
      {user && (
        <FloatButton
          icon={<PlusCircleOutlined />}
          type="primary"
          onClick={onClick}
        />
      )}
    </>
  );
};

export default AddFAB;
