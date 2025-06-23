export const styles = {
  container: {
    p: { xs: 2, sm: 3 },
    backgroundColor: "#fff",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease-in-out",
    width: { xs: "100%", sm: "auto" },
    // maxWidth: 300,
    // m: { xs: "0 auto", sm: 0 },
    height: "100vh",
    overflow: "auto",
  },
  filterHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: {
      xs: "space-between",
      md: "center",
    },
  },
  title: {
    fontWeight: 700,
    mb: 2,
    textAlign: "center",
    color: "primary.main",
  },
  sectionTitle: {
    mt: 3,
    fontWeight: 600,
    color: "text.secondary",
  },
  slider: {
    color: "primary.main",
    mt: 1,
    mb: 3,
    width: { xs: "95%", sm: "100%" },
  },
  colorChip: (selectedColor, color) => ({
    backgroundColor: color,
    width: 30,
    height: 30,
    borderRadius: "50%",
    cursor: "pointer",
    border:
      selectedColor === color ? "2px solid #000" : "1px solid transparent",
    transition: "border 0.3s",
    "&:hover": {
      border: "2px solid #000",
    },
    mb: 1,
  }),
};
