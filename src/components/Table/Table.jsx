import React,{useEffect, useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import axios from "axios";

import { Space,Spin } from "antd";
function createData(name, trackingId, status) {
  return { name, trackingId, status };
}

const rows = [
  createData("Lasania Chiken Fri", 10,  "Approved"),
  createData("Big Baza Bang ", 10,  "Pending"),
  createData("Mouth Freshner", 10,  "Approved"),
  createData("Cupcake", 10,  "Delivered"),
  createData("Big Baza Bang ", 10,  "Pending"),
  createData("Mouth Freshner", 10,  "Approved"),
  createData("Big Baza Bang ", 10,  "Pending"),
  createData("Mouth Freshner", 10,  "Approved"),
  createData("Big Baza Bang ", 10,  "Pending"),
  createData("Mouth Freshner", 10,  "Approved"),
  createData("Big Baza Bang ", 10,  "Pending"),
  createData("Mouth Freshner", 10,  "Approved"),
  createData("Big Baza Bang ", 10,  "Pending"),
  createData("Mouth Freshner", 10,  "Approved"),
];


const makeStyle=(status)=>{
  if(status === 'Approved')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'Pending')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function BasicTable() {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    const func = async () => {
      setLoading(true)
      const response = await axios.get('http://localhost:8000/getCashData');
      // alert(response.data.data[0]._id)
      if (response.data.status === 'ok') {
        setData(response.data.data)
        setLoading(false)
      } else {
        alert("Error Loading Count")
      }
    }
    func()

  },[])
  return (
    <div>
    {
      loading
      ?
      <>
        <Space>
          <Spin tip="Loading..." size="large">
          </Spin>
        </Space>
      </>
      :
      <>
      <h3>Recent Orders</h3><div className="Table" style={{ height: "400px", overflow: "auto" }}>
            <TableContainer
              component={Paper}
              style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">Count</TableCell>
                    <TableCell align="left">Amount</TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ color: "white" }}>
                  {data.map((row) => (
                    <TableRow
                      key={row._id.uploader}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row._id.uploader}
                      </TableCell>
                      <TableCell align="left">{row.count}</TableCell>
                      <TableCell align="left">{row.count * 500}</TableCell>
                      <TableCell align="left">
                        <span className="status" style={makeStyle("Pending")}>
                          Pending
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          </>

    }
    </div>
  
  );
}
