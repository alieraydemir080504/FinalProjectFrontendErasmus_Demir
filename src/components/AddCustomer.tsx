import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from "@mui/material";
import { addCustomer } from "../customerapi";
import type { Customer, CustomerForm } from "../types";

type Props = { refresh: () => void };

export default function AddCustomer({ refresh }: Props) {
  const [open, setOpen] = useState(false);

  const [customer, setCustomer] = useState<CustomerForm>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    streetaddress: "",
    postcode: "",
    city: "",
  });

  const handleChange = (field: keyof CustomerForm, value: string) => {
    setCustomer({ ...customer, [field]: value });
  };

  const handleSave = () => {
    addCustomer(customer).then(() => {
      refresh();
      setOpen(false);
    });
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Customer
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Customer</DialogTitle>
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
              onChange={(e) => handleChange(field, e.target.value)}
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