export const Styles = {
  root: {
    backgroundColor: "#FCF8F3",
    mt: 10,
  },

  container: {
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textBox: {
    flex: 1,
    maxWidth: "400px",
    textAlign: "left",
  },
  description: {
    marginTop: "10px",
    color: "#555",
  },
  button: {
    backgroundColor: "#6B3EFF",
    color: "#fff",
    fontWeight: "bold",
    marginTop: "20px",
    "&:hover": {
      backgroundColor: "#4B2ECC",
    },
  },
  slide: {
    position: "relative",
    borderRadius: "8px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "450px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  overlay: {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrowButton: {
    backgroundColor: "#6B3EFF",
    color: "#fff",
    fontSize: "20px",
    minWidth: "50px",
    height: "50px",
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "#4B2ECC",
    },
  },
};
