import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TimelinePage from "./pages/TimelinePage";
import EvenimenteSpecialePage from "./pages/EvenimenteSpecialePage";
import CircularGalleryPage from "./pages/CircularGalleryPage";
import PreferatePersonalePage from "./pages/PreferatePersonalePage";
import NotFound from "./pages/NotFound";
import { MusicProvider } from "./contexts/MusicContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MusicProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/evenimente-speciale" element={<EvenimenteSpecialePage />} />
            <Route path="/circular-gallery" element={<CircularGalleryPage />} />
            <Route path="/preferate-personale" element={<PreferatePersonalePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </MusicProvider>
  </QueryClientProvider>
);

export default App;
