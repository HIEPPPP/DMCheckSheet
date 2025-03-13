import "./App.css";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <>
      <AppRoutes>
        <MainLayout></MainLayout>
      </AppRoutes>
    </>
  );
}

export default App;
