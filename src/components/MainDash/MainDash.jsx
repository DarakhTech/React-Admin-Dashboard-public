import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import Dashtable from '../TablePage/TablePage'
import "./MainDash.css";
const MainDash = ({selectedOption}) => {
  switch (selectedOption){
    case 1:{
      return (
      <div className="MainDash">
        <Dashtable />
      </div>
    );
    }
    default:{
      return (
      <div className="MainDash">
        <h1>Dashboard</h1>
        <Cards />
        <Table />
      </div>
    );
    }
  }
};

export default MainDash;
