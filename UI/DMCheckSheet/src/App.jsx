import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import MainLayout from "./layouts/MainLayout";
import AppProvider from "./contexts/AppProvider";

function App() {
  return (
    <>
      <AppRoutes>
        <AppProvider>
          <MainLayout></MainLayout>
        </AppProvider>
      </AppRoutes>
    </>
  );
}

export default App;
