import React  from 'react';
import { NavBar } from "antd-mobile";
import GoBack from "../assets/images/goback.png";
import PropTypes from 'prop-types';

const MyNavbar = ({history,name}) => {
  return (
    <div>
      <style>
      {`
      .am-navbar-left {
        padding-left: .4rem;
      }
      .am-navbar-light .am-navbar-title{
      	color:#ffffff;
      	font-size:0.34rem
      }
      `}
      </style>
      <NavBar
      style={{height:"7vh",background:"#00a3f0",color:"red"}}
      mode="light"
      icon={
        <img src={GoBack} style={{height:".38rem"}} alt=""></img>
      }
      onLeftClick={()=>history.goBack()}
      >
      {name}	
      </NavBar>
    </div>
  );
};

MyNavbar.propTypes = {
  history: PropTypes.any,
  name:PropTypes.any
}
export default MyNavbar;

