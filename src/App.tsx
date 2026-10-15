import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { StoryPage } from "./pages/StoryPage/StoryPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { MainLayout } from "./layouts/MainLayout";
function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/item/:id" element={<StoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
