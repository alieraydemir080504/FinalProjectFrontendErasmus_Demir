import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { Customer, CustomerForm } from "../types";

type Props = {
  row: Customer;
  refresh: () => void;
};

export default function EditCustomer({ row, refresh }: Props) {
  const [open, setOpen] = useState(false);

  const [customer, setCustomer] = useState<CustomerForm>({
    firstname: row.firstname,
    lastname: row.lastname,
    email: row.email,
    phone: row.phone,
    streetaddress: row.streetaddress,
    postcode: row.postcode,
    city: row.city,
  });

  const handleSave = () => {
    fetch(row._links.self.href, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer),
    }).then(() => {
      refresh();
      setOpen(false);
    });
  };

  return (
    <>
      <IconButton size="small" color="primary" onClick={() => setOpen(true)}>
        <EditIcon fontSize="small" />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          {(
            Object.keys(customer) as (keyof CustomerForm)[]
          ).map((field) => (
            <TextField
              key={field}
              fullWidth
              margin="dense"
              label={field}
              value={customer[field]}
              onChange={(e) =>
                setCustomer({ ...customer, [field]: e.target.value })
              }
            />
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
