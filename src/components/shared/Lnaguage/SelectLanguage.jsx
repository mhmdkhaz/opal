import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// Import MUI components
import { Select, MenuItem, Box, Typography } from "@mui/material";

// Import asset images
import AR from "../../../assets/AR.svg";
import EN from "../../../assets/EN.svg";
import { useEffect } from "react";

const languages = [
  { code: "en", name: "English", flag: EN },
  { code: "ar", name: "العربية", flag: AR },
];

const Welcome = () => {
  const { i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  const changeLanguage = (event) => {
    const selectedLang = event.target.value;
    i18n.changeLanguage(selectedLang);
    document.documentElement.dir = selectedLang === "ar" ? "rtl" : "ltr";
  };

  useEffect(() => {
    const lan = localStorage.getItem("i18nextLng");
    document.documentElement.dir = lan === "ar" ? "rtl" : "ltr";
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box>
      <Select
        value={i18n.language}
        onChange={changeLanguage}
        displayEmpty
        sx={{
          width: 150,
          height: 40,
          background: "transparent",
          color: isScrolled ? "black" : "black",
          border: `1px solid ${isScrolled ? "black" : "white"}`,
          borderRadius: "8px",
        }}
      >
        {languages.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "black",
              }}
            >
              <Box
                component="img"
                src={lang.flag}
                alt={lang.name}
                sx={{ width: 24, height: 16 }}
              />
              <Typography>{lang.name}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default Welcome;
