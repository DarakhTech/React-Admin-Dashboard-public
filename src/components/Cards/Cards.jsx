import React, {useEffect, useState} from "react";
import "./Cards.css";
// import { cardsData } from "../../Data/Data";
import axios from "axios";
import Card from "../Card/Card";
import { Space,Spin } from "antd";

import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
const Cards = () => {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    const func = async () => {
      setLoading(true)
      const response = await axios.get('https://a22-server-production.up.railway.app/countPayment');
      // alert(response.data.data[0]._id)
      if (response.data.status === 'ok') {
        setData([
          {
            title: response.data.data[0]._id,
            color: {
              backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
              boxShadow: "0px 10px 20px 0px #e0c6f5",
            },
            barValue: response.data.data[0].count / 1,
            value: 500*response.data.data[0].count,
            png: UilUsdSquare,
            series: [
              {
                name: "Sales",
                data: [31, 40, 28, 51, 42, 109, 100],
              },
            ],
          },
          {
            title: response.data.data[1]._id,
            color: {
              backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
              boxShadow: "0px 10px 20px 0px #FDC0C7",
            },
            barValue: Math.round(response.data.data[1].count / 6),
            value: 500*response.data.data[1].count,
            png: UilMoneyWithdrawal,
            series: [
              {
                name: "Revenue",
                data: [10, 100, 50, 70, 80, 30, 40],
              },
            ],
          },
        ])
        setLoading(false)
        // console.log(data)
      } else {
        alert("Error Loading Count")
      }
    }
    func()
  },[])
  return (

    <div className="Cards">
      {
        loading
        ?
        <>
        <Space>
          <Spin tip="Loading..." size="large">
          </Spin>
        </Space>
        </>
        :(<>
        {data.map((card, id) => {
          return (
            <div className="parentContainer" key={id}>
              <Card
                title={card.title}
                color={card.color}
                barValue={card.barValue}
                value={card.value}
                png={card.png}
                series={card.series}
              />
            </div>
          );
        })}
        </>)
    }
    </div>
  );
};

export default Cards;
