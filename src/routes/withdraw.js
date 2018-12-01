import React,{Component} from 'react';
import { List ,InputItem,Toast,Pagination,Radio} from "antd-mobile";
//  import IndexCSS from "../components/IndexCSS";
import MyNavBar from "../components/Navbar";
import styles from "./styles/withdraw.css";

import Ttixian from "../assets/images/ttixian.png";


import Alipay from "../assets/images/alipay.png";
import Wechat from "../assets/images/wechat.png";
import BankCard from "../assets/images/bankcard.png";
const Item=List.Item;

export default class Withdraw extends Component {
    constructor() {  
        super();  
        this.state = {
            checked:0
        };
      }
      onChange = (value) => {
        this.setState({
            checked:value
        });
      };
    
    render(){
        const {history} = this.props;
        const NavbarProps={
            history
        }
        return(
            <div>
                <style>
                    {`
                        .am-navbar-title{
                            font-size:.28rem;
                        }

                        /*调整input外观*/
                        .am-list-item.am-input-item {
                            height: .87rem;
                            padding-left: 0 !important;
                        }
                        .am-list-item{
                            height: auto;
                            min-height:.87rem;
                            padding:0;
                        }
                        
                        .am-list-content{
                            font-size: .26rem !important;
                            color:#333333 !important;
                            margin-right: .30rem !important;
                            line-height:.87rem;
                        }
                        .am-input-label{
                            font-size: .26rem !important;
                            color:#333333 !important;
                            margin-right: .30rem !important;
                            line-height:.87rem;
                        }
                        .am-list-item .am-input-control input{
                            font-size: .26rem !important;
                            line-height:.87rem;
                        }
                        .am-input-label {
                            width:1.7rem !important;
                        }
                        .am-list-item .am-list-line .am-list-extra{
                            flex-basis: 60%;
                            font-size: .26rem;
                        }
                        .am-image-picker-list .am-image-picker-item .am-image-picker-item-remove{
                            width:.25rem;
                            height:.25rem;
                            background-size: 100% 100%;
                        }
                        .am-list-body::after{
                                visibility: hidden;
                        }
                        .am-list-item .am-list-line .am-list-arrow{
                            height:.35rem;
                        }





                        .am-icon{
                            width:.50rem;
                            height:.50rem;
                        }
                        .am-toast-text-info{
                            font-size:.26rem;
                            line-height:.52rem;
                        }
                        .am-toast-notice-content .am-toast-text.am-toast-text-icon {
                            border-radius: .15rem;
                            padding: .25rem .15rem ;
                        }


                        .am-radio{
                            height:.35rem;
                            width:.35rem;
                            border: 2px solid #999;
                            border-radius: 50%;
                        }
                        .am-radio-inner{
                            height:.35rem;
                            width:.35rem;
                        }
                        .am-radio-inner:after{
                            width: .1rem;
                            height: .2rem;
                            top:.05rem;
                            right:.1rem
                        }
                        
                        
                    `}
                </style>
                <MyNavBar  {...NavbarProps}/>
                
                <div className={styles.main}>
                    {/*板块B*/}
                    <div className={styles.Plate}>
                        <div className={styles.PlateBodyB}>
                            <div className={styles.PlateBodyBImg}>
                                <p>我的瓜子币</p>
                                <p  className={styles.PlateBodyBSum}>1,000,000.00</p>
                            </div>
                            
                            <List className={styles.PlateBodyBList}>
                            <InputItem
                                className={styles.ListItem}
                                type='number'
                                clear
                                placeholder="500以上且为100的倍数"
                                ref={el => this.autoFocusInst = el}
                            >提现数量</InputItem>
                            <InputItem
                                className={styles.ListItem}
                                type='password'
                                clear
                                placeholder="请输入交易密码"
                                ref={el => this.customFocusInst = el}
                            >交易密码</InputItem>
                            <Item>提现方式</Item>
                            <div className={styles.TiWay}>
                                <div onClick={()=>this.onChange(0)}>
                                    <Radio className="my-radio" checked={this.state.checked====0} onChange={e => console.log('checkbox', e)}/>
                                    <img  className={styles.WayImg} src={Alipay} alt=""/>
                                </div>
                                <div onClick={()=>this.onChange(1)}>
                                    <Radio className="my-radio" checked={this.state.checked====1} onChange={e => console.log('checkbox', e)}/>
                                    <img  className={styles.WayImg} src={Wechat} alt=""/>
                                </div>
                                <div onClick={()=>this.onChange(2)}>
                                    <Radio className="my-radio" checked={this.state.checked====2} onChange={e => console.log('checkbox', e)}/>
                                    <img  className={styles.WayImg} src={BankCard} alt=""/>
                                </div>
                                
                            </div>


                            </List>


                            <div className={styles.PlateBodyBBtnDiv}>
                            <a className={styles.PlateBodyBBtn}>确定</a>
                            </div>
                        </div>
                    </div>


                    {/*板块D*/}
                    <div className={styles.Plate}>
                        <div className={styles.PlateTitle}>
                        <img className={styles.PlateTitleImg} src={Ttixian} />
                        </div>
                        <div className={styles.PlateBodyD}>
                    
                            <div className={styles.DItem}>
                                <div className={styles.DItemLeft}>
                                <p><span className={styles.DInfoName}>提现至</span><span>微信</span></p>
                                <p><span className={styles.DInfoName}>数量</span><span>500MSC</span></p>
                                <p><span className={styles.DInfoName}>状态</span><span>审核中</span></p>
                                <p><span className={styles.DInfoName}>时间</span><span>2018-5-05 12:30</span></p>
                                </div>
                            </div>
                        </div>
                        <Pagination total={5}
                        className={styles.Pag}
                        current={1}
                        locale={{
                            prevText: (<span className="arrow-align">上一页</span>),
                            nextText: (<span className="arrow-align">下一页</span>),
                        }}
                        />
                    </div>
          
                </div>


            </div>
        )
    }
}