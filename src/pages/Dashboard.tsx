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
  ChevronRight
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchApp, setSearchApp] = useState("");
  const [currentQuickAccessPage, setCurrentQuickAccessPage] = useState(0);
  const [isAddAppModalOpen, setIsAddAppModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [quickAccessApps, setQuickAccessApps] = useState([
    { id: 1, title: "Usuários", description: "Gerenciar usuários", icon: Users, href: "/usuarios" },
    { id: 2, title: "Aplicativos", description: "Cadastrar e configurar apps", icon: Monitor, href: "/aplicativos" },
    { id: 3, title: "Grupos", description: "Definir perfis de acesso", icon: Shield, href: "/grupos" },
    { id: 4, title: "Estabelecimentos", description: "Gerenciar locais", icon: Building, href: "/estabelecimentos" },
    { id: 5, title: "Módulos", description: "Configurar funcionalidades", icon: Database, href: "/modulos" },
    { id: 6, title: "Templates", description: "Modelos de e-mail", icon: Mail, href: "/templates" }
  ]);

  const allApps = [
    { id: 1, title: "Sistema Institucional", sistema: "Portal", modulo: "Institucional", funcao: "Gestão", status: "Ativo" },
    { id: 2, title: "Portal do Cliente", sistema: "Portal", modulo: "Cliente", funcao: "Atendimento", status: "Ativo" },
    { id: 3, title: "App Mobile", sistema: "Mobile", modulo: "App", funcao: "Mobile", status: "Desenvolvimento" },
    { id: 4, title: "Dashboard Analytics", sistema: "Analytics", modulo: "Relatórios", funcao: "Análise", status: "Ativo" },
    { id: 5, title: "Sistema de Licenças", sistema: "Licenças", modulo: "Controle", funcao: "Regulamentação", status: "Ativo" },
    { id: 6, title: "Portal de Denúncias", sistema: "Ouvidoria", modulo: "Denúncias", funcao: "Fiscalização", status: "Ativo" },
    { id: 7, title: "Sistema de Multas", sistema: "Multas", modulo: "Sanções", funcao: "Punição", status: "Inativo" },
    { id: 8, title: "App Corretor", sistema: "Mobile", modulo: "Corretor", funcao: "Profissional", status: "Ativo" }
  ];

  const stats = [
    { title: "Usuários Ativos", value: "234", icon: Users, color: "text-blue-600" },
    { title: "Aplicativos", value: "12", icon: Monitor, color: "text-green-600" },
    { title: "Estabelecimentos", value: "8", icon: Building, color: "text-purple-600" },
    { title: "Módulos", value: "24", icon: Database, color: "text-orange-600" },
  ];

  const availableApps = [
    { id: 7, title: "Sistema de Multas", description: "Controle de sanções", icon: Shield },
    { id: 8, title: "Portal de Denúncias", description: "Ouvidoria digital", icon: Mail },
    { id: 9, title: "App Corretor", description: "Aplicativo para corretores", icon: Monitor },
    { id: 10, title: "Sistema de Licenças", description: "Controle de licenciamento", icon: Database }
  ];

  const appsPerPage = 3;
  const totalQuickAccessPages = Math.ceil(quickAccessApps.length / appsPerPage);
  
  const currentQuickAccessApps = quickAccessApps.slice(
    currentQuickAccessPage * appsPerPage,
    (currentQuickAccessPage + 1) * appsPerPage
  );

  const filteredAvailableApps = availableApps.filter(app =>
    app.title.toLowerCase().includes(searchApp.toLowerCase())
  );

  const addAppToQuickAccess = (app: any) => {
    if (!quickAccessApps.find(qa => qa.id === app.id)) {
      setQuickAccessApps([...quickAccessApps, { 
        ...app, 
        href: "/aplicativos" // Default href for new apps
      }]);
    }
    setIsAddAppModalOpen(false);
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentQuickAccessApps.map((action, index) => (
              <Card 
                key={index} 
                className="group cursor-pointer border-2 border-transparent hover:border-accent/20 hover:shadow-soft transition-all duration-300"
                onClick={() => navigate(action.href)}
              >
                <CardContent className="p-4">
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
                    <Input placeholder="Digite o nome do aplicativo" />
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
          </div>
          <CardDescription>
            Listagem completa de todos os aplicativos criados no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {allApps.map((app) => (
              <Card key={app.id} className="group cursor-pointer hover:shadow-soft transition-all duration-300">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Monitor className="h-6 w-6 text-primary" />
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        app.status === 'Ativo' 
                          ? 'bg-green-100 text-green-800' 
                          : app.status === 'Desenvolvimento'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {app.status}
                      </span>
                    </div>
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
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium">Função:</span> {app.funcao}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;