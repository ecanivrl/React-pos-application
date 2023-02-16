import React from 'react';
import { Button, Form, Input, Modal, message, Select } from 'antd';

const Add = ({
  isAddModalOpen,
  setAddIsModalOpen,
  categories,
  products,
  setProducts,
}) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/products/add-product", {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'content-type': 'application/json; charset=UTF-8' },
      });
      message.success(` Ürün başarıyla oluşturuldu`);
      form.resetFields();
      setProducts([...products, { ...values, _id: Math.random(), price: Number(values.price) }]);
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
        title="Yeni Ürün Ekle"
        open={isAddModalOpen}
        onCancel={() => setAddIsModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name={'title'}
            label="Ürün Ekle"
            rules={[{ required: true, message: 'Ürün adı boş bırakılamaz!' }]}
          >
            <Input placeholder="Ürün adı giriniz..." />
          </Form.Item>
          <Form.Item
            name="img"
            label="Ürün Görseli"
            rules={[
              {
                required: true,
                message: 'Ürün görseli alanı boş bırakılamaz!',
              },
            ]}
          >
            <Input placeholder="Ürün görseli giriniz..." />
          </Form.Item>
          <Form.Item
            name="price"
            label="Ürün Fiyatı"
            rules={[
              { required: true, message: 'Ürün Fiyatı boş bırakılamaz!' },
            ]}
          >
            <Input placeholder="Ürün fiyatı giriniz..." />
          </Form.Item>
          <Form.Item
            name="category"
            label="Kategori Seç"
            rules={[
              { required: true, message: 'Kategori alanı boş bırakılamaz!' },
            ]}
          >
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.title ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? '').toLowerCase())
              }
              options={categories}
            />
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
