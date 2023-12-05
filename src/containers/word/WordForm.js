import React, { useEffect } from 'react';
import { Form, Input, Space, Switch, Button } from 'antd';
import PropTypes from 'prop-types';
import { MinusCircleOutlined } from '@ant-design/icons';

const WordForm = ({
  type,
  item,
  onTitleChange,
  onMeaningAdd,
  onMeaningChange,
  onMeaningDelete,
  onStatusChange,
  onOk,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue('term', item.title);
    item.meaning.forEach((ele, index) => {
      form.setFieldValue(`meaning-${index}`, ele.value);
    });
  }, []);

  return (
    <Form
      form={form}
      id={`${type}Form`}
      name="word-form"
      layout="vertical"
      onFinish={onOk}
    >
      <Form.Item
        label="Term"
        name="term"
        rules={[
          {
            required: true,
            message: 'Term is required',
          },
        ]}
      >
        <Input name="term" value={item.title} onChange={onTitleChange} />
      </Form.Item>
      {item.meaning && (
        <div style={{ marginBottom: '8px' }}>
          <label>Meaning</label>
        </div>
      )}
      {item.meaning &&
        item.meaning.map((ele, index) => {
          return (
            <Space.Compact
              key={`meaningkey-${index}`}
              style={{ width: '100%', marginBottom: '5px' }}
            >
              <Form.Item
                label={`meaning-${index}`}
                name={`meaning-${index}`}
                rules={[
                  {
                    required: true,
                    message: 'Username is required',
                  },
                ]}
                noStyle
              >
                <Input
                  name={`meaning-${index}`}
                  value={ele.value}
                  onChange={(e) => onMeaningChange(index, e)}
                />
              </Form.Item>
              {item.meaning.length > 1 && (
                <Button danger onClick={() => onMeaningDelete(index)}>
                  <MinusCircleOutlined />
                </Button>
              )}
            </Space.Compact>
          );
        })}
      <Button
        type="primary"
        onClick={onMeaningAdd}
        style={{ marginTop: '5px' }}
      >
        Add meaning
      </Button>
      <br />
      {type === 'edit' && (
        <>
          <div style={{ margin: '8px 0' }}>
            <label>Memorized</label>
          </div>
          <Switch checked={item.status} onChange={onStatusChange} />
        </>
      )}
    </Form>
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
  onOk: PropTypes.func,
};

export default WordForm;
