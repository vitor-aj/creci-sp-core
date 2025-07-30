import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Database, Plus, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export function Modules() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Módulos</h1>
          <p className="text-muted-foreground">Funcionalidades e recursos do sistema</p>
        </div>
        <Dialog onOpenChange={(open) => console.log('Modules Dialog:', open)}>
          <DialogTrigger asChild>
            <Button onClick={() => console.log('Modules button clicked')}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Módulo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Módulo</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="module-name">Nome do módulo</Label>
                <Input id="module-name" placeholder="Digite o nome do módulo" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="system-env">Sistema</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o sistema" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sis01">Nome do Sistema 01</SelectItem>
                    <SelectItem value="sis02">Nome do Sistema 02</SelectItem>
                    <SelectItem value="sis03">Nome do Sistema 03</SelectItem>
                    <SelectItem value="sis04">Nome do Sistema 04</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="system-env">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prod">Ativo</SelectItem>
                    <SelectItem value="dev">Pendente</SelectItem>
                    <SelectItem value="test">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">Cancelar</Button>
                <Button>Salvar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { name: "Gestão de Usuários", description: "Controle completo de usuários", version: "v2.1", active: true },
          { name: "Relatórios", description: "Geração de relatórios automatizados", version: "v1.8", active: true },
          { name: "Notificações", description: "Sistema de notificações push", version: "v1.2", active: false },
          { name: "API Gateway", description: "Controle de acesso à API", version: "v3.0", active: true },
          { name: "Auditoria", description: "Log de ações do sistema", version: "v1.5", active: true },
          { name: "Backup", description: "Rotinas de backup automático", version: "v2.0", active: false },
        ].map((module, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-primary" />
                <span>{module.name}</span>
              </CardTitle>
              <CardDescription>
                {module.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">
                    {module.version}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked={module.active} />
                  <Button variant="outline" size="sm">
                    <Code className="h-4 w-4" />
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