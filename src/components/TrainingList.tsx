import { useEffect, useState, useMemo } from "react";
import { Paper, TextField, Typography, Box } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/gettrainings"
    )
      .then((res) => res.json())
      .then((data) => setTrainings(data));
  }, []);

  const filtered = useMemo(() => {
    if (!searchText) return trainings;

    const lower = searchText.toLowerCase();

    return trainings.filter((t: any) =>
      [
        t.activity,
        t.duration,
        t.customer?.firstname,
        t.customer?.lastname,
      ]
        .join(" ")
        .toLowerCase()
        .includes(lower)
    );
  }, [searchText, trainings]);

  const columns: GridColDef[] = [
    { field: "activity", headerName: "Activity", width: 200 },
    { field: "duration", headerName: "Duration (min)", width: 150 },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      valueFormatter: (params: any) =>
        dayjs(params.value).format("DD.MM.YYYY HH:mm"),
    },
    {
      field: "customer",
      headerName: "Customer",
      width: 240,
      valueGetter: (params: { value: any }) =>
        params.value
          ? `${params.value.firstname} ${params.value.lastname}`
          : "",
    },
  ];

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Trainings
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
