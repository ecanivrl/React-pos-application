import { Button, Card, Form, Input, Modal, Select } from 'antd';
import React from 'react';

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <Modal
      title="Fatura Oluştur"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    
    >
      <Form layout={'vertical'}   onFinish={onFinish}>
        <Form.Item
          label="Müşteri adı"
          name={'customerName'}
          rules={[
            { required: true, message: 'Müşeteri Adı Alanı Boş olmamalıdır' },
          ]}
        >
          <Input placeholder="Bir müşteri adı yazınız " />
        </Form.Item>
        <Form.Item
          name={'phoneNumber'}
          label="Tel No"
          rules={[{ required: true, message: 'Tel No Alanı Boş olmamalıdır' }]}
        >
          <Input placeholder="Bir Telefon Numarası yazınız" maxLength={11}/>
        </Form.Item>
        <Form.Item
          name={'paymentMode'}
          label="Ödeme yöntemi"
          rules={[{ required: true, message: 'Lütfen Bir Ödeme Yöntemi Seçiniz Lan' }]}
        >
          <Select placeholder="Ödeme Yöntemi Seçiniz...">
            <Select.Option value="Nakit">Nakit</Select.Option>
            <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
          </Select>
        </Form.Item>
        <Card>
          <div className="flex justify-between mt-5">
            <span>Ara Toplam</span>
            <span>549.00₺</span>
          </div>
          <div className="flex justify-between my-2">
            <span>Ara Toplam</span>
            <span className="text-red-600">43.92₺</span>
          </div>
          <div className="flex justify-between">
            <b>Toplam</b>
            <b>592.92₺</b>
          </div>
          <Button
            htmlType="submit"
            onClick={() => setIsModalOpen(true)}
            type="primary"
            className="mt-4 w-full"
            size="large"
          >
            Sipariş Oluştur
          </Button>
        </Card>
      </Form>
    </Modal>
  );
};

export default CreateBill;
