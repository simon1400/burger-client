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
      border-bottom: 4px dotted grey;
      &:first-of-type{
        border-top: 4px dotted grey;
      }
      > div{
        display: flex;
        align-items: center;
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
      }
    }
  }
  ${theme.breakpoints.down("md")} {
    .events-list li {
      padding: 12px 5px;
      .icon-type{
        margin-right: 10px;
      }
      > div:first-child{
        flex-wrap: ${hp ? "wrap" : "nowrap"};
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