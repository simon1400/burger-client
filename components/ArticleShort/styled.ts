import styled from '@emotion/styled'

export const ArticleShortS = styled.div(
  ({ theme }) => `
  margin-bottom: 60px;
`,
)

export const ArticleContent = styled.div(
  ({ theme }) => `
  position: relative;
  .article-bg{
    position: absolute;
    width: 100%;
    z-index: -1;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
    svg{
      width: 140%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      top: 50%;
    }
  }
  h2{
    margin-bottom: 30px;
  }
  .short-content{
    margin-bottom: 30px;
  }
  a{
    text-decoration: none;
  }
`,
)
