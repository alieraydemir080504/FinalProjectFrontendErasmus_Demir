import { useEffect, useState, useMemo } from "react";
import {
  Paper,
  TextField,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

import type { Training } from "../types";
import { deleteTraining, fetchTrainings } from "../trainingapi";

export default function TrainingList() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [searchText, setSearchText] = useState("");

  const refresh = () => {
    fetchTrainings().then((data) => setTrainings(data));
  };

  useEffect(() => {
    refresh();
  }, []);

  const filtered = useMemo(() => {
  if (!searchText) return trainings;
  const lower = searchText.toLowerCase();

  return trainings.filter((t) => {
    const activity = t.activity ?? "";
    const duration =
      t.duration !== null && t.duration !== undefined
        ? t.duration.toString()
        : "";

    const customer = typeof t.customer === "string" ? t.customer : "";

    return (
      activity.toLowerCase().includes(lower) ||
      duration.includes(lower) ||
      customer.toLowerCase().includes(lower)
    );
  });
}, [searchText, trainings]);


  const columns: GridColDef[] = [
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    sortable: false,
    renderCell: (params) => (
      <IconButton
        size="small"
        color="error"
        onClick={() => {
          if (window.confirm("Delete training?")) {
            deleteTraining(params.row.id).then(refresh);
          }
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    ),
  },

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
    valueGetter: (params: any) => {
      const row = params?.row;
      if (!row) return "";
      const c = row.customer;
      if (!c) return "";
      if (typeof c === "string") return "";
      return `${c.firstname ?? ""} ${c.lastname ?? ""}`.trim();
    },
  },
];

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Trainings
      </Typography>

      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <TextField
          size="small"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Stack>

      <div style={{ height: 600 }}>
        <DataGrid
           rows={filtered}
           columns={columns}
           autoPageSize
           getRowId={(row) => row.id}
        />
      </div>
    </Paper>
  );
}
