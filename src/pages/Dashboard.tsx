import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Settings, 
  Database, 
  Shield, 
  Building, 
  Mail,
  Monitor,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  GraduationCap,
  Play,
  ExternalLink
} from "lucide-react";
import hgtxUniversityLogo from "@/assets/hgtx-university-logo.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchApp, setSearchApp] = useState("");
  const [searchQuickAccess, setSearchQuickAccess] = useState("");
  const [currentQuickAccessPage, setCurrentQuickAccessPage] = useState(0);
  const [isAddAppModalOpen, setIsAddAppModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [currentAllAppsPage, setCurrentAllAppsPage] = useState(0);
  const [appsPerPageAll, setAppsPerPageAll] = useState(8);
  const [quickAccessApps, setQuickAccessApps] = useState([
    { id: 1, title: "Usuários", description: "Gerenciar usuários", icon: Users, href: "/usuarios" },
    { id: 2, title: "Aplicativos", description: "Cadastrar e configurar apps", icon: Monitor, href: "/aplicativos" },
    { id: 3, title: "Grupos", description: "Definir perfis de acesso", icon: Shield, href: "/grupos" },
    { id: 4, title: "Estabelecimentos", description: "Gerenciar locais", icon: Building, href: "/estabelecimentos" },
    { id: 5, title: "Módulos", description: "Configurar funcionalidades", icon: Database, href: "/modulos" },
    { id: 6, title: "Templates", description: "Modelos de e-mail", icon: Mail, href: "/templates" }
  ]);

  const allApps = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: i < 8 ? 
      ["Sistema Institucional", "Portal do Cliente", "App Mobile", "Dashboard Analytics", "Sistema de Licenças", "Portal de Denúncias", "Sistema de Multas", "App Corretor"][i] :
      `Aplicativo ${i + 1}`,
    sistema: i < 8 ? 
      ["Portal", "Portal", "Mobile", "Analytics", "Licenças", "Ouvidoria", "Multas", "Mobile"][i] :
      ["Portal", "Mobile", "Analytics"][i % 3],
    modulo: i < 8 ? 
      ["Institucional", "Cliente", "App", "Relatórios", "Controle", "Denúncias", "Sanções", "Corretor"][i] :
      ["Módulo A", "Módulo B", "Módulo C"][i % 3],
    funcao: i < 8 ? 
      ["Gestão", "Atendimento", "Mobile", "Análise", "Regulamentação", "Fiscalização", "Punição", "Profissional"][i] :
      ["Gestão", "Operação", "Análise"][i % 3],
    status: Math.random() > 0.8 ? "Inativo" : Math.random() > 0.9 ? "Desenvolvimento" : "Ativo"
  }));

  const stats = [
    { title: "Usuários Ativos", value: "234", icon: Users, color: "text-blue-600" },
    { title: "Aplicativos", value: "12", icon: Monitor, color: "text-green-600" },
    { title: "Módulos", value: "24", icon: Database, color: "text-orange-600" },
    { title: "Estabelecimentos", value: "8", icon: Building, color: "text-purple-600" },
  ];

  const availableApps = [
    { id: 7, title: "Sistema de Multas", description: "Controle de sanções", icon: Shield },
    { id: 8, title: "Portal de Denúncias", description: "Ouvidoria digital", icon: Mail },
    { id: 9, title: "App Corretor", description: "Aplicativo para corretores", icon: Monitor },
    { id: 10, title: "Sistema de Licenças", description: "Controle de licenciamento", icon: Database }
  ];

  const appsPerPage = 3;
  
  // Filter quick access apps by search term
  const filteredQuickAccessApps = quickAccessApps.filter(app =>
    app.title.toLowerCase().includes(searchQuickAccess.toLowerCase())
  );
  
  const totalQuickAccessPages = Math.ceil(filteredQuickAccessApps.length / appsPerPage);
  
  const currentQuickAccessApps = filteredQuickAccessApps.slice(
    currentQuickAccessPage * appsPerPage,
    (currentQuickAccessPage + 1) * appsPerPage
  );

  const filteredAvailableApps = availableApps.filter(app =>
    app.title.toLowerCase().includes(searchApp.toLowerCase())
  );

  // Filter and paginate all apps
  const filteredAllApps = allApps.filter(app =>
    app.title.toLowerCase().includes(filterName.toLowerCase())
  );
  
  const totalAllAppsPages = Math.ceil(filteredAllApps.length / appsPerPageAll);
  const currentAllApps = filteredAllApps.slice(
    currentAllAppsPage * appsPerPageAll,
    (currentAllAppsPage + 1) * appsPerPageAll
  );

  const addAppToQuickAccess = (app: any) => {
    if (!quickAccessApps.find(qa => qa.id === app.id)) {
      setQuickAccessApps([...quickAccessApps, { 
        ...app, 
        href: "/aplicativos" // Default href for new apps
      }]);
    }
    setIsAddAppModalOpen(false);
    setSearchApp(""); // Clear search when adding
  };

  const removeAppFromQuickAccess = (appId: number) => {
    setQuickAccessApps(quickAccessApps.filter(app => app.id !== appId));
  };

  // Reset quick access page when search changes
  const handleQuickAccessSearch = (value: string) => {
    setSearchQuickAccess(value);
    setCurrentQuickAccessPage(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Bem-vindo ao sistema de gerenciamento CRECI SP
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {stat.value}
                  </p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* HGTX University Card */}
      <Card className="shadow-soft overflow-hidden border-0 bg-gradient-to-r from-hgtx-dark to-hgtx-medium">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row items-center gap-6 p-6">
            <div className="flex-shrink-0">
              <img 
                src={hgtxUniversityLogo} 
                alt="HGTX University" 
                className="h-20 w-auto"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-2">
                <GraduationCap className="h-5 w-5 text-hgtx-lime" />
                HGTX University
              </h3>
              <p className="text-neutral-300 mb-4">
                Acesse vídeos tutoriais e treinamentos sobre como utilizar os aplicativos e módulos do sistema. 
                Aprenda na prática com conteúdos exclusivos.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Button 
                  className="bg-hgtx-lime hover:bg-hgtx-lime-hover text-hgtx-dark font-semibold"
                  onClick={() => window.open('https://university.hgtx.ia.br/m/courses', '_blank')}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Acessar Treinamentos
                </Button>
                <Button 
                  variant="outline" 
                  className="border-hgtx-lime text-hgtx-lime hover:bg-hgtx-lime/10"
                  onClick={() => window.open('https://university.hgtx.com.br', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Saiba Mais
                </Button>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-4 text-neutral-400">
              <div className="text-center">
                <p className="text-2xl font-bold text-hgtx-lime">50+</p>
                <p className="text-xs">Vídeos</p>
              </div>
              <div className="w-px h-10 bg-neutral-600"></div>
              <div className="text-center">
                <p className="text-2xl font-bold text-hgtx-lime">10+</p>
                <p className="text-xs">Módulos</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access with Carousel */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <CardTitle>Acesso Rápido</CardTitle>
            </div>
            <div className="flex gap-2">
              <Dialog open={isAddAppModalOpen} onOpenChange={setIsAddAppModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar App
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Aplicativo</DialogTitle>
                    <DialogDescription>Pesquise e adicione um aplicativo ao acesso rápido</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Pesquisar aplicativos..."
                        value={searchApp}
                        onChange={(e) => setSearchApp(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {filteredAvailableApps.map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <app.icon className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">{app.title}</p>
                              <p className="text-sm text-muted-foreground">{app.description}</p>
                            </div>
                          </div>
                          <Button size="sm" onClick={() => addAppToQuickAccess(app)}>
                            Adicionar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              {totalQuickAccessPages > 1 && (
                <div className="flex gap-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentQuickAccessPage(Math.max(0, currentQuickAccessPage - 1))}
                    disabled={currentQuickAccessPage === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentQuickAccessPage(Math.min(totalQuickAccessPages - 1, currentQuickAccessPage + 1))}
                    disabled={currentQuickAccessPage === totalQuickAccessPages - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <CardDescription>
            Acesse rapidamente as principais funcionalidades do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search for quick access */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar aplicativo..."
                value={searchQuickAccess}
                onChange={(e) => handleQuickAccessSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Apps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentQuickAccessApps.map((action, index) => (
                <Card 
                  key={index} 
                  className="group cursor-pointer border-2 border-transparent hover:border-accent/20 hover:shadow-soft transition-all duration-300 relative"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeAppFromQuickAccess(action.id);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <CardContent className="p-4" onClick={() => navigate(action.href)}>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-gradient-subtle group-hover:bg-accent/10 transition-colors">
                        <action.icon className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">
                          {action.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Show message when no apps found */}
            {filteredQuickAccessApps.length === 0 && searchQuickAccess && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhum aplicativo encontrado para "{searchQuickAccess}"</p>
              </div>
            )}
          </div>
          
          {totalQuickAccessPages > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              {Array.from({ length: totalQuickAccessPages }, (_, i) => (
                <button
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentQuickAccessPage ? 'bg-primary' : 'bg-muted'
                  }`}
                  onClick={() => setCurrentQuickAccessPage(i)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* All Applications */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Monitor className="h-5 w-5" />
              <CardTitle>Todos os Aplicativos</CardTitle>
            </div>
            <div className="flex gap-2">
              <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filtros
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Filtrar Aplicativos</DialogTitle>
                    <DialogDescription>Filtre os aplicativos por diferentes critérios</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label>Nome</Label>
                      <Input 
                        placeholder="Digite o nome do aplicativo" 
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Sistema</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o sistema" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="portal">Portal</SelectItem>
                          <SelectItem value="mobile">Mobile</SelectItem>
                          <SelectItem value="analytics">Analytics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Módulo</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o módulo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="institucional">Institucional</SelectItem>
                          <SelectItem value="cliente">Cliente</SelectItem>
                          <SelectItem value="relatorios">Relatórios</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Função</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a função" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gestao">Gestão</SelectItem>
                          <SelectItem value="atendimento">Atendimento</SelectItem>
                          <SelectItem value="analise">Análise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                      <Button variant="outline" onClick={() => setIsFilterModalOpen(false)}>Cancelar</Button>
                      <Button>Aplicar Filtros</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              {totalAllAppsPages > 1 && (
                <div className="flex gap-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentAllAppsPage(Math.max(0, currentAllAppsPage - 1))}
                    disabled={currentAllAppsPage === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentAllAppsPage(Math.min(totalAllAppsPages - 1, currentAllAppsPage + 1))}
                    disabled={currentAllAppsPage === totalAllAppsPages - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <CardDescription>
            Listagem completa de todos os aplicativos criados no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Items per page controls */}
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome do aplicativo..."
                  value={filterName}
                  onChange={(e) => {
                    setFilterName(e.target.value);
                    setCurrentAllAppsPage(0);
                  }}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-sm whitespace-nowrap">Itens por página:</Label>
                <Select 
                  value={appsPerPageAll.toString()} 
                  onValueChange={(value) => {
                    setAppsPerPageAll(Number(value));
                    setCurrentAllAppsPage(0);
                  }}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="8">8</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="16">16</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Apps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentAllApps.map((app) => (
                <Card key={app.id} className="group cursor-pointer hover:shadow-soft transition-all duration-300 animate-fade-in">
                  <CardContent className="p-4">
                    <div className="space-y-3">

                      <div>
                        <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">
                          {app.title}
                        </h3>
                        <div className="space-y-1 mt-2">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">Sistema:</span> {app.sistema}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">Módulo:</span> {app.modulo}
                          </p>

                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination info and controls */}
            {totalAllAppsPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Mostrando {currentAllAppsPage * appsPerPageAll + 1} a {Math.min((currentAllAppsPage + 1) * appsPerPageAll, filteredAllApps.length)} de {filteredAllApps.length} aplicativos
                </p>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentAllAppsPage(Math.max(0, currentAllAppsPage - 1))}
                    disabled={currentAllAppsPage === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </Button>
                  <span className="text-sm px-3 py-2 bg-muted rounded">
                    {currentAllAppsPage + 1} de {totalAllAppsPages}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentAllAppsPage(Math.min(totalAllAppsPages - 1, currentAllAppsPage + 1))}
                    disabled={currentAllAppsPage === totalAllAppsPages - 1}
                  >
                    Próximo
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;