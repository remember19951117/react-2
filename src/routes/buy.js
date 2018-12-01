import React,{Component} from 'react';
import { List ,Modal ,InputItem} from "antd-mobile";
// import IndexCSS from "../components/IndexCSS";
import MyNavBar from "../components/Navbar";
import styles from "./styles/buy.css";
import ModalStyles from "./styles/buyModal.css";

import Tpassword from "../assets/images/tpassword.png";
import CancelIcon from "../assets/images/cancel.png";
// const Item=List.Item;


function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  }
export default class Buy extends Component {
    constructor() {  
        super();  
        this.state = {
            buyModal:false,
            selectPay:1
        };
      }


      showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
          [key]: true,
        });
      }
      onClose = key => () => {
        this.setState({
          [key]: false,
        });
      }
    
      onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
          return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
          e.preventDefault();
        }
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
                        .am-navbar-title{
                            font-size:.28rem;
                        }
                        .am-modal-transparent{
                            width:auto;
                          }
                          .am-modal-transparent .am-modal-content .am-modal-body {
                            padding: 0 ;
                          }
                          .am-modal-transparent .am-modal-content {
                            border-radius: 7px;
                            padding-top: 0;
                          }



                          .am-input-label{
                            font-size: .26rem !important;
                            color:#333333 !important;
                            margin-right: .30rem !important;
                          }
                          .am-list-item .am-input-control input{
                            font-size: .26rem !important;
                          }
                    `}
                </style>
                <MyNavBar  {...NavbarProps}/>
                
                <div className={styles.main}>
                    <div className={styles.banner}>

                    </div>
                    <div className={styles.List}>
                        <div className={styles.ListTitle}>
                            <img className={styles.ListTitleImg} src={Tpassword} />
                        </div>
                            {/*列表*/}
                        <div className={styles.ListItem} onClick={this.showModal('buyModal')}>
                            <div className={styles.ListItemTitle}>
                                <span>投资金额</span>
                                <span>日收益率</span>
                            </div>
                            <div className={styles.ListItemBody}>
                                <div className={styles.coinNum}>
                                    <span>500.00</span>
                                    <span>MSC</span>
                                </div>
                                <div className={styles.coinShouyi}>
                                    <span>1</span>
                                    <span>‰</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.ListItem} onClick={this.showModal('buyModal')}>
                            <div className={styles.ListItemTitle}>
                                <span>投资金额</span>
                                <span>日收益率</span>
                            </div>
                            <div className={styles.ListItemBody}>
                                <div className={styles.coinNum}>
                                    <span>500.00</span>
                                    <span>MSC</span>
                                </div>
                                <div className={styles.coinShouyi}>
                                    <span>1</span>
                                    <span>‰</span>
                                </div>
                            </div>
                        </div>




                    </div>
                </div>

                {/*买家信息弹窗*/}
        <Modal
        visible={this.state.buyModal}
        transparent
        styles={{width:"6.3rem"}}
        maskClosable={false}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      >
      <div className={ModalStyles.Plate}>
          <div className={ModalStyles.PlateTitle}>
            <img className={ModalStyles.PlateTitleImg} src={Tpassword} />
            <img className={ModalStyles.PlateTitleImg} src={CancelIcon} onClick={this.onClose('buyModal')}/>
          </div>
          <div className={ModalStyles.Platebody}>
          <div className={ModalStyles.xuanxiang}>
            <div className={this.state.selectPay==1?ModalStyles.SelectedPay:""} onClick={()=>this.setState({selectPay:1})}>
                瓜子币支付
            </div>
            <div className={this.state.selectPay==2?ModalStyles.SelectedPay:""} onClick={()=>this.setState({selectPay:2})}>
                现金支付
            </div>
                
          </div>
          <p style={{display:this.state.selectPay==1?"":"none"}}><span>我的瓜子币:</span><span>10000.00</span></p>
          <p><span>{this.state.selectPay==1?"瓜子币":"现金"}兑换MSC比例:</span><span>1:1</span></p>

          <List className={ModalStyles.PlateBodyBList}>
              <InputItem
                className={ModalStyles.ListItem}
                clear
                type='password'
                placeholder="请输入交易密码"
                ref={el => this.customFocusInst = el}
              >密码</InputItem>
          </List>
          <div className={ModalStyles.PlateBodyBBtnDiv}>
              <a className={ModalStyles.PlateBodyBBtn}>确定</a>
            </div>
          </div>
      </div>

        
      </Modal>

            </div>
        )
    }
}