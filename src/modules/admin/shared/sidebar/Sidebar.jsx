import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
  Box,
  Divider,
  useTheme,
  IconButton,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Dashboard as DashboardIcon,
  TableView as TablesIcon,
  Receipt as BillingIcon,
  Translate as RTLIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import {
  SidebarHeader,
  StyledListItemButton,
  StyledListItemIcon,
  LogoutListItemButton,
  LogoutListItemIcon,
  BottomDivider,
  drawerStyles,
  SidebarSectionTitle,
} from "./Sidebar.styles";
import logo from "../../../../assets/opal-logo.svg";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [openDropdown, setOpenDropdown] = useState({
    interface: false,
    indexes: false,
    product: false,
  });

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const dropdownItems = [
    {
      key: "interface",
      title: "تعديل واجهات الموقع",
      icon: <TablesIcon />,
      children: [{ text: "الصور المتحركة", path: "/admin/interface" }],
    },
    {
      key: "indexes",
      title: "الفهارس",
      icon: <BillingIcon />,
      children: [
        { text: "الالوان", path: "/admin/indexes" },
        { text: "الاصناف", path: "/admin/indexes/categorie" },
        { text: "الاحجام", path: "/admin/indexes/sizess" },
      ],
    },
    {
      key: "product",
      title: "المنتجات",
      icon: <RTLIcon />,
      children: [
        { text: "عرض المنتجات", path: "/admin/product/" },
        { text: "اضافة منتج", path: "/admin/product/add" },
      ],
    },
  ];

  return (
    <Drawer variant="permanent" anchor="right" sx={drawerStyles}>
      <SidebarHeader>
        <Box
          component="img"
          src={logo}
          alt="OPAL Logo"
          sx={{ width: "70%", mb: 2 }}
        />
      </SidebarHeader>

      {/* <Divider sx={{ mx: 2 }} /> */}

      <List sx={{ py: 1 }}>
        <SidebarSectionTitle>الرئيسية</SidebarSectionTitle>

        <ListItem disablePadding>
          <StyledListItemButton
            onClick={() => navigate("/admin/main")}
            selected={location.pathname === "/admin/main"}
          >
            <StyledListItemIcon>
              <DashboardIcon />
            </StyledListItemIcon>
            <ListItemText primary="الطلبات" />
          </StyledListItemButton>
        </ListItem>

        <Divider sx={{ my: 2 }} />
        <SidebarSectionTitle>الإدارة</SidebarSectionTitle>

        {dropdownItems.map((item) => (
          <React.Fragment key={item.key}>
            <ListItem disablePadding>
              <StyledListItemButton onClick={() => toggleDropdown(item.key)}>
                <StyledListItemIcon>{item.icon}</StyledListItemIcon>
                <ListItemText primary={item.title} />
                {openDropdown[item.key] ? <ExpandLess /> : <ExpandMore />}
              </StyledListItemButton>
            </ListItem>

            <Collapse in={openDropdown[item.key]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pr: 3 }}>
                {item.children.map((child) => (
                  <ListItem
                    key={child.text}
                    disablePadding
                    onClick={() => navigate(child.path)}
                  >
                    <StyledListItemButton
                      selected={location.pathname === child.path}
                    >
                      <ListItemText
                        primary={child.text}
                        primaryTypographyProps={{
                          fontSize: "0.85rem",
                          sx: {
                            color:
                              location.pathname === child.path
                                ? theme.palette.primary.main
                                : theme.palette.text.primary,
                          },
                        }}
                      />
                    </StyledListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </List>

      <BottomDivider />

      <List>
        <SidebarSectionTitle>الحساب</SidebarSectionTitle>
        <ListItem disablePadding>
          <LogoutListItemButton>
            <LogoutListItemIcon>
              <LogoutIcon />
            </LogoutListItemIcon>
            <ListItemText
              primary="تسجيل خروج"
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </LogoutListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
