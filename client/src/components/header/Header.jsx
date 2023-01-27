import React from 'react';
import { SearchOutlined, HomeOutlined,ShoppingCartOutlined, CopyOutlined, UserOutlined, BarChartOutlined, LogoutOutlined } from '@ant-design/icons';
import { Badge, Input } from 'antd';
import {Link} from "react-router-dom"

const Header = () => {
  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <Link to="/">
            <h2 className="text-xl font-bold md:text-4xl">LOGO</h2>
          </Link>
        </div>
        <div className="header-search flex-1 flex justify-center">
          <Input
            size="large"
            placeholder="Ürün ara..."
            prefix={<SearchOutlined />}
            className='rounded-full max-w-[800px]'
          />
        </div>
        <div className="menu-links flex justify-between items-center gap-7 md:static z-50 fixed bottom-0 md:w-auto w-screen
        md:bg-transparent bg-white left-0 md:px-0 px-6 border-t md:border-none py-1 md:py-0">
          <Link to={"/"} className='menu-link hover:text-[#40a9ff] flex flex-col transition-all duration-500'>
            <HomeOutlined className='md:text-2xl text-xl' />
            <span className='md:text-xs text-[10px]'>Ana Sayfa</span>
          </Link>
          <Badge count={5} offset={[0,6]} className='md:flex hidden'>
          <Link to={"/cart"} className='menu-link hover:text-[#40a9ff] flex flex-col transition-all duration-500'>
            <ShoppingCartOutlined className='md:text-2xl text-xl' />
            <span className='md:text-xs text-[10px]'>Sepet</span>
          </Link>
          </Badge>
          <Link to={"/bills"} className='menu-link hover:text-[#40a9ff] flex flex-col transition-all duration-500'>
            <CopyOutlined  className='md:text-2xl text-xl' />
            <span className='md:text-xs text-[10px]'>Faturalar</span>
          </Link>
          <Link to={"/customers"} className='menu-link hover:text-[#40a9ff] flex flex-col transition-all duration-500'>
            <UserOutlined  className='md:text-2xl text-xl' />
            <span className='md:text-xs text-[10px]'>Müşteriler</span>
          </Link>
          <Link to={"/statistic"} className='menu-link hover:text-[#40a9ff] flex flex-col transition-all duration-500'>
            <BarChartOutlined  className='md:text-2xl text-xl' />
            <span className='md:text-xs text-[10px]'>İstatistikler</span>
          </Link>
          <Link to={"/login"} className='menu-link hover:text-[#40a9ff] flex flex-col transition-all duration-500'>
            <LogoutOutlined className='md:text-2xl text-xl' />
            <span className='md:text-xs text-[10px]'>Çıkış</span>
          </Link>
        </div>
        <Badge count={5} offset={[0,6]} className='md:hidden flex'>
          <Link to={"/cart"} className='menu-link hover:text-[#40a9ff] flex flex-col transition-all duration-500'>
            <ShoppingCartOutlined className='text-2xl ' />
            <span className='md:text-xs text-[10px]'>Sepet</span>
          </Link>
          </Badge>
      </header>
    </div>
  );
};

export default Header;
