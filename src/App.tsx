import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";

export default function App() {
  return (
    <Router>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">PersonalTrainer</Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: 200,
          [`& .MuiDrawer-paper`]: { width: 200, top: 64 },
        }}
      >
        <List>
          <ListItemButton component={Link} to="/customers">
            <ListItemText primary="Customers" />
          </ListItemButton>

          <ListItemButton component={Link} to="/trainings">
            <ListItemText primary="Trainings" />
          </ListItemButton>
        </List>
      </Drawer>

      <Box sx={{ marginLeft: 25, marginTop: 10, padding: 2 }}>
        <Routes>
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
          <Route path="*" element={<CustomerList />} />
        </Routes>
      </Box>
    </Router>
  );
}
