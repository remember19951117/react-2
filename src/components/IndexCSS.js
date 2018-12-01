import React from 'react';

const IndexCSS = () => {
  return (
    <style>

        {`
        body{
          background:#FFFFFF;
        }
        .am-navbar-left{
          padding-left: .4rem;
        }
        .v-item{
          height:.28rem;
          overflow:hidden; 
          text-overflow:ellipsis;
          display:-webkit-box; 
          -webkit-box-orient:vertical;
          -webkit-line-clamp:1; 
        }


        
        .am-input-label{
          font-size: .26rem !important;
          color:#333333 !important;
          margin-right: .30rem !important;
        }
        .am-list-item .am-input-control input{
          font-size: .26rem !important;
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
        }
        .my-drawer {
          position: relative;
          overflow: visible;
          -webkit-overflow-scrolling: touch;
        }
        .am-drawer-sidebar {
          background-color: #fff;
          overflow: auto;
          -webkit-overflow-scrolling: touch;
        }
        .am-drawer-sidebar .am-list-line::after{
          visibility: visible;
        }
        .am-drawer-sidebar .am-list-item .am-list-line .am-list-content {
          color:#333333;
          font-size: .26rem;
          line-height: .98rem;
          padding-top: 0;
          padding-bottom: 0;
        }
        .am-drawer-sidebar .am-list-item .am-list-thumb:first-child {
          margin-right: .30rem;
        }
        .am-drawer-sidebar .am-list-item img {
          width: auto;
          height: .40rem;
          vertical-align: middle;
        }
        .am-drawer-sidebar .am-list-item {
          padding-left: 0;
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



        .am-accordion-header{
          height:.98rem !important;
        }
        .am-accordion .am-accordion-item .am-accordion-header i{
          top:.415rem !important;
        }
        .am-accordion-header{
          padding-left:0 !important;
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
        `}
        
      </style>
  );
};


export default IndexCSS;
