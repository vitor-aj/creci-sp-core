import { useState } from "react";
import { 
  Home, 
  Users, 
  Monitor, 
  Shield, 
  Building, 
  Database, 
  Settings,
  Mail,
  FileText,
  User,
  LogOut,
  ChevronDown
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import logoImage from "@/assets/creci-logo.png";

const navigationItems = [
  { 
    title: "Dashboard", 
    url: "/dashboard", 
    icon: Home 
  },
];

const managementItems = [
  { 
    title: "Usuários", 
    url: "/usuarios", 
    icon: Users,
    description: "Gerenciar usuários do sistema" 
  },
  { 
    title: "Aplicativos", 
    url: "/aplicativos", 
    icon: Monitor,
    description: "Cadastrar aplicativos" 
  },
  { 
    title: "Grupos de Usuário", 
    url: "/grupos", 
    icon: Shield,
    description: "Perfis de acesso" 
  },
  { 
    title: "Estabelecimentos", 
    url: "/estabelecimentos", 
    icon: Building,
    description: "Gerenciar locais" 
  },
  { 
    title: "Módulos", 
    url: "/modulos", 
    icon: Database,
    description: "Funcionalidades do sistema" 
  },
  { 
    title: "Sistemas", 
    url: "/sistemas", 
    icon: Settings,
    description: "Configurar ambientes" 
  },
  { 
    title: "Templates de E-mail", 
    url: "/templates", 
    icon: Mail,
    description: "Modelos de e-mail" 
  },
];

export function AppSidebar() {
  const { state, openMobile, setOpenMobile } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-to-r from-accent/20 to-accent/10 text-accent font-medium border-l-3 border-accent shadow-sm" 
      : "hover:bg-gradient-to-r hover:from-muted/60 hover:to-muted/30 hover:shadow-sm text-muted-foreground hover:text-foreground hover:border-l-2 hover:border-accent/30 transition-all duration-200";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      {/* Header */}
      <SidebarHeader className="border-b border-border h-16 flex items-center px-4">
        <div className="flex items-center space-x-3">
          <img 
            src={logoImage} 
            alt="CRECI SP" 
            className="w-8 h-8 object-contain"
          />
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-primary">CRECI SP</h2>
              <p className="text-xs text-muted-foreground">Sistema Institucional</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-poppins font-medium text-muted-foreground/70 uppercase tracking-wider">Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-poppins font-medium text-muted-foreground/70 uppercase tracking-wider">Gerenciamento</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && (
                        <div className="flex-1">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs font-poppins text-muted-foreground/80 font-light">
                            {item.description}
                          </div>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-border p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs bg-accent text-accent-foreground">
                  JS
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <>
                  <div className="flex-1 text-left ml-2">
                    <div className="text-sm font-medium">João Silva</div>
                    <div className="text-xs text-muted-foreground">Administrador</div>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              Minha Conta
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}