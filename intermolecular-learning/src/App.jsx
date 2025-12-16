import { useState } from "react";
import LandingPage from "./components/LandingPage";
import Materi from "./components/Materi";
import Simulasi from "./components/Simulasi";
import Kuis from "./components/Kuis";

export default function App() {
  const [page, setPage] = useState("landing");

  if (page === "landing") return <LandingPage onNavigate={setPage} />;
  if (page === "materi") return <Materi onNavigate={setPage} />;
  if (page === "simulasi") return <Simulasi onNavigate={setPage} />;
  if (page === "kuis") return <Kuis onNavigate={setPage} />;

  return null;
}