import React,{Component} from 'react';
import { List, InputItem } from 'antd-mobile';
import styles from "./styles/login.css";

import LOGO from "../assets/images/LOGO.png";

export default class About extends Component {
    constructor() {  
        super();  
        this.state = {
            buyModal:false,
            selectPay:1
        };
      }

      render(){
        const {history}=this.props;
       // //console.log(this.props.match.params.type);
        const ShowVal=this.props.match.params.type;
        return(
            <div>
            <style>
              {`
                  .am-list-item.am-input-item{
                      height:.8rem;
                      margin-bottom:10px;
                      background-color: #4783a8;
                      padding-left: .35rem;
                  }
                    .am-input-label{
                      font-size: .26rem !important;
                      color:#FFFFFF !important;
                      margin-right: .30rem !important;
                    }
                    .am-list-item .am-input-control input{
                      font-size: .26rem !important;
                      color:#FFFFFF;
                    }
                    .am-list-body::before{
                      visibility: hidden;
                    }
                    .am-list-line{
                      border: none !important;
                    }
                    .am-list-line::after{
                      visibility: hidden;
                    }
                    .am-list-body{
                      border: none !important;
                      background: none;
                    }
              `}
        </style>
            <div className={styles.main} style={{height:"auto",minHeight:"100vh"}}>
                <img className={styles.logo} src={LOGO} alt=""/>
                <p className={styles.name}>MSC瓜子钱包</p>
                <p className={styles.englishName}>PANPAN SEED MONEY</p>


                <div  className={styles.textBox} style={{display:ShowVal=="new"?"block":"none"}}>
                <p style={{textIndent:"0",marginBottom:"1em"}}>新手礼包:</p>

                <p>1、新手注册即赠送5瓜子币!</p>
                <p>2、新手注册即赠送5瓜子币!</p>
                <p>3、新手注册即赠送5瓜子币!</p>
                </div>


                <div  className={styles.textBox} style={{display:ShowVal=="about"?"block":"none"}}>
                <p style={{textIndent:"0",marginBottom:"1em"}}>平台简介:</p>
                <p>盼盼瓜子币(MSC)由盼盼(中国)农业科技有限公司发行，瓜子币(MSC)以其全新独特的模式，将颠覆各种投资模式，总发行量5000万枚，永不增发，分3年发行完毕，上线发行价为1元人民币认购1枚瓜子币(MSC)，最低认购500枚，2018年第一期发行2000万枚，2019年至2020年发行完剩余3000万枚。  </p>
                <p>现在是是数字货币投资，数字中国，数字社区，数字资产只有通过物联网，区块链，云计算大数据能实现。特殊的平台，特殊的项目，你悟懂了吗？改变思维，快速行动，早日实现自己的财富梦想，把那些还在徬徨，还在迷茫的家人们一起带进来实现他们的财富梦想。选择投资盼盼瓜子币(MSC)，实现3个月河东，3个月河西的新篇章，买到就是赚到，赶紧行动吧！</p>
                </div>

                <div  className={styles.textBox} style={{display:ShowVal=="safe"?"block":"none"}}>
                <p style={{textIndent:"0",marginBottom:"1em"}}>权益保障:</p>
                <p style={{textIndent:"0"}}>静态收益:</p>
                <p>1.持有(MSC)500枚日收益约1‰；持有2000枚日收益约1.5‰；持有5000枚日收益约2‰；持有(MSC)10000枚日收益约2.5‰，持有50000枚日收益约3‰，</p>
                <p>2.通过考核自己日收益和上一代日收益两个数值，可拿上一代推荐人日收益的30%，或者拿自己日收益的20%，按最小值算。（例：自己日收益1000枚，上级日收益是5000枚，你就拿自己日收益的20%；自己日收益5000枚，上级日收益是1000枚，你就拿上级收益的30%。</p>
                <p style={{textIndent:"0"}}>动态收益：</p>
                <p>1、动态收益直推奖，每直推一位伙伴，可以获得这位伙伴投资额的3%作为直推奖励。</p>
                <p>2、动态收益领导奖，直接推荐5个人，个人持币量1000枚以上，而且团队持有量达到5万枚，可拿团队1代每天收益的10%；直接推荐10个人，个人持币量1000枚以上，而且团队持有量达到10万枚，可拿团队1代每天收益的15%，依此类推。</p>
                <p>3、动态收益绩效奖，自己持有5000枚可拿团队第1代每天收益的1%；自己持有10000枚可拿团队第1代、第2代每天收益的1.5%；自己持有(MSC)50000枚可拿团队第1代、第2代、第3代每天收益的2%；</p>
                </div>
                
            </div>
        </div>
        )
      }
    }