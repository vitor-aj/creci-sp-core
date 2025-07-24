import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Monitor, Plus, Settings, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Applications() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Aplicativos</h1>
          <p className="text-muted-foreground">Cadastre e gerencie aplicativos do sistema</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Aplicativo
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { name: "Sistema Institucional", status: "Ativo", users: 45 },
          { name: "Portal do Cliente", status: "Ativo", users: 120 },
          { name: "App Mobile", status: "Desenvolvimento", users: 0 },
          { name: "Dashboard Analytics", status: "Ativo", users: 8 },
        ].map((app, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="h-5 w-5 text-primary" />
                <span>{app.name}</span>
              </CardTitle>
              <CardDescription>
                {app.users} usuários ativos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant={app.status === "Ativo" ? "default" : "secondary"}>
                  {app.status}
                </Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}