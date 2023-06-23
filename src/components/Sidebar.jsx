import React, { useState } from 'react';
import './Sidebar.css';
import Logo from '../imgs/logo.png';
import { UilSignOutAlt } from '@iconscout/react-unicons';
import { SidebarData } from '../Data/Data';
import { UilBars } from '@iconscout/react-unicons';
import { motion } from 'framer-motion';

const Sidebar = ({ onSelectOption }) => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const sidebarVariants = {
    true: {
      left: '0',
    },
    false: {
      left: '-60%',
    },
  };

  const logout = () => {
    localStorage.removeItem('logintoken');
    document.location.href = '/login';
  };

  const handleOptionClick = (index) => {
    setSelected(index);
    onSelectOption(index);
  };

  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: '60%' } : { left: '5%' }}
        onClick={() => setExpanded(!expanded)}
      >
        <UilBars />
      </div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>SRC</span>
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                className={selected === index ? 'menuItem active' : 'menuItem'}
                key={index}
                onClick={() => handleOptionClick(index)}
              >
                <item.icon />
                <span>{item.heading}</span>
              </div>
            );
          })}
          {/* signoutIcon */}
          <div className="menuItem">
            <UilSignOutAlt onClick={() => logout()} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
