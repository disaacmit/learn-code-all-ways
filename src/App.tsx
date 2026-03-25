import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { PremiumProvider } from "@/contexts/PremiumContext";
import TopBar from "@/components/TopBar";
import Index from "./pages/Index";
import LearnLanguage from "./pages/LearnLanguage";
import Practice from "./pages/Practice";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import AiTutor from "./pages/AiTutor";
import Premium from "./pages/Premium";
import CodeEditor from "./pages/CodeEditor";
import LearningPaths from "./pages/LearningPaths";
import NotFound from "./pages/NotFound";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();
  return (
    <>
      {user && <TopBar />}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
        <Route path="/learn/:languageId" element={<ProtectedRoute><LearnLanguage /></ProtectedRoute>} />
        <Route path="/practice" element={<ProtectedRoute><Practice /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/ai-tutor" element={<ProtectedRoute><AiTutor /></ProtectedRoute>} />
        <Route path="/premium" element={<ProtectedRoute><Premium /></ProtectedRoute>} />
        <Route path="/code-editor" element={<ProtectedRoute><CodeEditor /></ProtectedRoute>} />
        <Route path="/learning-paths" element={<ProtectedRoute><LearningPaths /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <PremiumProvider>
            <AppRoutes />
          </PremiumProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
