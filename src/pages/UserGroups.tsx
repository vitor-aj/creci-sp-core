import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Shield, Plus, Users, Settings, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export function UserGroups() {
  const [usuarios, setUsuarios] = useState([]);
  const [apps, setApps] = useState([]);
  const [tipoBusca, setTipoBusca] = useState("aplicativo");

  const adicionarUsuario = () => {
    setUsuarios([...usuarios, { id: Date.now(), nome: "Usuário Exemplo" }]);
  };

  const adicionarApp = () => {
    setApps([...apps, { id: Date.now(), nome: "App Exemplo" }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Grupos de Usuário</h1>
          <p className="text-muted-foreground">
            Configure perfis de acesso e permissões
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Novo Grupo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Novo Grupo de Usuário</DialogTitle>
              <DialogDescription>
                Configure um novo perfil de acesso e permissões
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="info" className="mt-4">
              <TabsList>
                <TabsTrigger value="info">Informações</TabsTrigger>
                <TabsTrigger value="usuarios">Usuários</TabsTrigger>
                <TabsTrigger value="apps">Aplicativos</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="mt-4 grid gap-4">
                <div className="grid gap-2">
                  <Label>Nome</Label>
                  <Input placeholder="Digite o nome do grupo" />
                </div>
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="usuarios" className="mt-4 grid gap-4">
                <div className="flex gap-2">
                  <Input placeholder="Buscar usuário" />
                  <Button onClick={adicionarUsuario}>Adicionar</Button>
                </div>
                <Input placeholder="Pesquisar na tabela" className="mt-4" />
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Usuário</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usuarios.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell>{u.id}</TableCell>
                        <TableCell>{u.nome}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setUsuarios(usuarios.filter((x) => x.id !== u.id))
                            }
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="apps" className="mt-4 grid gap-4">
                <Label className="font-bold text-lg">Adicionar aplicativo</Label>
                <div className="grid md:grid-cols-4 gap-4 items-end">
                  <div className="col-span-1">
                    <Label>Inserir por</Label>
                    <Select onValueChange={setTipoBusca} defaultValue="aplicativo">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aplicativo">Aplicativo</SelectItem>
                        <SelectItem value="modulo">Módulo</SelectItem>
                        <SelectItem value="sistema">Sistema</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label>Pesquisar</Label>
                    <Input placeholder={`Buscar por ${tipoBusca}`} />
                  </div>
                  <div>
                    <Button className="mt-6" onClick={adicionarApp}>Adicionar</Button>
                  </div>
                </div>

                <Input placeholder="Pesquisar na tabela" className="mt-4" />
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Aplicativo</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apps.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell>{a.id}</TableCell>
                        <TableCell>{a.nome}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setApps(apps.filter((x) => x.id !== a.id))}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
        {[{ name: "Administradores", permissions: "Completo", users: 3 }].map(
          (group, index) => (
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
                  <Badge variant="outline">{group.permissions}</Badge>
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
          )
        )}
      </div>
    </div>
  );
}
