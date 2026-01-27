import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import IntroVideo from "./components/IntroVideo";

const queryClient = new QueryClient();

const App = () => {
  const [showIntro, setShowIntro] = React.useState(true);
  const [showMain, setShowMain] = React.useState(false);
  const [fadeOutIntro, setFadeOutIntro] = React.useState(false);

  const handleTransitionStart = () => {
    setShowMain(true);
    setFadeOutIntro(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnimatePresence>
          {showIntro && (
            <IntroVideo
              key="intro"
              onComplete={() => setShowIntro(false)}
              onTransitionStart={handleTransitionStart}
              fadeOut={fadeOutIntro}
            />
          )}
        </AnimatePresence>

        {showMain && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
            className="relative z-0"
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </motion.div>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
