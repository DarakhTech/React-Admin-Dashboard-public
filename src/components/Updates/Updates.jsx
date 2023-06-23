import React,{useEffect, useState} from "react";
import { Space, Spin } from 'antd';
import "./Updates.css";
// import { UpdatesData } from "../../Data/Data";
import axios from "axios";


const Updates = () => {
  const [data,setData]= useState([])
  const [loading,setLoading] = useState(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{
    const func = async () => {
      setLoading(true)
    const response = await axios.get('https://a22-server-production.up.railway.app/countEntries');
      if (response.data.status === 'ok') {
        setData(response.data.data)
        setLoading(false)
        // console.log(data)
      } else {
        alert("Error Loading Count")
      }
    }
    func()
  },[])
  
  return (
    <div className="Updates">
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
        {data.map((update) => {
            return (
              <div className="update">
                <span>Section {update._id}:{update.count}</span>
                {/* <div className="noti"> */}
                  {/* <div  style={{marginBottom: '0.5rem'}}>
                    <span>{update.name}</span>
                    <span> {update.noti}</span>
                  </div> */}
                    {/* <span>{update.time}</span> */}
                {/* </div> */}
              </div>
            );
          })}
        </>)
      }
      
    </div>
  );
};

export default Updates;
