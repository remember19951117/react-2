import React,{Component} from 'react';
import { Carousel, PullToRefresh, NavBar, SearchBar, Pagination} from "antd-mobile";
import * as fetchs from '../utils/fetch';
// import Titleing from "../assets/images/title.png";

 import $ from "jquery";


import styles from "./styles/shopIndex.css";
import iconStyle from "./styles/font.css";
import banner01 from "../assets/images/shopImages/shopbanner01.png";



import Thot from "../assets/images/shopImages/thot.png";
import GoodImg01 from "../assets/images/shopImages/goodimg01.png";


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
      value:'',
      classData:[],
     goodsdata:[],
     banner:''
    };
    }

    
    componentDidMount() {
        // setTimeout(() => this.setState({
        //   data: genData(),
        // }), 0);
        $("#ListBox").on("scroll",function () {
            
            var scroll_offset = $("."+styles.PlateTitle).offset();
            
            if ($(this).scrollTop()>=50) {
                $("body,html").scrollTop(scroll_offset.top);
                // $("body,html").animate({scrollTop:scroll_offset.top});
            }else{
                // $("body,html").animate({scrollTop:0});
                $("body,html").scrollTop(0)
            }
           
        })
        //获取分类列表
        fetchs.read_Token(fetchs.APIHost + "/goods/cate", fetchs.getAuth("/goods/cate")).then(response => response.json())
            .then(json => {
                //console.log("分类", json)
                this.setState({ classData: json.data })
        });
        //获取商品列表
        const shopdata ={
            page:1,
            size:10,
        }
        fetchs.read_Token(fetchs.APIHost + "/goods", fetchs.getAuth("/goods"), JSON.stringify(shopdata)).then(response => response.json())
            .then(json => {
                //console.log("商品", json)
                this.setState({ goodsdata: json.data.items})
        });
        //获取轮播图
        fetchs.read_Token(fetchs.APIHost + "/mallpic", fetchs.getAuth("/mallpic")).then(response => response.json())
            .then(json => {
                //console.log("轮播", json)
                this.setState({ banner:  json.data.length > 0?json.data[0].pic_name:'' })
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
    render(){
        
        const goodsdata = this.state.goodsdata;
        //console.log("dara", goodsdata);
        const { history, dispatch} = this.props;
        // const NavbarProps={
        //     history
        // }
        return(
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
                       
                          .arrow-align{
                              font-size:.26rem;
                          }
                          .am-flexbox .am-flexbox-item{
                            font-size:.26rem;
                            line-height:.26rem;
                          }

                    `}
                </style>
                <NavBar
                    style={{ height: "7vh", background: "#00a3f0", color: "red" }}
                    mode="light"
                    // icon={[
                    //     <div>
                    //         <span className={iconStyle.iconfont} style={{ fontSize: "0.3rem", lineHeight: '7vh' }}>
                    //             &#xe6a9;
                    //         </span>
                    //         <span style={{ fontSize: "0.3rem", lineHeight: '7vh' }}>上传商品</span>
                    //     </div>
                    //    ]
                    // }
                    rightContent={
                        [<div onClick={() => history.push("/cart")} key={"3"}>
                            <span className={iconStyle.iconfont} style={{ fontSize: "0.3rem", lineHeight: '7vh',marginRight:"0.1rem" }}>
                              &#xe606;
                            </span>
                            <span style={{ fontSize: "0.3rem", lineHeight: '7vh' }}>购物车</span>
                        </div>
                        ]
                    }
                >
                
                    
                    <span style={{ fontSize:"0.4rem",color:"#FFFFFF"}}>
                        商城
                    </span>
                </NavBar>
                
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
                                src={fetchs.APIHost+this.state.banner}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top', height: '3rem'  }}
                        />
                        </div>
                        <div style={{ display: 'inline-block', width: '100%',height: '3rem',borderRadius:".15rem",overflow:"hidden" }}>
                        <img
                                src={this.state.banner ? fetchs.APIHost + this.state.banner:''}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top', height: '3rem'  }}
                        />
                        </div>
                    
                    </Carousel>
                    <div className={styles.searchwrap}>
                        <SearchBar 
                        maxLength={8} 
                            value={this.state.value}
                            placeholder="请输入商品名称"
                            onSubmit={value => history.push("/classfysearch?classid=" + value)}
                            onClear={value => console.log(value, 'onClear')}
                            onFocus={() => console.log('onFocus')}
                            onBlur={() => console.log('onBlur')}
                            onCancel={() => alert('onCancel')}
                            showCancelButton
                            onChange={this.onSearchChange.bind(this)}
                        />
                    </div>
                    {/*分类*/}
                    <div  className={styles.classifyBox}>
                        {/* <div onClick={() => history.push("/classfy")}>
                            <div className={styles.classifyIconBox}>
                                <img src={Classify01} alt="" />
                            </div>
                            <p>种类</p>
                        </div> */}
                        {
                            this.state.classData.length > 0 ? this.state.classData.map(function (result,index) {
                                return <div onClick={() => history.push("/classfy?classid=" + result.id)} key={index}>
                                    <div className={styles.classifyIconBox}>
                                    <img src={fetchs.APIHost + result.cate_pic} alt="" />
                                    </div>
                                    <p>{result.cate_name}</p>
                                </div>
                            }):''
                        }
                    </div>
                    

                    <div className={styles.PlateTitle}>
                        <img className={styles.PlateTitleImg} src={Thot} alt=""/>
                    </div>
                    


                    <PullToRefresh id="ListBox"
                        ref={el => this.ptr = el}
                        style={{
                        height:"100vh",
                        width:"100%",
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
                    <div  className={styles.GoodsList} style={{zIndex:9999}}>
                            {goodsdata?goodsdata.map(function (i, index){
                                return <div className={styles.GoodsItem} onClick={() => history.push("/gooddetail?id=" + i.id)} key={index}>
                                    <img src={fetchs.APIHost + i.goods_pic} alt="" />
                                    <div className={styles.GoodInfo}>
                                        <p className={styles.GoodName}>{i.goods_name}</p>
                                        <p className={styles.GoodPrice}>¥{i.sales}</p>
                                        {/* <p className={styles.GoodPrice}>¥{i.goods_note}</p> */}
                                    </div>
                                </div>
                            }):""}
                    </div>
                    </PullToRefresh>
                    {/* <Pagination total={isNaN(Math.ceil(Number(this.state.data.total) / Number(this.state.data.per_page))) ? "1" : Math.ceil(Number(this.state.data.total) / Number(this.state.data.per_page))}
                        className={styles.Pag}
                        current={this.state.current}
                        onChange={(e) => this.ChgOrderPage(e)}
                        locale={{
                            prevText: (<span className="arrow-align">上一页</span>),
                            nextText: (<span className="arrow-align">下一页</span>),
                        }}
                    /> */}
                 </div>
                
                <div className={styles.nav}>
                    <ul className={styles.navlists}>
                        <li onClick={() => history.push("/index")}>
                            <p className={iconStyle.iconfont} style={{}}>&#xe626;</p>
                            <p>首页</p>
                        </li>
                        <li onClick={() => history.push("/ShopIndex")} className={styles.active}>
                            <p className={iconStyle.iconfont} style={{}}>&#xe624;</p>
                            <p>商城</p>
                        </li>
                        <li onClick={() => history.push("/Team")}>
                            <p className={iconStyle.iconfont} style={{ fontSize: "0.40rem" }}>&#xe61c;</p>
                            <p>团队</p>
                        </li>
                        <li onClick={() => history.push("/Profit")}>
                            <p className={iconStyle.iconfont} style={{ fontSize: "0.44rem" }}>&#xe757;</p>
                            <p>转账</p>
                        </li>
                        <li onClick={() => history.push("/Mine")}>
                            <p className={iconStyle.iconfont} style={{ fontSize: "0.40rem" }}>&#xe60d;</p>
                            <p>我的</p>
                        </li>
                    </ul>
                </div>

            </div>
        )
    }
}