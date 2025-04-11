import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import AppProvider from "./contexts/AppProvider";

function App() {
  return (
    <>
      <AppProvider>
        <AppRoutes></AppRoutes>
      </AppProvider>
    </>
  );
}

export default App;
