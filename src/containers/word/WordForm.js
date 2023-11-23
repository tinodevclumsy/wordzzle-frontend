import React from 'react';
import { Space, Input, Switch, Button } from 'antd';
import PropTypes from 'prop-types';
import { MinusCircleOutlined } from '@ant-design/icons';

const WordForm = ({
  type,
  item,
  onTitleChange,
  onMeaningAdd,
  onMeaningChange,
  onMeaningDelete,
  onStatusChange
}) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Input addonBefore="Title" value={item.title} onChange={onTitleChange} />
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
      {type === 'edit' && <Switch checked={item.status} onChange={onStatusChange}/>}
    </Space>
  );
};

WordForm.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onTitleChange: PropTypes.func,
  onMeaningAdd: PropTypes.func,
  onMeaningChange: PropTypes.func,
  onMeaningDelete: PropTypes.func,
  onStatusChange: PropTypes.func,
};

export default WordForm;
