import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventDetail from "./pages/EventDetail";
import MyEvent from "./pages/MyEvent";
import OrganizerForm from "./pages/OrganizerForm";
import MintEvent from "./pages/MintEvent";
import Layout from "./components/Layout";
import MyNFTs from "./pages/MyNFTs";
import VerifyNfts from "./pages/VerifyNfts";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/event-detail" element={<EventDetail />} />
          <Route path="/my-events" element={<MyEvent />} />
          <Route path="/organizer-form" element={<OrganizerForm />} />
          <Route path="/mint-event" element={<MintEvent />} />
          <Route path="/my-nfts" element={<MyNFTs />} />
          <Route path="/verify-nfts" element={<VerifyNfts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
