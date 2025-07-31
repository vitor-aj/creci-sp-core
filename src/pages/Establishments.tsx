import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Plus, Search, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Establishments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEstablishment, setEditingEstablishment] = useState<any>(null);

  const establishments = [
    { id: 1, name: "CRECI SP - Sede Central", icon: "", favicon: "", status: "Ativo" },
    { id: 2, name: "Regional Santos", icon: "", favicon: "", status: "Ativo" },
    { id: 3, name: "Regional Campinas", icon: "", favicon: "", status: "Ativo" },
    { id: 4, name: "Regional Ribeirão Preto", icon: "", favicon: "", status: "Inativo" },
    { id: 5, name: "Regional Sorocaba", icon: "", favicon: "", status: "Ativo" },
    { id: 6, name: "Regional São José dos Campos", icon: "", favicon: "", status: "Ativo" },
  ];

  const itemsPerPage = 5;
  
  const filteredEstablishments = establishments.filter(establishment =>
    establishment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEstablishments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEstablishments = filteredEstablishments.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (establishment: any) => {
    setEditingEstablishment(establishment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEstablishment(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Estabelecimentos</h1>
          <p className="text-muted-foreground">Gerencie locais e unidades</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingEstablishment(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Estabelecimento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingEstablishment ? "Editar Estabelecimento" : "Novo Estabelecimento"}
              </DialogTitle>
              <DialogDescription>
                {editingEstablishment ? "Edite as informações do estabelecimento" : "Cadastre um novo estabelecimento"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="est-name">Nome</Label>
                <Input 
                  id="est-name" 
                  placeholder="Digite o nome do estabelecimento"
                  defaultValue={editingEstablishment?.name || ""}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="est-icon">Ícone</Label>
                <Input 
                  id="est-icon" 
                  placeholder="URL do ícone"
                  defaultValue={editingEstablishment?.icon || ""}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="est-favicon">Favicon</Label>
                <Input 
                  id="est-favicon" 
                  placeholder="URL do favicon"
                  defaultValue={editingEstablishment?.favicon || ""}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="est-status">Status</Label>
                <Select defaultValue={editingEstablishment?.status.toLowerCase() || "ativo"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={handleCloseModal}>Cancelar</Button>
                <Button onClick={handleCloseModal}>Salvar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedEstablishments.map((establishment) => (
              <TableRow key={establishment.id}>
                <TableCell className="font-medium">{establishment.id}</TableCell>
                <TableCell>{establishment.name}</TableCell>
                <TableCell>
                  <Badge variant={establishment.status === "Ativo" ? "default" : "secondary"}>
                    {establishment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(establishment)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}