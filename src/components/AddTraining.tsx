import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from "@mui/material";

import { addTraining } from "../trainingapi";
import type { Customer } from "../types";

type Props = {
  customer: Customer;
  refresh: () => void;
};

export default function AddTraining({ customer, refresh }: Props) {
  const [open, setOpen] = useState(false);

  const [date, setDate] = useState("");
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState(60);

  const handleSave = () => {
    addTraining({
      date: new Date(date).toISOString(),
      activity,
      duration,
      customer: customer._links.self.href,   
    }).then(() => {
      refresh();
      setOpen(false);
    });
  };

  return (
    <>
      <Button
        variant="text"
        sx={{ textTransform: "none", padding: 0 }}
        onClick={() => setOpen(true)}
      >
        ADD TRAINING
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Add training for {customer.firstname} {customer.lastname}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            type="datetime-local"
            margin="dense"
            label="Date"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setDate(e.target.value)}
          />

          <TextField
            fullWidth
            label="Activity"
            margin="dense"
            onChange={(e) => setActivity(e.target.value)}
          />

          <TextField
            fullWidth
            type="number"
            label="Duration (min)"
            margin="dense"
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
