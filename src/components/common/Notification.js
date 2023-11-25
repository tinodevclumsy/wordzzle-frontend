import React, { useEffect } from 'react';
import { notification } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { notify } from '../../modules/loading';
const Context = React.createContext({
  name: 'Default',
});
const Notification = () => {
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const { toggler, message, type } = useSelector(({ loading }) => ({
    toggler: loading.notify.toggler,
    message: loading.notify.message,
    type: loading.notify.type,
  }));
  const openNotification = () => {
    api[type]({
      message: type.toUpperCase(),
      description: message,
      placement: 'bottomRight',
    });
  };

  useEffect(() => {
    if (toggler) {
      openNotification();
      dispatch(notify({ message: '', type: '' }));
    }
  }, [toggler]);

  return <Context.Provider value={'test'}>{contextHolder}</Context.Provider>;
};

export default Notification;
