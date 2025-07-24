import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { SelectEstablishment } from "./pages/SelectEstablishment";
import { Users } from "./pages/Users";
import { Applications } from "./pages/Applications";
import { UserGroups } from "./pages/UserGroups";
import { Establishments } from "./pages/Establishments";
import { Modules } from "./pages/Modules";
import { Systems } from "./pages/Systems";
import { EmailTemplates } from "./pages/EmailTemplates";
import { Layout } from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/select-establishment" element={<SelectEstablishment />} />
          <Route path="/dashboard" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/usuarios" element={
            <Layout>
              <Users />
            </Layout>
          } />
          <Route path="/aplicativos" element={
            <Layout>
              <Applications />
            </Layout>
          } />
          <Route path="/grupos" element={
            <Layout>
              <UserGroups />
            </Layout>
          } />
          <Route path="/estabelecimentos" element={
            <Layout>
              <Establishments />
            </Layout>
          } />
          <Route path="/modulos" element={
            <Layout>
              <Modules />
            </Layout>
          } />
          <Route path="/sistemas" element={
            <Layout>
              <Systems />
            </Layout>
          } />
          <Route path="/templates" element={
            <Layout>
              <EmailTemplates />
            </Layout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
