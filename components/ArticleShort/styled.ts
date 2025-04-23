import styled from '@emotion/styled'

export const ArticleShortS = styled.div(
  ({ theme }) => `
  margin-bottom: 60px;
`,
)

export const ArticleContent = styled.div<{ bg?: string }>(
  ({ bg }) => `
  position: relative;
  ${bg === 'yellow' ? 'color: black;' : ''}
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
    ${bg === 'yellow' ? 'color: black;' : ''}
  }
  .short-content{
    margin-bottom: 30px;
    ${bg === 'yellow' ? 'color: black;' : ''}
  }
  a{
    text-decoration: none;
    ${bg === 'yellow' ? 'color: black;' : ''}
  }
`,
)
