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
import { Alert, Chip, CircularProgress, Grid2, TablePagination } from "@mui/material";
import { blue, grey, red, yellow } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { GiftCardTransaction } from "../../classes/GiftCardTransaction";
import { useEffect } from "react";

const Row: React.FC<{ row: GiftCardTransaction }> = ({ row }) => {
  const [open, setOpen] = React.useState(false);

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
          {row.code}
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
            label={row.redeemed ? "Redeemed" : "Pending"}
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
              {
                !row.redeemed && 
                <Alert severity="warning">The information is empty because the gift card has not been redeemed.</Alert>
              }
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
                <strong>Recipient name:</strong> {row.recipientName || ""}
              </Typography>
              <Typography variant="body1" sx={{ color: grey[800] }}>
                <strong>Recipient email:</strong> {row.recipientEmail}
              </Typography>
              <Typography variant="body1" sx={{ color: grey[800] }}>
                <strong>Recipient phone:</strong> {row.recipientPhone}
              </Typography>
              <Typography variant="body1" sx={{ color: grey[800] }}>
                <strong>Greetings:</strong> {row.greeting}
              </Typography>
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
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
                    Gift card code
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
                    Redeemed
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "bold",
                    }}
                    align="right"
                  >
                    Redeemed date
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
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions
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
          count={transactions.length}
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
