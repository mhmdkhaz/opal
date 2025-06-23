import { styled } from "@mui/material/styles";
import {
  ListItemButton,
  ListItemIcon,
  Divider,
  Typography,
} from "@mui/material";

export const drawerStyles = {
  width: 260,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 260,
    background: "#f9f9fb",
    borderLeft: "none",
    boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
  },
};

export const SidebarHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "80px",
}));

export const StyledListItemButton = styled(ListItemButton)(
  ({ theme, selected }) => ({
    borderRadius: "12px",
    margin: "4px 12px",
    padding: "8px 16px",
    backgroundColor: selected ? theme.palette.action.selected : "transparent",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    transition: "0.3s",
  })
);

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  minWidth: "36px",
}));

export const LogoutListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: "8px 12px",
  padding: "8px 16px",
  borderRadius: "12px",
  backgroundColor: theme.palette.error.light,
  color: "#fff",
  "&:hover": {
    backgroundColor: theme.palette.error.main,
  },
}));

export const LogoutListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: "#fff",
  minWidth: "36px",
}));

export const BottomDivider = styled(Divider)(({ theme }) => ({
  margin: "20px 0",
}));

export const SidebarSectionTitle = styled(Typography)(({ theme }) => ({
  padding: "8px 16px",
  fontSize: "0.75rem",
  fontWeight: 600,
  color: theme.palette.text.secondary,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
}));
