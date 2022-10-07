import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OrganizerPage from "./pages/OrganizerPage";
import MyEvent from "./pages/MyEvent";
import OrganizerForm from "./pages/OrganizerForm";
import MintEvent from "./pages/MintEvent";
import Layout from "./components/Layout";
import Test from "./pages/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/organizer" element={<OrganizerPage />} />
          <Route path="/my-events" element={<MyEvent />} />
          <Route path="/organizer-form" element={<OrganizerForm />} />
          <Route path="/mint-event" element={<MintEvent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
