import { Button,  Form,  Input,  message, Modal, Select, Table } from 'antd';
import React, { useState, useEffect } from 'react';

const Edit = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({})
  const [form] = Form.useForm();


  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/get-all`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/categories/get-all`);
        const data = await res.json();
        data && setCategories(data.map((item) => {
          return{...item, value: item.title}
         }));
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const onFinish = (values) => {
    console.log(values);
    try {
      fetch('http://localhost:5000/api/products/update-product', {
        method: 'PUT',
        body: JSON.stringify({ ...values, productId: editingItem._id }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
      message.success('Ürün başarıyla güncellendi.');
      setProducts(
        products.map((item) => {
         if(item._id === editingItem._id){
           return values
         }
          return item
        })
      );
    } catch (error) {
      message.success('Bir şeyler yanlış gitti.');
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
   if(window.confirm('Ürünü silmek istediğinize emin misiniz?')){
    try {
      fetch(`http://localhost:5000/api/products/delete-product`, {
        method: 'DELETE',
        body: JSON.stringify({ productId: id }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
      message.success(` Ürün başarıyla silindi.`);
     
      setProducts(products.filter((item) => item._id !== id));
    } catch (error) {
      message.success(`Bir şeyler yanlış gitti.`);
      console.log(error);
    }
   }
  };
  
  const CloseModalAll = () => {
    setTimeout(() => {
      setIsEditModalOpen(false)
      window.location.reload()
    },1200)
  }

  const columns = [
    {
      title: 'Ürün Adı',
      dataIndex: 'title',
      width: '8%',
      render: (_, record) => {
        return <p>{record.title}</p>;
      },
    },
    {
      title: 'Ürün Görseli',
      dataIndex: 'img',
      width: '8%',
      render: (_, record) => {
        return (
          <img
            src={record.img}
            alt=""
            className="w-full h-20 object-center object-cover"
          />
        );
      },
    },
    {
      title: 'Ürün Fiyatı',
      dataIndex: 'price',
      width: '4%',
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
      width: '8%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '8%',
      render: (text, record) => {
        return (
          <div>
            <Button type="link" className="pl-0" onClick={() => {
              setIsEditModalOpen(true)
              setEditingItem(record)
            }}>
              Düzenle
            </Button>
            
            <Button
              type="link"
              danger
              onClick={() => deleteCategory(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="md:h-[500px] h-[400px] overflow-y-auto ecani">
      <Table
        scroll={{ x: 500 }}
        className=""
        bordered
        dataSource={products}
        columns={columns}
        rowKey={'_id'}
      />
    </div>
    <Modal
        title="Yeni Ürün Ekle"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinish} form={form} initialValues={editingItem}>
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
            <Button type="primary" htmlType="submit" onClick={CloseModalAll}>
              Düzenle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Edit;
