import styled from "@emotion/styled";

export const WinnersS = styled.section<{margin?: boolean}>(({margin = false}) => `
  margin-bottom: ${margin ? "130px" : "0"};
`)