import styled from "@emotion/styled";
import { candal } from "styles/typography/baseHead";

export const LineupS = styled.div<{paddingTop?: boolean; hp: boolean}>(({theme, paddingTop, hp}) => `
  text-align: center;
  margin-bottom: 120px;
  padding-top: ${paddingTop ? "40px" : "0"};
  h3{
    margin-bottom: 30px;
  }
  .events-list{
    margin-bottom: 60px;
    li{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30px 15px;
      border-bottom: 4px dotted #5a5a5a;
      &:first-of-type{
        border-top: 4px dotted #5a5a5a;
      }
      &.select-all-wrap{
        border-top: none;
        > div{
          padding-left: 13px;
        }
      }
      > div{
        display: flex;
        align-items: center;
        &:first-of-type{
          &.obsazeno{
            position: relative;
            opacity: .3;
            &:after{
              content: '';
              display: block;
              width: 100%;
              height: 100%;
              position: absolute;
              z-index: 500;
            }
          }
        }
      }
      .status {
        display: block;
        width: 16px;
        min-width: 16px;
        height: 16px;
        border: solid 3px rgba(217, 41, 28, 0.38);
        background-color: ${theme.palette.primary.main};
        border-radius: 50%;
        margin-right: 15px;
      }
      time{
        font-size: 18px;
        color: #f5eceb;
        white-space: nowrap;
        line-height: 1.5;
        margin-right: 20px;
      }
      p{
        margin: 0;
        font-size: 18px;
        font-family: ${candal.style.fontFamily};
        width: 100%;
        line-height: 1.11;
        text-align: left;
      }
      .icon-type{
        margin-right: 30px;
        display: flex;
      }
      .lineup-title{
        transition: all .2s ease;
        color: white;
        text-decoration: none;
        &:hover{
          color: ${theme.palette.primary.main};
        }
      }
      .state{
        border: 2px solid green;
        border-radius: 20px;
        padding: 2px 13px;
        font-size: 18px;
        &.obsazeno {
          border-color: red;
        }
      }
    }
  }
  ${theme.breakpoints.down("md")} {
    .events-list li {
      padding: 12px 5px;
      .icon-type{
        margin-right: 10px;
      }
      > div:first-of-type{
        flex-wrap: ${hp ? "wrap" : "nowrap"};
        width: 100%;
        time{
          font-size: 15px;
          width: 100%;
          text-align: left;
        }
        p{
          font-size: 15px;
          display: inline-block;
        }
      }
    }
  }
`)