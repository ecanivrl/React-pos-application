import React,{useState,useEffect} from 'react';
import Header from '../components/header/Header';
import StatisticCard from '../components/statistics/StatisticCard';
import { Area, Pie } from '@ant-design/plots';
// import ScrollToTop from "react-scroll-to-top";

const StatisticPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const data2 = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];

  const config = {
    data,
    xField: "timePeriod",
    yField: "value",
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    appendPadding: 10,
    data: data2,
    // theme: 'dark',
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "AntV\nG2Plot",
      },
    },
  };

  return (
    <>
     {/* <ScrollToTop smooth top={20} type='reset'/> */}
      <Header className=""/>
      <div className="px-6 md:pb-10 pb-20">
        <h1 className='text-3xl font-bold text-center '>İstatistiklerim</h1>
        <div className='statistic-section'>
            <h2 className='text-lg'>Hoş geldin  <span className='text-[#1F8A70] font-bold text-xl'>ADMIN</span></h2>
        </div>
        {/* grid-cols-[repeat(auto-fill,_330px)] */}
         <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-2 gap-4 justify-center pb-10 sm:pb-0">
        <StatisticCard title={"Toplam Müşteri"} amount={10} img={"images/user.png"}/>
        <StatisticCard title={"Toplam Kazanç"} amount={"987.646₺"} img={"images/money.png"}/>
        <StatisticCard title={"Toplam Satış"} amount={1144} img={"images/sale.png"}/>
         <StatisticCard title={"Toplam Ürün"} amount={1004} img={"images/product.png"}/>
        </div> 
        <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
        <div className="lg:w-1/2 w-full">
              <Area {...config} />
            </div>
            <div className="lg:w-1/2 w-full">
              <Pie {...config2} />
            </div>
        </div>
      </div>
    </>
  );
};

export default StatisticPage;
