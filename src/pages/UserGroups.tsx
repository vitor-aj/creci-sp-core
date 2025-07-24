import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Grupo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Grupo de Usuário</DialogTitle>
              <DialogDescription>
                Configure um novo perfil de acesso e permissões
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="group-name">Nome do grupo</Label>
                <Input id="group-name" placeholder="Digite o nome do grupo" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="group-permissions">Nível de permissão</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Completo</SelectItem>
                    <SelectItem value="advanced">Avançado</SelectItem>
                    <SelectItem value="basic">Básico</SelectItem>
                    <SelectItem value="readonly">Leitura</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="group-description">Descrição</Label>
                <Textarea id="group-description" placeholder="Descreva as responsabilidades do grupo" />
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