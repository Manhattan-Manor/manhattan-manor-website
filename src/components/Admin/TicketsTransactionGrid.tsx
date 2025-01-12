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
  Button,
  Chip,
  CircularProgress,
  Grid2,
  InputAdornment,
  TablePagination,
  TextField,
} from "@mui/material";
import { blue, grey, red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import { TicketTransaction } from "../../classes/TicketTransaction";
import { useEffect } from "react";

const filterTransactions = (
  transactions: TicketTransaction[],
  searchText: string
): TicketTransaction[] => {
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

const Row: React.FC<{ row: TicketTransaction }> = ({ row }) => {
  const [open, setOpen] = React.useState(false);

  const handlePdfClick = (row: TicketTransaction) => {
    window.open(
      import.meta.env.PUBLIC_TICKETS_API +
        "transaction.php?transactionId=" +
        row.transactionId
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
          {row.customerName}
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
          {row.email}
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
          {row.phone}
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
          {row.transactionDate}
        </TableCell>
        <TableCell
          align="right"
          component="th"
          scope="row"
          sx={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <Chip
            label={row.confirm ? "Paid" : "Pending"}
            sx={{
              backgroundColor: row.confirm ? "#ffcc00" : red[500],
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
          {row.zipCode}
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
          {row.ticketsPurchased}
        </TableCell>
        <TableCell
          align="right"
          sx={{
            color: blue[700],
            fontWeight: "500",
          }}
        >
          ${row.totalAmount}
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="download pdf"
            size="small"
            onClick={() => handlePdfClick(row)}
            disabled={!row.confirm}
            title="Download pdf"
          >
            <PictureAsPdfIcon sx={{ color: row.confirm ? red[600] : grey[600] }} />
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
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ color: "#ffcc00" }}
              >
                Transaction Details
              </Typography>
              <Typography variant="body1" sx={{ color: grey[800] }}>
                <strong>Allergies/Special Requirements:</strong>{" "}
                {row.allergiesSpecialRequirements || "None"}
              </Typography>
              <Typography variant="body1" sx={{ color: grey[800] }}>
                <strong>Country:</strong> {row.countryName}
              </Typography>
              <Typography variant="body1" sx={{ color: grey[800] }}>
                <strong>State:</strong> {row.state}
              </Typography>
              <Typography variant="body1" sx={{ color: grey[800] }}>
                <strong>City:</strong> {row.city}
              </Typography>
              <Typography variant="body1" sx={{ color: grey[800] }}>
                <strong>Tickets Purchased:</strong> {row.ticketsPurchased}
              </Typography>

              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ marginTop: 2, color: "#ffcc00" }}
              >
                Ticket Details
              </Typography>

              {/* Use Grid2 for centering and limiting width */}
              <Grid2 container justifyContent="center">
                <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
                  <Table size="small" aria-label="tickets">
                    <TableHead>
                      <TableRow sx={{ backgroundColor: grey[200] }}>
                        <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="right">
                          Age
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.tickets?.map((ticket: any) => (
                        <TableRow
                          key={ticket.ticketPurchasedId}
                          sx={{
                            "&:hover": {
                              backgroundColor: grey[100],
                            },
                            transition: "background-color 0.3s ease",
                          }}
                        >
                          <TableCell sx={{ padding: "8px" }}>
                            {ticket.name}
                          </TableCell>
                          <TableCell sx={{ padding: "8px" }}>
                            {ticket.email}
                          </TableCell>
                          <TableCell sx={{ padding: "8px" }} align="right">
                            {ticket.age}
                          </TableCell>
                        </TableRow>
                      )) || (
                        <TableRow>
                          <TableCell colSpan={3}>
                            No tickets available
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid2>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const TicketsTransactionGrid = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [transactions, setTransactions] = React.useState<TicketTransaction[]>(
    []
  );
  const [loading, setLoading] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [downloading, setDownloading] = React.useState(false);

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

  const filteredTransactions = filterTransactions(transactions, searchText);

  const handleDownloadXLSX = async () => {
    try {
      setDownloading(true);
      await TicketTransaction.downloadXLSX();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Error downloading the file");
      }
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setTransactions(await TicketTransaction.getAll());
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
        <Grid2 container spacing={2}>
          <Grid2 size={4}>
            <Typography
              variant="h2"
              color="#ffcc00"
              sx={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Tickets Transactions
            </Typography>
          </Grid2>
        </Grid2>
        {loading ? (
          <CircularProgress sx={{ color: "#ffcc00" }} />
        ) : (
          <TableContainer component={Paper}>
            <Grid2 container spacing={2} mt={1.5} mb={1.5} mr={1.5}>
              <Grid2
                container
                size={8}
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                {transactions.length > 0 && (
                  <Button
                    disabled={downloading}
                    sx={{
                      marginBottom: "5px",
                      color: "#04bf45",
                      fontWeight: 550,
                    }}
                    variant="text"
                    onClick={handleDownloadXLSX}
                    startIcon={<DownloadIcon />}
                  >
                    {downloading ? "Downloading..." : "Download xlsx"}
                  </Button>
                )}
              </Grid2>
              <Grid2 size={4}>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={searchText}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  sx={{
                    width: "100%",
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
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid2>
            </Grid2>
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
                    Customer
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "bold",
                    }}
                    align="right"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "bold",
                    }}
                    align="right"
                  >
                    Phone
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "bold",
                    }}
                    align="right"
                  >
                    Date
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
                    Zip Code
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "bold",
                    }}
                    align="right"
                  >
                    Tickets Purchased
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "bold",
                    }}
                    align="right"
                  >
                    Total Amount
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

export default TicketsTransactionGrid;
