import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building, Search, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const establishments = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: i < 4 ? 
    ["CRECI SP - Sede Central", "CRECI SP - Regional Santos", "CRECI SP - Regional Campinas", "CRECI SP - Regional Ribeirão Preto"][i] :
    `CRECI SP - Regional ${i + 1}`,
  status: Math.random() > 0.2 ? "Ativo" : "Inativo"
}));

export function SelectEstablishment() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 6;

  const filteredEstablishments = establishments.filter(est =>
    est.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEstablishments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEstablishments = filteredEstablishments.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectEstablishment = (establishmentId: number) => {
    // Aqui você salvaria o estabelecimento selecionado (localStorage, context, etc.)
    localStorage.setItem('selectedEstablishment', establishmentId.toString());
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Selecione o Estabelecimento
          </h1>
          <p className="text-muted-foreground">
            Escolha o estabelecimento que deseja acessar para continuar
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar estabelecimento..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedEstablishments.map((establishment) => (
            <Card 
              key={establishment.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
                establishment.status !== "Ativo" ? 'opacity-60' : ''
              }`}
              onClick={() => establishment.status === "Ativo" && handleSelectEstablishment(establishment.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{establishment.name}</CardTitle>
                    </div>
                  </div>
                  <Badge variant={establishment.status === "Ativo" ? "default" : "secondary"}>
                    {establishment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {establishment.status === "Ativo" && (
                  <Button 
                    className="w-full" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectEstablishment(establishment.id);
                    }}
                  >
                    Acessar Estabelecimento
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
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

        {paginatedEstablishments.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Nenhum estabelecimento encontrado
            </h3>
            <p className="text-muted-foreground">
              Tente ajustar o termo de busca ou entre em contato com o administrador.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}