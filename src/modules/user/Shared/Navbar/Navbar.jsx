import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from "@mui/material";
import { ShoppingCart, Menu } from "@mui/icons-material";
import Logo from "../../../../assets/opal-logo.svg";
import LogoFirst from "../../../../assets/logoFooter.png";
import Cart from "../shoppingCart/shoppingCart";
import SelectLanguage from "../../../../components/shared/Lnaguage/SelectLanguage";
import useGetLanguage from "../../../../hooks/useGetLanguage";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();
  const language = useGetLanguage();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const navItems = [
    { name: t("Home"), link: "/" },
    { name: t("store"), link: "/shop" },
  ];

  // ✅ التحكم في تغيير لون الخلفية عند التمرير
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        background: isScrolled
          ? "rgba(255, 255, 255, 0.9)"
          : "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        color: "#333",
        boxShadow: isScrolled ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
        transition: "background 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        px: 3,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {isMobile && (
          <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
            <Menu />
          </IconButton>
        )}

        <NavLink
          to="/"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <Box
            component="img"
            src={isScrolled ? Logo : Logo}
            sx={{ width: isMobile ? 100 : 140, height: 40, cursor: "pointer" }}
            alt="Opal Ladies Wear Logo"
          />
        </NavLink>

        {!isMobile && (
          <Box sx={{ display: "flex", gap: "20px" }}>
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.link}
                style={{
                  color: isScrolled ? "black" : "black",
                  fontWeight: "bold",
                  textDecoration: "none",
                  transition: "color 0.3s",
                  fontSize: "18px",
                }}
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                {item.name}
              </NavLink>
            ))}
          </Box>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {!isMobile && <SelectLanguage />}
          <IconButton onClick={() => setCartOpen(true)}>
            <ShoppingCart sx={{ color: isScrolled ? "black" : "black" }} />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Drawer for Mobile Nav */}
      <Drawer
        anchor={language === "ar" ? "right" : "left"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <NavLink
            to="/shop"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <Box
              component="img"
              src={Logo}
              sx={{
                width: isMobile ? 100 : 140,
                height: 40,
                cursor: "pointer",
              }}
              alt="Opal Ladies Wear Logo"
            />
          </NavLink>
          <List>
            {navItems.map((item, index) => (
              <ListItem button key={index} onClick={handleDrawerToggle}>
                <NavLink
                  to={item.link}
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={handleDrawerToggle}
                >
                  <ListItemText
                    primary={item.name}
                    sx={{ textAlign: "right" }}
                  />
                </NavLink>
              </ListItem>
            ))}
          </List>
          <SelectLanguage />
        </Box>
      </Drawer>

      {/* Drawer for Shopping Cart */}
      <Drawer
        anchor={language === "en" ? "left" : "right"}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      >
        <Cart isScrolled={isScrolled} closeCart={setCartOpen} />
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
