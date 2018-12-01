import React,{Component} from 'react';
import { Carousel } from "antd-mobile";

import MyNavBar from "../components/Navbar";
import styles from "./styles/shopIndex.css";
import banner01 from "../assets/images/shopImages/shopbanner01.png";

import Classify01 from "../assets/images/shopImages/classify01.png";
import Classify02 from "../assets/images/shopImages/classify02.png";
import Classify03 from "../assets/images/shopImages/classify03.png";
import Classify04 from "../assets/images/shopImages/classify04.png";
import Classify05 from "../assets/images/shopImages/classify05.png";
import Classify06 from "../assets/images/shopImages/classify06.png";
import Classify07 from "../assets/images/shopImages/classify07.png";
import Classify08 from "../assets/images/shopImages/classify08.png";

import Thot from "../assets/images/shopImages/thot.png";
import GoodImg01 from "../assets/images/shopImages/goodimg01.png";

export default class shopIndex extends Component {
    constructor() {  
        super();  
        this.state = {

        };
      }

    
    render(){
        const {history} = this.props;
        const NavbarProps={
            history
        }
        return(
            <div>
                <style>
                    {`
                        
                    `}
                </style>
                <MyNavBar  {...NavbarProps}/>
                
                <div className={styles.main}>
                    {/*轮播*/}
                    <Carousel
                    autoplay={true}
                    infinite
                    dots={false}
                    TextareaItem={true}
                    selectedIndex={0}
                    >
                    <div style={{ display: 'inline-block', width: '100%',height: '3rem',borderRadius:".15rem",overflow:"hidden" }}>
                    <img
                        src={banner01}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top', height: '3rem'  }}
                    />
                    </div>
                    <div style={{ display: 'inline-block', width: '100%',height: '3rem',borderRadius:".15rem",overflow:"hidden" }}>
                    <img
                        src={banner01}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top', height: '3rem'  }}
                    />
                    </div>
                    
                    </Carousel>

                    {/*分类*/}
                    <div  className={styles.classifyBox}>
                        <div>
                            <div  className={styles.classifyIconBox}>
                                <img src={Classify01} alt=""/>
                            </div>
                            <p>加油卡</p>
                        </div>
                        <div>
                            <div  className={styles.classifyIconBox}>
                                <img src={Classify02} alt=""/>
                            </div>
                            <p>美妆护肤</p>
                        </div>
                        <div>
                            <div  className={styles.classifyIconBox}>
                                <img src={Classify03} alt=""/>
                            </div>
                            <p>家纺家居</p>
                        </div>
                        <div>
                            <div  className={styles.classifyIconBox}>
                                <img src={Classify04} alt=""/>
                            </div>
                            <p>服装箱包</p>
                        </div>
                        <div>
                            <div  className={styles.classifyIconBox}>
                                <img src={Classify05} alt=""/>
                            </div>
                            <p>日常百货</p>
                        </div>
                        <div>
                            <div  className={styles.classifyIconBox}>
                                <img src={Classify06} alt=""/>
                            </div>
                            <p>数码产品</p>
                        </div>
                        <div>
                            <div  className={styles.classifyIconBox}>
                                <img src={Classify07} alt=""/>
                            </div>
                            <p>地方特产</p>
                        </div>
                        <div>
                            <div  className={styles.classifyIconBox}>
                                <img src={Classify08} alt=""/>
                            </div>
                            <p>全部分类</p>
                        </div>
                        
                    </div>


                    <div className={styles.PlateTitle}>
                        <img className={styles.PlateTitleImg} src={Thot} />
                    </div>
                    <div className={styles.GoodsList}>
                        <div className={styles.GoodsItem}>
                            <img src={GoodImg01} alt=""/>
                            <div className={styles.GoodInfo}>
                                <p className={styles.GoodName}>这是商品的名字这是商品的名字这是商品的名字</p>
                                <p className={styles.GoodPrice}>¥9999.00</p>
                            </div>
                        </div>
                        <div className={styles.GoodsItem}>
                            <img src={GoodImg01} alt=""/>
                            <div className={styles.GoodInfo}>
                                <p className={styles.GoodName}>这是商品的名字这是商品的名字这是商品的名字</p>
                                <p className={styles.GoodPrice}>¥9999.00</p>
                            </div>
                        </div>
                        <div className={styles.GoodsItem}>
                            <img src={GoodImg01} alt=""/>
                            <div className={styles.GoodInfo}>
                                <p className={styles.GoodName}>这是商品的名字这是商品的名字这是商品的名字</p>
                                <p className={styles.GoodPrice}>¥9999.00</p>
                            </div>
                        </div>
                        <div className={styles.GoodsItem}>
                            <img src={GoodImg01} alt=""/>
                            <div className={styles.GoodInfo}>
                                <p className={styles.GoodName}>这是商品的名字这是商品的名字这是商品的名字</p>
                                <p className={styles.GoodPrice}>¥9999.00</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}