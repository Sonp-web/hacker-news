import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { StoryPage } from "./pages/StoryPage/StoryPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/item/:id" element={<StoryPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
