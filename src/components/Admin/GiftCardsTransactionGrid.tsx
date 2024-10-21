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
import {
  Alert,
  Button,
  Chip,
  CircularProgress,
  InputAdornment,
  TablePagination,
  TextField,
} from "@mui/material";
import { blue, grey, red, yellow } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import SearchIcon from "@mui/icons-material/Search";
import { GiftCardTransaction } from "../../classes/GiftCardTransaction";
import { useEffect } from "react";

const filterTransactions = (
  transactions: GiftCardTransaction[],
  searchText: string
): GiftCardTransaction[] => {
  if (!searchText) {
    return transactions;
  }

  const lowerSearchText = searchText.toLowerCase();

  return transactions.filter((transaction) => {
    const values = Object.values(transaction);

    return values.some((value) => {
      if (typeof value === "string") {
        return value.toLowerCase().includes(lowerSearchText);
      }
      return false;
    });
  });
};

const Row: React.FC<{ row: GiftCardTransaction }> = ({ row }) => {
  const [open, setOpen] = React.useState(false);

  const handleDownloadReceiptPdf = (row: GiftCardTransaction) => {
    window.open(
      import.meta.env.PUBLIC_TICKETS_API +
        "/giftcards/download-receipt.php?code=" +
        row.code
    );
  };

  const handleDownloadRecipientPdf = (row: GiftCardTransaction) => {
    window.open(
      import.meta.env.PUBLIC_TICKETS_API +
        "/giftcards/download-letter.php?code=" +
        row.code
    );
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "&:hover": { backgroundColor: grey[100] },
          transition: "background-color 0.3s ease",
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            color: grey[600],
            letterSpacing: "0.5px",
            lineHeight: "1.5",
          }}
        >
          {row.id.toString().padStart(6, "0")}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            color: grey[600],
            letterSpacing: "0.5px",
            lineHeight: "1.5",
          }}
        >
          {row.orderedBy}
        </TableCell>
        <TableCell
          align="right"
          component="th"
          scope="row"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            color: grey[600],
            letterSpacing: "0.5px",
            lineHeight: "1.5",
          }}
        >
          {row.purchaserEmail}
        </TableCell>
        <TableCell
          align="right"
          component="th"
          scope="row"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            color: grey[600],
            letterSpacing: "0.5px",
            lineHeight: "1.5",
          }}
        >
          {row.creationDate}
        </TableCell>
        <TableCell
          align="right"
          component="th"
          scope="row"
          sx={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <Chip
            label={
              row.redeemed ? "Paid (Form filled)" : "Paid (Form not filled)"
            }
            sx={{
              backgroundColor: row.redeemed ? "#ffcc00" : red[500],
              color: "#fff",
              fontWeight: "bold",
            }}
          />
        </TableCell>
        <TableCell
          align="right"
          component="th"
          scope="row"
          sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
            color: grey[600],
            letterSpacing: "0.5px",
            lineHeight: "1.5",
          }}
        >
          {row.redeemedDate}
        </TableCell>
        <TableCell
          align="right"
          sx={{
            color: blue[700],
            fontWeight: "500",
          }}
        >
          ${row.amount}
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="download pdf"
            size="small"
            onClick={() => handleDownloadReceiptPdf(row)}
            title="Download pdf"
          >
            <PictureAsPdfIcon sx={{ color: red[600] }} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 1,
                padding: 2,
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: grey[50],
              }}
            >
              {!row.redeemed && (
                <Alert severity="warning">
                  The information is empty because the gift card has not been
                  redeemed.
                </Alert>
              )}

              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ color: "#ffcc00" }}
              >
                General information
              </Typography>
              <Typography variant="body1" sx={{ color: grey[800] }}>
                <strong>Gift card code:</strong> {row.code || ""}
              </Typography>

              <br />

              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ color: "#ffcc00" }}
              >
                Sender information
              </Typography>
              <Typography variant="body1" sx={{ color: grey[800] }}>
                <strong>Name:</strong> {row.senderName || ""}
              </Typography>
              <Typography variant="body1" sx={{ color: grey[800] }}>
                <strong>Email:</strong> {row.senderEmail}
              </Typography>
              <Typography variant="body1" sx={{ color: grey[800] }}>
                <strong>Phone</strong> {row.senderPhone}
              </Typography>
              <Typography variant="body1" sx={{ color: grey[800] }}>
                <strong>City</strong> {row.senderCity}
              </Typography>
              <Typography variant="body1" sx={{ color: grey[800] }}>
                <strong>State</strong> {row.senderState}
              </Typography>
              <Typography variant="body1" sx={{ color: grey[800] }}>
                <strong>Zip code</strong> {row.senderZipCode}
              </Typography>

              <br />

              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ color: "#ffcc00" }}
              >
                Recipient information
              </Typography>
              <Typography variant="body1" sx={{ color: grey[800] }}>
                <strong>Name:</strong> {row.recipientName || ""}
              </Typography>
              <Typography variant="body1" sx={{ color: grey[800] }}>
                <strong>Email:</strong> {row.recipientEmail}
              </Typography>
              <Typography variant="body1" sx={{ color: grey[800] }}>
                <strong>Phone:</strong> {row.recipientPhone}
              </Typography>
              <Typography variant="body1" sx={{ color: grey[800] }}>
                <strong>Greetings:</strong> {row.greeting}
              </Typography>

              <Button
                variant="contained"
                sx={{ backgroundColor: "#d9b812", marginTop: "20px" }}
                onClick={() => handleDownloadRecipientPdf(row)}
                startIcon={<PictureAsPdfIcon />}
                disabled={!row.redeemed}
                title="Download gift certificate"
              >
                DOWNLOAD GIFT CERTIFICATE
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const GiftCardsTransactionGrid = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [transactions, setTransactions] = React.useState<GiftCardTransaction[]>(
    []
  );
  const [loading, setLoading] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchAll = async () => {
      try {
        setLoading(true);
        setTransactions(await GiftCardTransaction.getAll());
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("An error occurred while loading data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const filteredTransactions = filterTransactions(transactions, searchText);

  if (!localStorage.getItem("token")) {
    return <></>;
  } else {
    return (
      <Paper sx={{ width: "100%" }}>
        <Typography
          variant="h2"
          color="#ffcc00"
          sx={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Gift cards transactions
        </Typography>
        {loading ? (
          <CircularProgress sx={{ color: "#ffcc00" }} />
        ) : (
          <TableContainer component={Paper}>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search..."
              sx={{
                marginBottom: 2,
                marginTop: 3,
                backgroundColor: "white",
                boxShadow:
                  "0 4px 6px 0 rgba(0, 0, 0, 0.1), 0 6px 10px 0 rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "gray",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Table aria-label="collapsible table">
              <TableHead sx={{ backgroundColor: grey[200] }}>
                <TableRow>
                  <TableCell />
                  <TableCell
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    Purchaser name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "bold",
                    }}
                    align="right"
                  >
                    Purchaser Email
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "bold",
                    }}
                    align="right"
                  >
                    Transaction date
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "bold",
                    }}
                    align="right"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "bold",
                    }}
                    align="right"
                  >
                    Form fill date
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "bold",
                    }}
                    align="right"
                  >
                    Amount
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTransactions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <Row key={row.id} row={row} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredTransactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
};

export default GiftCardsTransactionGrid;
