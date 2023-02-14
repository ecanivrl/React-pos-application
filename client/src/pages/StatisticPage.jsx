import React, { useState, useEffect } from 'react';
import Header from '../components/header/Header';
import StatisticCard from '../components/statistics/StatisticCard';
import { Area, Pie } from '@ant-design/plots';
// import ScrollToTop from "react-scroll-to-top";

const StatisticPage = () => {
  const [data, setData] = useState([]);
console.log(data)
  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "http://localhost:5000/api/bills/get-all"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  // const data2 = [
  //   {
  //     type: '分类一',
  //     value: 27,
  //   },
  //   {
  //     type: '分类二',
  //     value: 25,
  //   },
  //   {
  //     type: '分类三',
  //     value: 18,
  //   },
  //   {
  //     type: '分类四',
  //     value: 15,
  //   },
  //   {
  //     type: '分类五',
  //     value: 10,
  //   },
  //   {
  //     type: '其他',
  //     value: 5,
  //   },
  // ];

  const config = {
    data,
    xField: 'customerName',
    yField: 'subTotal',
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    appendPadding: 10,
    data,
    // theme: 'dark',
    angleField: 'subTotal',
    colorField: 'customerName',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'Toplam\nAlım',
      },
    },
  };


  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0)
    return amount.toFixed(2)
  }


  return (
    <>
      {/* <ScrollToTop smooth top={20} type='reset'/> */}
      <Header className="" />
      <div className="px-6">
        <h1 className="text-2xl font-bold text-center">İstatistiklerim</h1>
        <div className="statistic-section">
          <h2 className="text-lg">
            Hoş geldin{' '}
            <span className="text-[#1F8A70] font-bold text-lg">ADMIN</span>
          </h2>
        </div>
        {/* grid-cols-[repeat(auto-fill,_330px)] */}
        <div className="flex flex-col gap-4 pb-10 ecani max-h-[610px] custom-horizontal-scrollbar overflow-auto">
          <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-2 gap-4 justify-center">
            <StatisticCard
              title={'Toplam Müşteri'}
              amount={10}
              img={'images/user.png'}
            />
            <StatisticCard
              title={'Toplam Kazanç'}
              amount={totalAmount()} 
              img={'images/money.png'}
            />
            <StatisticCard
              title={'Toplam Satış'}
              amount={data?.length}
              img={'images/sale.png'}
            />
            <StatisticCard
              title={'Toplam Ürün'}
              amount={1004}
              img={'images/product.png'}
            />
          </div>
          <div className="flex justify-between w-full gap-10 lg:flex-row flex-col items-center py-16">
            <div className="lg:w-1/2 w-full h-72">
              <Area {...config} />
            </div>
            <div className="lg:w-1/2 w-full h-72">
              <Pie {...config2} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticPage;
