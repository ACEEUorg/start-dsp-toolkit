import { Routes, Route } from "react-router";
import MainNav from "./components/navigation/MainNav";
import Footer from "./components/Footer";
import PilotWarningBanner from "./components/ui/PilotWarningBanner";
import AboutPage from "./pages/AboutPage";
import ProjectPage from "./pages/ProjectPage";
import ToolkitPage from "./pages/ToolkitPage";
import ToolDetailPage from "./pages/ToolDetailPage";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-display font-bold tracking-tight text-seafoam-900">
            Start DSP Toolbox
          </h1>
        </div>
      </header>
      
      {/* Pilot Warning Banner - shown on all pages */}
      <div className="mx-auto max-w-7xl px-4 pt-4 pb-0 sm:px-6 lg:px-8">
        <PilotWarningBanner />
      </div>

      <main className="flex-grow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<AboutPage />} />
            <Route path="/project" element={<ProjectPage />} />
            <Route path="/toolkit" element={<ToolkitPage />} />
            <Route path="/tool/:number" element={<ToolDetailPage />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}
