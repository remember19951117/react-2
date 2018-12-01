import React from 'react';
import PropTypes from 'prop-types';
import styles from "./styles/tabBar.css";
import Tab4 from "../assets/Tab4.png";
import Tab41 from "../assets/Tab41.png"
import Tab3 from "../assets/Tab3.png";
import Tab31 from "../assets/Tab31.png"
import Tab2 from "../assets/Tab2.png";
import Tab21 from "../assets/Tab21.png"
import Tab1 from "../assets/Tab1.png";
import Tab11 from "../assets/Tab11.png";

const MyTabBar=({selectedTabBar,history}) =>{
  return(
    <div className={styles.tabBarAll}>
          <div className={styles.tabBarItem} onClick={()=>history.push('/')}>
            <div className={styles.tabBarItemBG} style={{visibility:selectedTabBar=='home'?'visible':'hidden'}}>
            </div>
            <div className={styles.tabBarItemInfo}>
              <img className={styles.tabBarItemInfoIcon} src={selectedTabBar=='home'?Tab11:Tab1}></img>
              <span className={selectedTabBar=='home'?styles.tabBarItemInfoTextActive:styles.tabBarItemInfoText}>首页</span>
            </div>
          </div>
          <div className={styles.tabBarItem} onClick={()=>history.push('/classify')}>
            <div className={styles.tabBarItemBG} style={{visibility:selectedTabBar=='classify'?'visible':'hidden'}}>
            </div>
            <div className={styles.tabBarItemInfo}>
              <img className={styles.tabBarItemInfoIcon} src={selectedTabBar=='classify'?Tab21:Tab2}></img>
              <span className={selectedTabBar=='classify'?styles.tabBarItemInfoTextActive:styles.tabBarItemInfoText}>分类</span>
            </div>
          </div>
          <div className={styles.tabBarItem} onClick={()=>history.push('/cart')}>
            <div className={styles.tabBarItemBG} style={{visibility:selectedTabBar=='cart'?'visible':'hidden'}}>
            </div>
            <div className={styles.tabBarItemInfo}>
              <img className={styles.tabBarItemInfoIcon} src={selectedTabBar=='cart'?Tab31:Tab3}></img>
              <span className={selectedTabBar=='cart'?styles.tabBarItemInfoTextActive:styles.tabBarItemInfoText}>购物车</span>
            </div>
          </div>
          <div className={styles.tabBarItem} onClick={()=>history.push('/mine')}>
            <div className={styles.tabBarItemBG} style={{visibility:selectedTabBar=='mine'?'visible':'hidden'}}>
            </div>
            <div className={styles.tabBarItemInfo}>
              <img className={styles.tabBarItemInfoIcon} src={selectedTabBar=='mine'?Tab41:Tab4}></img>
              <span className={selectedTabBar=='mine'?styles.tabBarItemInfoTextActive:styles.tabBarItemInfoText}>我的</span>
            </div>
          </div>
	      </div>
  )
}
MyTabBar.propTypes = {
  data: PropTypes.any,
  goDetail: PropTypes.any
}
export default MyTabBar