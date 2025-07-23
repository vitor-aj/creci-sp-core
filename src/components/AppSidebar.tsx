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
      ? "bg-primary/90 text-primary-foreground font-medium shadow-sm" 
      : "hover:bg-muted/80 text-foreground/70 hover:text-foreground transition-all duration-200";

  return (
    <Sidebar className={`${isCollapsed ? "w-16" : "w-56"} transition-all duration-300 ease-in-out`} collapsible="icon">
      {/* Header */}
      <SidebarHeader className="border-b border-border h-16 flex items-center justify-center px-2">
        <div className="flex items-center space-x-3">
          <img 
            src={logoImage} 
            alt="CRECI SP" 
            className={`object-contain ${isCollapsed ? 'w-10 h-10' : 'w-8 h-8'}`}
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
        <SidebarGroup className="space-y-1">
          <SidebarGroupLabel className="text-xs font-poppins font-medium text-muted-foreground/70 uppercase tracking-wider py-2 px-1.5">Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={`py-3 px-2 ${getNavClass}`}>
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
        <SidebarGroup className="space-y-1">
          <SidebarGroupLabel className="text-xs font-poppins font-medium text-muted-foreground/70 uppercase tracking-wider py-2 px-1.5">Gerenciamento</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={`py-3 px-2 ${getNavClass}`}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-border p-1.5 flex items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-center group hover:bg-muted/50">
              <Avatar className="h-6 w-6 ring-2 ring-primary/30 transition-all duration-200">
                <AvatarFallback className="text-xs bg-accent text-accent-foreground">
                  JS
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <>
                  <div className="flex-1 text-left ml-2">
                    <div className="text-sm font-medium">João Silva</div>
                    <div className="text-xs text-muted-foreground group-hover:text-primary transition-colors duration-200">Administrador</div>
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