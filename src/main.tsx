import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Light mode by default for Morning Clarity theme
document.documentElement.classList.remove('dark');

createRoot(document.getElementById("root")!).render(<App />);
