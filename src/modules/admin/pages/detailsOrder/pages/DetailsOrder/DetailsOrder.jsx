import React from "react";
import {
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Divider,
  Box,
  Avatar,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  BackButton,
  StyledCard,
  ColorCircle,
} from "./OrderDetails.styles";
import { useGetDetailsOrder } from "../../../../../../services/sendOrder/useSendOrder";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: detailsOrder } = useGetDetailsOrder(id);

  const order = detailsOrder?.data;
  const items = order?.items || [];

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.total, 0);

  return (
    <Container>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={3}>
        <BackButton onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon />
        </BackButton>
        <Typography fontWeight="bold" ml={1}>
          إلى الخلف
        </Typography>
      </Box>

      <Typography variant="h5" fontWeight="bold" textAlign="right" mb={2}>
        تفاصيل الطلب{" "}
        <span style={{ color: "#792A86" }}>#{order?.order_number}</span>
      </Typography>

      <Typography textAlign="right" mb={2}>
        اسم الزبون: {order?.name}
      </Typography>
      <Typography textAlign="right" mb={2}>
        الهاتف: {order?.phone}
      </Typography>
      <Typography textAlign="right" mb={2}>
        التاريخ:
        {new Date(order?.created_at).toLocaleString()}
      </Typography>
      <Typography textAlign="right" mb={3}>
        حالة الطلب: {order?.local_status}
      </Typography>

      {/* Order Table */}
      <StyledCard elevation={4}>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#ececec" }}>
                  <TableCell align="center">#</TableCell>
                  <TableCell align="center">اللون</TableCell>
                  <TableCell align="center">صور اللون</TableCell>
                  <TableCell align="center">المقاس</TableCell>
                  <TableCell align="center">Chest</TableCell>
                  <TableCell align="center">Height</TableCell>
                  <TableCell align="center">الكمية</TableCell>
                  <TableCell align="center">السعر</TableCell>
                  <TableCell align="center">الإجمالي</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, idx) => (
                  <TableRow key={idx} hover>
                    <TableCell align="center">{item.id}</TableCell>
                    <TableCell align="center">
                      <ColorCircle bgcolor={item.color?.color || "#ccc"} />
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" gap={1}>
                        {item.color?.images_url?.map((url, i) => (
                          <Avatar
                            key={i}
                            src={url}
                            variant="rounded"
                            sx={{ width: 40, height: 40 }}
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      {item.size?.size || "-"}
                    </TableCell>
                    <TableCell align="center">
                      {item.size?.chest_size || "-"}
                    </TableCell>
                    <TableCell align="center">
                      {item.size?.height || "-"}
                    </TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="center">
                      {item.price.toLocaleString()} sp
                    </TableCell>
                    <TableCell align="center">
                      {item.total.toLocaleString()} sp
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ my: 3 }} />

          <Grid container justifyContent="space-between" px={2}>
            <Typography fontWeight="bold">عدد القطع: {totalItems}</Typography>
            <Typography fontWeight="bold">
              السعر الإجمالي: {totalPrice.toLocaleString()} sp
            </Typography>
          </Grid>
        </CardContent>
      </StyledCard>
    </Container>
  );
};

export default OrderDetails;
