import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Plus, Edit, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function EmailTemplates() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Templates de E-mail</h1>
          <p className="text-muted-foreground">Gerencie modelos de e-mail do sistema</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Template
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { name: "Boas-vindas", type: "Cadastro", active: true, lastModified: "2 dias atrás" },
          { name: "Recuperação de Senha", type: "Segurança", active: true, lastModified: "1 semana atrás" },
          { name: "Notificação de Login", type: "Segurança", active: false, lastModified: "3 dias atrás" },
          { name: "Relatório Mensal", type: "Relatório", active: true, lastModified: "5 dias atrás" },
          { name: "Convite de Usuário", type: "Cadastro", active: true, lastModified: "1 dia atrás" },
          { name: "Manutenção Programada", type: "Sistema", active: false, lastModified: "2 semanas atrás" },
        ].map((template, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>{template.name}</span>
              </CardTitle>
              <CardDescription>
                Modificado {template.lastModified}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    {template.type}
                  </Badge>
                  <Badge variant={template.active ? "default" : "secondary"}>
                    {template.active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
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