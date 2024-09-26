export const base = () => ({
  styleOverrides: {
    html: {
      overflowX: "hidden",
      WebkitTapHighlightColor: 'transparent'
    },
    body: {
      overflowX: "hidden",
      position: 'relative',
      minHeight: "100vh",
      fontSize: "16px",
      width: '100%',
      backgroundColor: "#ffffff",
      backgroundImage: "url('/img/background.jpeg')"
    }
  }
})