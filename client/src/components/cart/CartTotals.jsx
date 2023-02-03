import { Button } from 'antd';
import {useSelector} from 'react-redux'
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';


const CartTotals = () => {

  const { cartItems } = useSelector((state) => state.cart);

  

  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
      <h2 className="bg-blue-600 text-center py-4 text-white font-bold text-sm sm:text-lg">
        Sepetteki Ürünler
      </h2>
      <ul className="ecani cart-items px-1 flex flex-col gap-y-3 py-2 pb-20 overflow-auto">
       {cartItems.map((item) => (
         <li className="cart-item flex justify-between sm:px-1 px-0" key={item._id}>
         <div className="flex items-center">
           <img
           src={item.img}
             alt=""
             className="w-14 h-14 object-cover"
           />
           <div className="flex flex-col ml-2">
             <b>{item.title}</b>
             <span>{item.price}₺ x {item.quantity}</span>
           </div>
         </div>
         <div className="flex items-center gap-x-1">
           <Button
             type="primary"
             size="small"
             className="w-full flex items-center justify-center !rounded-full"
             icon={<PlusCircleOutlined />}
           />
           <span className="">{item.quantity}</span>
           <Button
             type="primary"
             size="small"
             className="w-full flex items-center justify-center !rounded-full"
             icon={<MinusCircleOutlined />}
           />
         </div>
       </li>
       ))}
       
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>99₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %8</b>
            <span className="text-red-700">+7.92₺</span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-green-500 sm:text-xl text-lg">Genel Toplam</b>
            <span className="text-xl">99₺</span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button type="primary" size="middle" className="w-full">
            Sipariş Oluştur
          </Button>
          <Button
            type="primary"
            danger
            size="middle"
            className="w-full mt-2 flex justify-center items-center"
            icon={<ClearOutlined />}
          >
            Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
