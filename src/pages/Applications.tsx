import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Monitor, Plus, Settings, Globe, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Applications() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Aplicativos</h1>
          <p className="text-muted-foreground">Cadastre e gerencie aplicativos do sistema</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Aplicativo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Novo Aplicativo</DialogTitle>
              <DialogDescription>Cadastre um novo aplicativo no sistema</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="config" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="config">Configuração</TabsTrigger>
                <TabsTrigger value="establishments">Estabelecimentos</TabsTrigger>
              </TabsList>
              <TabsContent value="config" className="grid gap-4 mt-4">
                <div className="grid gap-2">
                  <Label>Nome</Label>
                  <Input placeholder="Nome do aplicativo" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="icon">Ícone</Label>
                  <Input id="icon" type="file" accept="image/*" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Tipo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="app">Aplicativo</SelectItem>
                        <SelectItem value="process">Processo</SelectItem>
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
                        <SelectItem value="config">Configuração</SelectItem>
                        <SelectItem value="operation">Operação</SelectItem>
                        <SelectItem value="management">Gestão</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Permite webview" },
                    { label: "Exibir no dashboard" },
                    { label: "Nativo Mobile" },
                    { label: "Ferramenta de terceiro" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Switch id={`switch-${index}`} />
                      <Label htmlFor={`switch-${index}`}>{item.label}</Label>
                    </div>
                  ))}
                </div>
                <div className="grid gap-2">
                  <Label>URL de destino</Label>
                  <Input placeholder="https://exemplo.com" />
                </div>
                <div className="grid gap-2">
                  <Label>Função</Label>
                  <Input placeholder="Função do aplicativo" />
                </div>
                <div className="grid gap-2">
                  <Label>Descrição</Label>
                  <Textarea placeholder="Descrição do aplicativo" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Switch id="disponivel" />
                    <Label htmlFor="disponivel">Disponível</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="ativo" />
                    <Label htmlFor="ativo">Ativo</Label>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Mensagem de indisponibilidade</Label>
                  <Input placeholder="Ex: Aplicativo temporariamente fora do ar" />
                </div>
              </TabsContent>
              <TabsContent value="establishments" className="grid gap-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="grid gap-2">
                    <Label>Estabelecimento</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Estabelecimento A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Sistema</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Sistema X</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Módulo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Módulo Y</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="mt-2">Adicionar</Button>
                </div>
                <div className="mt-4">
                  <Label>Estabelecimentos adicionados</Label>
                  <div className="border rounded-md overflow-hidden mt-2">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-4 py-2 text-left">ID</th>
                          <th className="px-4 py-2 text-left">Estabelecimento</th>
                          <th className="px-4 py-2 text-right">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2">1</td>
                          <td className="px-4 py-2">Estabelecimento A</td>
                          <td className="px-4 py-2 text-right">
                            <Button size="icon" variant="ghost">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline">Cancelar</Button>
              <Button>Salvar</Button>
            </div>
          </DialogContent>
        </Dialog>
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
