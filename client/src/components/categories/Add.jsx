import React from 'react';
import { Button, Form, Input, Modal, message } from 'antd';

const Add = ({
  isAddModalOpen,
  setAddIsModalOpen,
  categories,
  setCategories,
}) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    try {
      fetch('http://localhost:5000/api/categories/add-category', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'content-type': 'application/json; charset=UTF-8' },
      });
      message.success(` Kategori başarıyla oluşturuldu`);
      form.resetFields();
      setCategories([...categories, {_id: Math.random(), title: values.title}]);
      setTimeout(() => {
        setAddIsModalOpen(false);
      }, 1200);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        title="Yeni Kategori Ekle"
        open={isAddModalOpen}
        onCancel={() => setAddIsModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name={'title'}
            label="Kategori Ekle"
            rules={[
              { required: true, message: 'Kategori adı boş bırakılamaz!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Oluştur
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Add;
