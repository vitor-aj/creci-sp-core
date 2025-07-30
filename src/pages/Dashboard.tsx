import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Settings, 
  FileText, 
  Database, 
  Shield, 
  Building, 
  Mail,
  Monitor,
  BarChart3,
  Bell
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const stats = [
    { title: "Usuários Ativos", value: "234", icon: Users, color: "text-blue-600" },
    { title: "Aplicativos", value: "12", icon: Monitor, color: "text-green-600" },
    { title: "Estabelecimentos", value: "8", icon: Building, color: "text-purple-600" },
    { title: "Módulos", value: "24", icon: Database, color: "text-orange-600" },
  ];

  const quickActions = [
    { title: "Usuários", description: "Gerenciar usuários do sistema", icon: Users, href: "/usuarios" },
    { title: "Aplicativos", description: "Cadastrar e configurar apps", icon: Monitor, href: "/aplicativos" },
    { title: "Grupos", description: "Definir perfis de acesso", icon: Shield, href: "/grupos" },
    { title: "Estabelecimentos", description: "Gerenciar locais", icon: Building, href: "/estabelecimentos" },
    { title: "Módulos", description: "Configurar funcionalidades", icon: Database, href: "/modulos" },
    { title: "Templates", description: "Modelos de e-mail", icon: Mail, href: "/templates" },
  ];

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

      {/* Quick Actions */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Acesso Rápido</span>
          </CardTitle>
          <CardDescription>
            Acesse rapidamente as principais funcionalidades do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
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
        </CardContent>
      </Card>

     
    </div>
  );
};

export default Dashboard;