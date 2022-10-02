import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OrganizerPage from "./pages/OrganizerPage";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='organizer' element={<OrganizerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
