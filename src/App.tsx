
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingAnimation from "./components/LoadingAnimation";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Winners from "./pages/Winners";
import About from "./pages/About";
import Tournaments from "./pages/Tournaments";
import NotFound from "./pages/NotFound";
import Registration from "./pages/Registration";
import RulesReg from "./pages/RulesReg";
import SupportCenter from "./pages/SupportCenter";
import PlayerRanking from "./pages/PlayerRanking";
import ContactUs from "./pages/ContactUs";
import CookiePolicy from "./pages/CookiePolicy";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingAnimation onComplete={() => setIsLoading(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navigation />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route path="/winners" element={<Winners />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/about" element={<About />} />
              <Route path="/rules" element={<RulesReg />} />
              <Route path="/support" element={<SupportCenter />} />
              <Route path="/rankings" element={<PlayerRanking />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/cookie" element={<CookiePolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
