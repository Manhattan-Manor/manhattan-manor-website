interface Transaction {
  id: number;
  transactionId: string;
  totalAmount: string;
  confirm: number;
  transactionDate: string;
  allergiesSpecialRequirements: string;
  customerName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  zipCode: string;
  countryName: string;
  couponCode: string | null;
  eventName: string;
  ticketsPurchased: string;
}

const transactions: Transaction[] = [
  {
    id: 9,
    transactionId:
      "pi_3Q5bWHRxPYeKZIKc0tZdJyFb_secret_6Yhjo81osZL4Ieaw1ZfmbtYdM",
    totalAmount: "424.71",
    confirm: 1,
    transactionDate: "2024-10-03 00:59:47",
    allergiesSpecialRequirements: "",
    customerName: "dfhfgh fghfghf dfghdf",
    email: "williams.0199gd@gmail.com",
    phone: "32476829",
    city: "bhv",
    state: "gcvnc",
    zipCode: "vj",
    countryName: "CENTRAL AFRICAN REPUBLIC",
    couponCode: null,
    eventName: "End of Year",
    ticketsPurchased: "1",
  },
  {
    id: 8,
    transactionId:
      "pi_3Q5ao9RxPYeKZIKc1tTarRjl_secret_Eo1L56kLJPDONUMWXcsteMsZu",
    totalAmount: "424.71",
    confirm: 1,
    transactionDate: "2024-10-03 00:14:10",
    allergiesSpecialRequirements: "",
    customerName: "Williams García Domínguez",
    email: "williams.0199gd@gmail.com",
    phone: "8234962379",
    city: "naranja",
    state: "mango",
    zipCode: "29803",
    countryName: "KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF",
    couponCode: null,
    eventName: "End of Year",
    ticketsPurchased: "1",
  },
];
import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Row: React.FC<{ row: Transaction }> = ({ row }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? "Hidden" : "Show"}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {" "}
          {row.transactionId}
        </TableCell>
        <TableCell align="right">{row.customerName}</TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.phone}</TableCell>
        <TableCell align="right">{row.transactionDate}</TableCell>
        <TableCell align="right">{row.confirm}</TableCell>
        <TableCell align="right">{row.countryName}</TableCell>
        <TableCell align="right">{row.state}</TableCell>
        <TableCell align="right">{row.city}</TableCell>
        <TableCell align="right">{row.zipCode}</TableCell>
        <TableCell align="right">{row.ticketsPurchased}</TableCell>
        <TableCell align="right">{row.totalAmount}</TableCell>
        <TableCell align="right">{row.allergiesSpecialRequirements}</TableCell>
        <TableCell align="right">{row.couponCode}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Order number</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Phone</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Confirmed</TableCell>
                    <TableCell align="right">Country</TableCell>
                    <TableCell align="right">State</TableCell>
                    <TableCell align="right">City</TableCell>
                    <TableCell align="right">Zip code</TableCell>
                    <TableCell align="right">Tickets purchased</TableCell>
                    <TableCell align="right">Total amount</TableCell>
                    <TableCell align="right">
                      Allergies special requirements
                    </TableCell>
                    <TableCell align="right">Coupon code</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const TransactionPanel = () => {
  return (
    <Paper sx={{ width: '100%' }}>
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell>Order number</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Confirmed</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">State</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Zip code</TableCell>
            <TableCell align="right">Tickets purchased</TableCell>
            <TableCell align="right">Total amount</TableCell>
            <TableCell align="right">Allergies special requirements</TableCell>
            <TableCell align="right">Coupon code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <Row key={`${row.id}`} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
};

export default TransactionPanel;
