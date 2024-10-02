import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  TablePagination,
  TextField,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

interface CryptoData {
  id: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
}

export const CryptoCurrenciesScreen: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchCryptos = async () => {
    try {
      const response = await axios.get<CryptoData[]>(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 100, // Fetch a larger number of items for pagination
            page: 1,
            sparkline: true,
          },
        }
      );
      setCryptos(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCryptos();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
    setPage(0);
  };

  const filteredCryptos = cryptos.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchQuery)
  );

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <TextField
        label="Search Cryptocurrencies"
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <TableContainer
        component={Paper}
        style={{
          backgroundColor: "transparent",
          marginBottom: "20px",
          boxShadow: "none",
        }}
      >
        <Table
          style={{
            borderCollapse: "collapse",
            border: "none",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Market Cap</TableCell>
              <TableCell>Total Volume</TableCell>
              <TableCell>24h Change (%)</TableCell>
              <TableCell>Chart</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCryptos
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((crypto) => (
                <TableRow key={crypto.id}>
                  <TableCell>{crypto.name}</TableCell>
                  <TableCell>${crypto.current_price.toFixed(2)}</TableCell>
                  <TableCell>${crypto.market_cap.toLocaleString()}</TableCell>
                  <TableCell>${crypto.total_volume.toLocaleString()}</TableCell>
                  <TableCell>
                    {crypto.price_change_percentage_24h.toFixed(2)}%
                  </TableCell>
                  <TableCell>
                    <div style={{ width: "150px", height: "60px" }}>
                      <Line
                        data={{
                          labels: crypto.sparkline_in_7d.price.map(
                            (_, index) => index
                          ),
                          datasets: [
                            {
                              label: crypto.name,
                              data: crypto.sparkline_in_7d.price,
                              borderColor: "rgba(75, 192, 192, 1)", // Green color for positive change
                              borderWidth: 2,
                              fill: false,
                              pointRadius: 0,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            x: { display: false },
                            y: { display: false },
                          },
                          plugins: { legend: { display: false } },
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredCryptos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};
