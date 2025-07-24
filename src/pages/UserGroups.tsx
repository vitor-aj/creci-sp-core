import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Plus, Users, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function UserGroups() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Grupos de Usuário</h1>
          <p className="text-muted-foreground">Configure perfis de acesso e permissões</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Grupo
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { name: "Administradores", permissions: "Completo", users: 3 },
          { name: "Gerentes", permissions: "Avançado", users: 8 },
          { name: "Operadores", permissions: "Básico", users: 25 },
          { name: "Auditores", permissions: "Leitura", users: 5 },
        ].map((group, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>{group.name}</span>
              </CardTitle>
              <CardDescription>
                {group.users} usuários neste grupo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="outline">
                  {group.permissions}
                </Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
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