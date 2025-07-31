import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const applicationsData = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  title: `Aplicativo ${i + 1}`,
  status: Math.random() > 0.3 ? "Ativo" : "Inativo"
}));

export function Applications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingApp, setEditingApp] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingApp, setDeletingApp] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredApplications = applicationsData.filter(app =>
    app.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = filteredApplications.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (app: any) => {
    setEditingApp(app);
    setIsEditModalOpen(true);
  };

  const handleDelete = (app: any) => {
    setDeletingApp(app);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log(`Delete application ${deletingApp.id}`);
    setIsDeleteModalOpen(false);
    setDeletingApp(null);
  };

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
                  <Table className="mt-2">
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Estabelecimento</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Estabelecimento A</TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
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

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.id}</TableCell>
                  <TableCell>{app.title}</TableCell>
                  <TableCell>
                    <Badge variant={app.status === "Ativo" ? "default" : "outline"}>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(app)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(app)}>
                        <Trash2 className="h-4 w-4 mr-1" />
                        Excluir
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Registros por página:</span>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {isEditModalOpen && editingApp && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Editar Aplicativo</DialogTitle>
              <DialogDescription>
                Edite as informações do aplicativo {editingApp.title}
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="config" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="config">Configuração</TabsTrigger>
                <TabsTrigger value="establishments">Estabelecimentos</TabsTrigger>
              </TabsList>
              <TabsContent value="config" className="grid gap-4 mt-4">
                <div className="grid gap-2">
                  <Label>Nome</Label>
                  <Input defaultValue={editingApp.title} />
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
                      <Switch id={`switch-edit-${index}`} />
                      <Label htmlFor={`switch-edit-${index}`}>{item.label}</Label>
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
                    <Switch id="disponivel-edit" defaultChecked={editingApp.status === "Ativo"} />
                    <Label htmlFor="disponivel-edit">Disponível</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="ativo-edit" defaultChecked={editingApp.status === "Ativo"} />
                    <Label htmlFor="ativo-edit">Ativo</Label>
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
                  <Table className="mt-2">
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Estabelecimento</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Estabelecimento A</TableCell>
                        <TableCell>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancelar</Button>
              <Button>Salvar</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Modal */}
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o aplicativo "{deletingApp?.title}"?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
