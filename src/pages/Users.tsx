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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Users as UsersIcon, Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export function Users() {
  const [vinculoModalOpen, setVinculoModalOpen] = useState(false);
  const [vinculos, setVinculos] = useState<
    { estabelecimento: string; nivel: string; telegram: string }[]
  >([]);

  const adicionarVinculo = (v: {
    estabelecimento: string;
    nivel: string;
    telegram: string;
  }) => {
    setVinculos([...vinculos, v]);
    setVinculoModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie os usuários do sistema
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Novo Usuário</DialogTitle>
              <DialogDescription>
                Cadastre um novo usuário no sistema
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="info" className="mt-4">
              <TabsList>
                <TabsTrigger value="info">Informações</TabsTrigger>
                <TabsTrigger value="vinculos">Vínculos</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="mt-4 grid gap-4">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                    Foto
                  </div>
                  <Input type="file" accept="image/*" />
                </div>

                <div className="grid gap-2">
                  <Label>Nome completo</Label>
                  <Input placeholder="Digite o nome completo" />
                </div>
                <div className="grid gap-2">
                  <Label>E-mail</Label>
                  <Input type="email" placeholder="Digite o e-mail" />
                </div>
                <div className="grid gap-2">
                  <Label>Data de nascimento</Label>
                  <Input type="date" />
                </div>
                <div className="grid gap-2">
                  <Label>Senha</Label>
                  <Input type="password" placeholder="Digite a senha" />
                </div>
              </TabsContent>

              <TabsContent value="vinculos" className="mt-4 grid gap-4">
                <Button onClick={() => setVinculoModalOpen(true)}>
                  Novo vínculo
                </Button>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estabelecimento</TableHead>
                      <TableHead>Nível de Acesso</TableHead>
                      <TableHead>ID Telegram</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vinculos.map((v, i) => (
                      <TableRow key={i}>
                        <TableCell>{v.estabelecimento}</TableCell>
                        <TableCell>{v.nivel}</TableCell>
                        <TableCell>{v.telegram}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setVinculos(vinculos.filter((_, idx) => idx !== i))
                            }
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {vinculoModalOpen && (
                  <Dialog open={vinculoModalOpen} onOpenChange={setVinculoModalOpen}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Novo Vínculo</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label>Estabelecimento</Label>
                          <Select onValueChange={() => {}}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="est1">Estabelecimento 1</SelectItem>
                              <SelectItem value="est2">Estabelecimento 2</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label>Nível de Acesso</Label>
                          <Select
                            onValueChange={(nivel) =>
                              adicionarVinculo({
                                estabelecimento: "Estabelecimento X",
                                nivel,
                                telegram: "123456789"
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="administrador">Administrador</SelectItem>
                              <SelectItem value="interno">Interno</SelectItem>
                              <SelectItem value="externo">Externo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label>ID Telegram</Label>
                          <Input placeholder="Digite o ID do Telegram" />
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setVinculoModalOpen(false)}
                          >
                            Cancelar
                          </Button>
                          <Button onClick={() => {}}>Cadastrar</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
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
        {[1, 2, 3, 4, 5, 6].map((user) => (
          <Card key={user}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UsersIcon className="h-5 w-5 text-primary" />
                <span>Usuário {user}</span>
              </CardTitle>
              <CardDescription>
                usuario{user}@creci.sp.gov.br
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Administrador</span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
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
