import styled from '@emotion/styled'

export const ArticleShortS = styled.div(`
  margin-bottom: 60px;
`)

export const ArticleContent = styled.div<{ bg?: string }>(
  ({ bg }) => `
  position: relative;
  @media(max-width: 960px) {
    background-color: ${(bg === 'yellow' && '#F0BD13') || (bg === 'purple' && '#67113F') || (bg === 'red' && '#C71147')};
    padding: 30px 15px;
    margin-top: -20px;
  }
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
      @media(max-width: 960px) {
        display: none;
      }
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
