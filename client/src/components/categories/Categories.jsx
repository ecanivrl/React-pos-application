import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, message } from 'antd';

const Categories = ({ categories, setCategories }) => {
  const [isAddModalOpen, setAddIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch('http://localhost:5000/api/categories/add-category', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'content-type': 'application/json; charset=UTF-8' },
      });
      message.success('Kategori başarıyla oluşturuldu');
      form.resetFields();
      setCategories([...categories, values]);
      setTimeout(() => {
        setAddIsModalOpen(false);
      }, 1200);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ul className="flex md:flex-col gap-4 text-lg categories">
      {categories &&
        categories.map((item) => (
          <li className="category-item" key={item._id}>
            <span>{item.title}</span>
          </li>
        ))}

      <li
        className="category-item !bg-purple-800 hover:opacity-90"
        onClick={() => setAddIsModalOpen(true)}
      >
        <PlusOutlined className="md:text-3xl" />
      </li>
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
    </ul>
  );
};

export default Categories;
