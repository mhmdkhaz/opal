export const Styles = (language) => ({
  container: {
    backgroundColor: "#792A86",
    color: "#fff",
    pt: 5,
    pb: 3,
    borderTop: "1px solid #000",
  },
  text: {
    color: "#D3D3D3",
    mt: 2,
    fontWeight: 400,
    fontSize: { xs: "14px", md: "16px" },
    lineHeight: "24px",
    maxWidth: "25ch",
  },
  sectionTitle: {
    fontWeight: "bold",
    mb: 2,
    fontSize: { xs: "16px", md: "18px" },
    color: "#fff",
  },
  payment: {
    color: "#9F9F9F",
    fontSize: { xs: "14px", md: "16px" },
    display: "block",
    mt: 1,
  },
  link: {
    color: "#9F9F9F",
    textDecoration: "none",
    fontSize: { xs: "14px", md: "16px" },
    display: "block",
    mt: 1,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  socialMedia: {
    display: "flex",
    justifyContent: { xs: "center", md: "flex-start" },
    gap: 2,
    mt: 2,
  },
  icons: {
    display: "flex",
    gap: 2,
  },
  icon: {
    backgroundColor: "#EAEBEC",
    borderRadius: "50%",
    color: "#7F848D",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#792A86",
    },
  },
  copyright: {
    mt: 5,
    textAlign: "center",
    color: "#fff",
    borderTop: "1px solid #000",
    py: 1.5,
    fontSize: { xs: "12px", md: "14px" },
  },
});
