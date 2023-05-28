export const paragraph = (theme: any) => ({
  a: {
    position: "relative",
    color: "inherit",
    textDecoration: "none",
    transition: "all .2s ease",
    "&:after": {
      content: "''",
      display: "block",
      width: "100%",
      height: "1px",
      background: theme.palette.primary.main,
      position: "absolute",
      bottom: "0px",
      left: 0,
    },
    "&:hover":{
      color: theme.palette.primary.main,
    },
  }
})