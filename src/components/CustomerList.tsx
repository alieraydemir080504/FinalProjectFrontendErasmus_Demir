import { useEffect, useState, useMemo } from "react";
import { Paper, TextField, Typography, Box } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers"
    )
      .then((res) => res.json())
      .then((data) => setCustomers(data._embedded.customers));
  }, []);

  const filtered = useMemo(() => {
    if (!searchText) return customers;
    const lower = searchText.toLowerCase();
    return customers.filter((c: any) =>
      [
        c.firstname,
        c.lastname,
        c.email,
        c.phone,
        c.streetaddress,
        c.postcode,
        c.city,
      ]
        .join(" ")
        .toLowerCase()
        .includes(lower)
    );
  }, [searchText, customers]);

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "First name", width: 140 },
    { field: "lastname", headerName: "Last name", width: 140 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 140 },
    { field: "streetaddress", headerName: "Address", width: 200 },
    { field: "postcode", headerName: "Postcode", width: 110 },
    { field: "city", headerName: "City", width: 140 },
  ];

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Customers
      </Typography>

      <Box sx={{ mb: 2 }}>
        <TextField
          placeholder="Search"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Box>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          autoPageSize
          rows={filtered}
          columns={columns}
          getRowId={row => row._links.self.href}
        />
      </div>
    </Paper>
  );
}
