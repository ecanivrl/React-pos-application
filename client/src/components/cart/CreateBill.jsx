import { Button, Card, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);

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
        <Card className="w-full h-52">
                <div className="flex justify-between">
                  <span>Ara Toplam</span>
                  <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
                </div>
                <div className="flex justify-between py-2">
                  <b>KDV %{cart.tax}</b>
                  <span className="text-red-500">
                    +
                    {(cart.total * cart.tax) / 100 > 0
                      ? ((cart.total * cart.tax) / 100).toFixed(2)
                      : 0}
                    ₺
                  </span>
                </div>
                <div className="flex justify-between">
                  <b className="text-green-500 sm:text-xl text-lg">Net Tutar</b>
                  <span className="text-xl">
                    {cart.total + (cart.total * cart.tax) / 100 > 0 ? (
                      (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                    ) : (
                      <span>0.00</span>
                    )}
                    ₺
                  </span>
                </div>

                <Button
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
