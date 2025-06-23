import { styled } from "@mui/material/styles";
import { Box, ListItemButton, ListItemIcon, Divider } from "@mui/material";

export const drawerWidth = 250;

export const SidebarHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  direction: "rtl",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    },
  },
  padding: theme.spacing(1, 3),
  margin: theme.spacing(0.5, 0),
  borderRadius: theme.shape.borderRadius,
}));

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: "32px",
  color: theme.palette.text.secondary,
}));

export const LogoutListItemButton = styled(ListItemButton)(({ theme }) => ({
  color: theme.palette.error.main,
  padding: theme.spacing(1, 3),
  margin: theme.spacing(0.5, 0),
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.error.light,
  },
}));

export const LogoutListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: "32px",
  color: theme.palette.error.main,
}));

export const BottomDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(2),
}));

export const drawerStyles = {
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    direction: "rtl",
    border: "none",
    boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "background.paper",
  },
};
