import React from 'react';
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Badge, Input, Popconfirm, message } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = ({ search, setSearch }) => {
  const cart = useSelector((state) => state.cart);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const LogOut = () => {
    if (localStorage.getItem('posUser')) {
      localStorage.removeItem('posUser');
      message.success('Çıkış Yapıldı');
      setTimeout(() => {
        navigate('/login');
      }, 1200);
    }
  };

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
            className="rounded-full max-w-[800px]"
            onClick={() => pathname !== '/' && navigate('/')}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div
          className="menu-links flex justify-between items-center md:gap-7 gap-3 md:static z-50 fixed bottom-0 md:w-auto w-screen
        md:bg-transparent bg-white left-0 md:px-0 px-8 border-t md:border-none py-1 md:py-0"
        >
          <Link to={'/'} className={`${pathname === "/" && "active"} menu-link`}>
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Ana Sayfa</span>
          </Link>
          <Badge
            count={cart.cartItems.length}
            offset={[0, 0]}
            className="md:flex hidden"
          >
            <Link to={'/cart'}className={`${pathname === "/cart" && "active"} menu-link`}>
              <ShoppingCartOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Sepet</span>
            </Link>
          </Badge>
          <Link to={'/bills'} className={`${pathname === "/bills" && "active"} menu-link`}>
            <CopyOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Faturalar</span>
          </Link>
          <Link
            to={'/customers'}
            className={`${pathname === "/customers" && "active"} menu-link`}
          >
            <UserOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Müşteriler</span>
          </Link>
          <Link
            to={'/statistic'}
            className={`${pathname === "/statistic" && "active"} menu-link hover:scale-110`}
          >
            <BarChartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">İstatistikler</span>
          </Link>
          <Popconfirm
            title="Çıkış Yapmak İstediğinize Emin Misiniz?"
            onConfirm={LogOut}
            okText="Evet"
            cancelText="Hayır"
          >
            <div
             className="menu-link hover:scale-110">
              <LogoutOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Çıkış</span>
            </div>
          </Popconfirm>
        </div>
        <Badge
          count={cart.cartItems.length}
          offset={[0, 0]}
          className="md:hidden flex"
        >
          <Link
            to={'/cart'}
            className={`${pathname === "/cart" && "active"} menu-link hover:scale-110`}

          >
            <ShoppingCartOutlined className="text-2xl " />
            <span className="md:text-xs text-[10px]">Sepet</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
