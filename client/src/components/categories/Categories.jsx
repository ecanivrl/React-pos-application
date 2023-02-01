import React, { useState } from 'react';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import Add from './Add';
import Edit from './Edit';

const Categories = ({ categories, setCategories }) => {
  const [isAddModalOpen, setAddIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditIsModalOpen] = useState(false);

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
      <li
        className="category-item !bg-orange-500 hover:opacity-90"
        onClick={() => setEditIsModalOpen(true)}
      >
        <EditOutlined className="md:text-3xl" />
      </li>
      <Add
        isAddModalOpen={isAddModalOpen}
        setAddIsModalOpen={setAddIsModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
      
      <Edit className="overflow-y-auto h-[300px]"
       isEditModalOpen={isEditModalOpen} 
       setEditIsModalOpen={setEditIsModalOpen}
       categories={categories}
       setCategories={setCategories}
/>
    </ul>
  );
};

export default Categories;
