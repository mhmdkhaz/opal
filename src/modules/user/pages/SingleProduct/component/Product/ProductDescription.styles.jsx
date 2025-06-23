import { height, maxHeight } from "@mui/system";

export const Styles = (language) => ({
  container: {
    textAlign: language === "en" ? "left" : "right",
    paddingTop: 10,
    borderTop: "1px solid #000",
    mb: 10,
  },
  contentImage: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row-reverse" },
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    paddingBottom: "20px",
  },
  imagesList: {
    display: "grid",
    flexDirection: { xs: "row", sm: "column" },
    gap: "10px",
    width: "100%",
    height: { xs: "auto", sm: "600px" },
    overflowY: { xs: "hidden", sm: "auto" }, // Disable vertical scroll on mobile
    overflowX: { xs: "auto", sm: "hidden" }, // Enable horizontal scroll on mobile
    whiteSpace: "nowrap",
    // change style scroll bar
    "&::-webkit-scrollbar": {
      width: "4px",
      height: "5px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f1f1f1",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#555",
    },
  },
  title: {
    fontSize: "42px",
    lineHeight: "60px",
    fontWeight: 400,
  },
  price: {
    mt: 1,
  },
  text: {
    color: "#000",
    marginTop: "16px",
    fontWeight: 400,
    lineHeight: "24px",
    maxWidth: "40ch",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  link: {
    color: "#9F9F9F",
    textDecoration: "none",
    fontSize: "16px",
    display: "block",
    marginTop: "5px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  socialMedia: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  icons: {
    display: "flex",
    gap: "10px",
  },
  icon: {
    backgroundColor: "#EAEBEC",
    borderRadius: "10px",
    color: "#333538",
  },
  copyright: {
    marginTop: "30px",
    textAlign: "center",
    color: "#666",
    borderTop: "1px solid #000",
    paddingTop: 1.5,
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
  imageItem: {
    cursor: "pointer",
    borderRadius: "8px",
    transition: "0.3s",
    width: "80px",
    height: "auto",
    border: "2px solid transparent",
    "&:hover": { border: "2px solid #1976d2" },
  },
  boxSize: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: { xs: "start", sm: "center" },
    gap: 1,
    mt: 1,
  },
  toggleSize: {
    bgcolor: "white",
    border: "1px solid #E0E0E0",
    "&.Mui-selected": {
      bgcolor: "#792A86",
      color: "white",
      borderColor: "#792A86",
    },

    "&.Mui-selected:hover": {
      bgcolor: "#792A86",
      color: "white",
      borderColor: "#792A86",
    },
  },
  toggleButton: {
    width: 35,
    height: 35,
    borderRadius: "50%",
    minWidth: "auto",
    padding: 0,
    mx: 1,
    border: "2px solid transparent",
    transition: "border 0.2s ease-in-out",
    "&:hover": {
      border: "2px solid gray",
    },
    "&.Mui-selected": {
      border: "2px solid black",
    },
  },
  quantityCart: {
    display: "flex",
    alignItems: "center",
    gap: 3,
  },
  quantity: {
    borderRadius: "7px",
    display: "flex",
    alignItems: "center",
    border: "1px solid #9F9F9F",
  },
  buttonCart: {
    my: 3,
    borderRadius: "7px",
    backgroundColor: "#792A86",
    color: "#fff",
    border: "1px solid #000",
    px: 2,
    py: 1,
    width: "300px",
    height: "50px",
  },
});
