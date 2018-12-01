import React, { Component } from 'react';
import { Carousel, PullToRefresh, NavBar, SearchBar } from "antd-mobile";
import * as fetchs from '../utils/fetch';
// import Titleing from "../assets/images/title.png";
import { routerRedux } from 'dva';
import $ from "jquery";
// import ReactDOM from 'react-dom';
import GoBack from "../assets/images/goback.png";
import styles from "./styles/shopIndex.css";
import iconStyle from "./styles/font.css";
import banner01 from "../assets/images/shopImages/shopbanner01.png";

// import Classify01 from "../assets/images/shopImages/classify01.png";
// import Classify02 from "../assets/images/shopImages/classify02.png";
// import Classify03 from "../assets/images/shopImages/classify03.png";
// import Classify04 from "../assets/images/shopImages/classify04.png";
// import Classify05 from "../assets/images/shopImages/classify05.png";
// import Classify06 from "../assets/images/shopImages/classify06.png";
// import Classify07 from "../assets/images/shopImages/classify07.png";
// import Classify08 from "../assets/images/shopImages/classify08.png";

import Thot from "../assets/images/shopImages/class.png";
// import GoodImg01 from "../assets/images/shopImages/goodimg01.png";


// function genData() {
//     const dataArr = [];
//     for (let i = 0; i < 20; i++) {
//       dataArr.push(i);
//     }
//     return dataArr;
//   }


export default class shopIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
            data: [],
            value: '',
            classData: [],
            goodsdata: []
        };
    }


    componentDidMount() {
        // setTimeout(() => this.setState({
        //   data: genData(),
        // }), 0);
        $("#ListBox").on("scroll", function () {

            var scroll_offset = $("." + styles.PlateTitle).offset();

            if ($(this).scrollTop() >= 50) {
                $("body,html").scrollTop(scroll_offset.top);
                // $("body,html").animate({scrollTop:scroll_offset.top});
            } else {
                // $("body,html").animate({scrollTop:0});
                $("body,html").scrollTop(0)
            }

        })
        const goodsid = this.props.location.search.replace("?classid=", "");
        //获取商品列表
        const shopdata = {
            page: 1,
            size: 10,
            cate_id: goodsid,
        }
        //console.log("post", shopdata)
        fetchs.creat_Token(fetchs.APIHost + "/goods", fetchs.getAuth("/goods"), JSON.stringify(shopdata)).then(response => response.json())
            .then(json => {
                //console.log("商品", json)
                this.setState({ goodsdata: json.data.items })
            });
    }

    onSearchChange = (value) => {
        this.setState({ value });
    };
    clear = () => {
        this.setState({ value: '' });
    };
    handleClick = () => {
        this.manualFocusInst.focus();
    }
    render() {

        const goodsdata = this.state.goodsdata;
        
        const { history, dispatch } = this.props;
        // const NavbarProps={
        //     history
        // }
        return (
            <div>
                <style>
                    {`
                        .am-pull-to-refresh-indicator{
                            font-size:.26rem;
                        }
                        .am-pull-to-refresh-content-wrapper{
                            margin-bottom:2rem;
                        }
                        .am-navbar-left-icon{
                            color:#FFFFFF;
                        }
                        .am-navbar-right{
                            color:#FFFFFF;
                        }
                        .am-search{
                            height:100%;
                        }
                        .am-search-input{
                            height:0.6rem;
                        }
                        .am-search-input .am-search-synthetic-ph{
                             line-height:0.5rem;
                             font-size:.38rem;
                        }
                        .am-search-input input[type="search"]{
                            height:0.6rem;
                            line-height:0.6rem;
                            font-size:.32rem;
                            padding-left:.3rem;
                            color:#a7a8aa;
                        }
                        .am-search.am-search-start .am-search-input input[type="search"]{
                            padding: 0 28px 0 .3rem;    
                        }
                        .am-search-cancel{
                            font-size:0.28rem;
                        }
                        .am-search-input .am-search-clear{
                            width:.32rem;
                            height:.32rem;
                            padding:0.15rem;
                            background-size:0.3rem 0.3rem;
                        }
                       


                    `}
                </style>
                <NavBar
                    style={{ height: "7vh", background: "#00a3f0", color: "red" }}
                    mode="light"
                    icon={
                        <img src={GoBack} style={{ height: ".38rem" }} alt=""></img>
                        }
                        onLeftClick={() => history.goBack()}
                    rightContent={
                        [<div onClick={() => history.push("/cart")} key={"3"}>
                            <span className={iconStyle.iconfont} style={{ fontSize: "0.3rem", lineHeight: '7vh', marginRight: "0.1rem" }}>
                                &#xe606;
                            </span>
                            <span style={{ fontSize: "0.3rem", lineHeight: '7vh' }}>购物车</span>
                        </div>
                        ]
                    }
                >


                    <span style={{ fontSize: "0.4rem", color: "#FFFFFF" }}>
                        类别
                    </span>
                </NavBar>

                <div className={styles.main}>
                    {/*轮播*/}
                    {/* <Carousel
                        autoplay={true}
                        infinite
                        dots={false}
                        TextareaItem={true}
                        selectedIndex={0}
                    >
                        <div style={{ display: 'inline-block', width: '100%', height: '3rem', borderRadius: ".15rem", overflow: "hidden" }}>
                            <img
                                src={banner01}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top', height: '3rem' }}
                            />
                        </div>
                        <div style={{ display: 'inline-block', width: '100%', height: '3rem', borderRadius: ".15rem", overflow: "hidden" }}>
                            <img
                                src={banner01}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top', height: '3rem' }}
                            />
                        </div>

                    </Carousel> */}
                    
                   


                    <div className={styles.PlateTitle}>
                        <img className={styles.PlateTitleImg} src={Thot} alt="" />
                    </div>



                    <PullToRefresh id="ListBox"
                        ref={el => this.ptr = el}
                        style={{
                            height: "100vh",
                            width: "100%",
                            overflow: 'auto',
                        }}
                        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                        direction="up"
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({ refreshing: true });
                            setTimeout(() => {
                                this.setState({ refreshing: false });
                            }, 1000);
                        }}
                    >
                        <div className={styles.GoodsList} style={{ zIndex: 9999 }}>
                            {goodsdata.map(function (i, index) {
                                return <div className={styles.GoodsItem} onClick={() => history.push("/gooddetail?id=" + i.id)} key={index}>
                                    <img src={fetchs.APIHost + i.goods_pic} alt="" />
                                    <div className={styles.GoodInfo}>
                                        <p className={styles.GoodName}>{i.goods_name}</p>
                                        <p className={styles.GoodPrice}>¥{i.sales}</p>
                                        {/* <p className={styles.GoodPrice}>¥{i.goods_note}</p> */}
                                    </div>
                                </div>
                            })}
                        </div>
                    </PullToRefresh>
                </div>
              

            </div>
        )
    }
}