import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import MainLayout from "./layouts/MainLayout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AppRoutes>
        <MainLayout></MainLayout>
      </AppRoutes>
    </>
  );
}

export default App;
