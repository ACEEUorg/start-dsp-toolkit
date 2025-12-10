import { Routes, Route } from "react-router";
import MainNav from "./components/navigation/MainNav";
import Footer from "./components/Footer";
import PilotWarningBanner from "./components/ui/PilotWarningBanner";
import AboutPage from "./pages/AboutPage";
import ToolboxPage from "./pages/ToolboxPage";
import ToolDetailPage from "./pages/ToolDetailPage";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-display font-bold tracking-tight text-seafoam-900">
            Start-DSP Entrepreneurial University Toolbox
          </h1>
        </div>
      </header>

      <main className="flex-grow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<ToolboxPage />} />
            <Route path="/toolbox" element={<ToolboxPage />} />
            <Route path="/tool/:number" element={<ToolDetailPage />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}
