
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chatgpt from "./pages/Chatgpt";
import { ThemeProvider } from "./context/ThemeContext.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chatgpt />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}