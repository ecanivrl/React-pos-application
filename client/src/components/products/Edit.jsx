import { Button, Form,  message, Table } from 'antd';
import React, { useState, useEffect } from 'react';

const Edit = ({
  isEditModalOpen,
  setEditIsModalOpen,
  categories,
  setCategories,
}) => {
    const [products, setProducts] = useState([]);

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

  const onFinish = (values) => {
    console.log(values);
    try {
      fetch('http://localhost:5000/api/categories/update-category', {
        method: 'PUT',
        body: JSON.stringify({ ...values}),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
      message.success('Kategori başarıyla güncellendi.');
      setCategories(
        categories.map((item) => {
         
          return item;
        })
      );
    } catch (error) {
      message.success('Bir şeyler yanlış gitti.');
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    try{
    fetch(`http://localhost:5000/api/categories/delete-category`,{
      method: 'DELETE',
      body: JSON.stringify({categoryId: id}),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    message.success(` Kategori başarıyla silindi.`);
   setTimeout(() => {
    setEditIsModalOpen(false);
   }, 1200)
    setCategories(categories.filter((item) => item._id !== id));
    }catch(error){
      message.success(`Bir şeyler yanlış gitti.`);
      console.log(error);
    }
  };


  const columns = [
    {
      title: 'Ürün Adı',
      dataIndex: 'title',
      width: "8%",
      render: (_, record) => {
      
          return <p>{record.title}</p>;
      },
    },
    {
        title: 'Ürün Görseli',
        dataIndex: 'img',  
        width: "8%",
        render: (_, record) => {
             return <img src={record.img} alt="" className='w-full h-20 object-center object-cover'/>       
        },
    },
    {
        title: 'Ürün Fiyatı',
        dataIndex: 'price',  
        width: "4%"
    },
    {
        title: 'Kategori',
        dataIndex: 'category',  
        width: "8%"
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: "8%",
      render: (text, record) => {
        return (
          <div>
            <Button
              type="link"
              className="pl-0"
            >
              Düzenle
            </Button>
            <Button type="link" htmlType="submit" className="text-gray-500" onClick={() => setEditIsModalOpen(false)}>
              Kaydet
            </Button>
            <Button type="link" danger onClick={() => deleteCategory(record._id)}>
              Sil
            </Button>
          </div>
        );
      },
    },
  ];

  return (
 
      <Form
        onFinish={onFinish}
        className="md:h-[500px] h-[400px] overflow-y-auto ecani"
      >
        
          <Table
          scroll={{ x: 500 }}
        className=''
          bordered
          dataSource={products}
          columns={columns}
          rowKey={'_id'}
        />
      
        
      </Form>
  );
};

export default Edit;
