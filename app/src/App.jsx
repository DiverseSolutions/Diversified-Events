import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OrganizerPage from "./pages/OrganizerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/organizer' element={<OrganizerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
