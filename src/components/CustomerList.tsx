import { useEffect, useState, useMemo } from "react";
import {
  Paper,
  TextField,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchCustomers, deleteCustomer } from "../customerapi";
import EditCustomer from "./EditCustomer";
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";

import type { Customer } from "../types";

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchText, setSearchText] = useState("");

  const refresh = () => {
    fetchCustomers().then((data) => setCustomers(data));
  };

  useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(() => {
    if (!searchText) return customers;

    const lower = searchText.toLowerCase();

    return customers.filter((c) =>
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
  {
    field: "actions",
    headerName: "Actions",
    width: 260,  
    sortable: false,
    renderCell: (params) => (
      <Stack direction="row" spacing={1} alignItems="center">
      <IconButton
        size="small"
        color="error"
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this customer?")) {
            deleteCustomer(params.row._links.self.href).then(refresh);
          }
        }}
      >
          <DeleteIcon fontSize="small" />
        </IconButton>

        <EditCustomer row={params.row} refresh={refresh} />

        <AddTraining customer={params.row} refresh={refresh} />

      </Stack>
    ),
  },



    { field: "firstname", headerName: "First name", width: 140 },
    { field: "lastname", headerName: "Last name", width: 140 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 140 },
    { field: "streetaddress", headerName: "Address", width: 200 },
    { field: "postcode", headerName: "Postcode", width: 120 },
    { field: "city", headerName: "City", width: 150 },
  ];

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Customers
      </Typography>

      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <TextField
          size="small"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <AddCustomer refresh={refresh} />
      </Stack>

      <div style={{ height: 600 }}>
        <DataGrid
          rows={filtered}
          columns={columns}
          autoPageSize
          getRowId={(row) => row._links.self.href}
        />
      </div>
    </Paper>
  );
}
