import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SearchPage } from "@/pages/SearchPage";
import { SavedListPage } from "@/pages/SavedListPage";
import { ProfileDetailPage } from "@/pages/ProfileDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<SearchPage />} />
          <Route path="/my-list" element={<SavedListPage />} />
          <Route path="/profile/:username" element={<ProfileDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
