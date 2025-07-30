import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const establishments = [
  {
    id: 1,
    name: "CRECI SP - Sede Central",
    address: "Av. Paulista, 1000 - São Paulo/SP",
    type: "Sede",
    users: 45,
    active: true
  },
  {
    id: 2,
    name: "CRECI SP - Regional Santos",
    address: "Rua XV de Novembro, 200 - Santos/SP",
    type: "Regional",
    users: 12,
    active: true
  },
  {
    id: 3,
    name: "CRECI SP - Regional Campinas",
    address: "Av. Francisco Glicério, 500 - Campinas/SP",
    type: "Regional",
    users: 18,
    active: true
  },
  {
    id: 4,
    name: "CRECI SP - Regional Ribeirão Preto",
    address: "Rua General Osório, 300 - Ribeirão Preto/SP",
    type: "Regional",
    users: 8,
    active: false
  }
];

export function SelectEstablishment() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredEstablishments = establishments.filter(est =>
    est.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    est.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 md:grid-cols-2">
          {filteredEstablishments.map((establishment) => (
            <Card 
              key={establishment.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
                !establishment.active ? 'opacity-60' : ''
              }`}
              onClick={() => establishment.active && handleSelectEstablishment(establishment.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{establishment.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {establishment.address}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={establishment.active ? "default" : "secondary"}>
                    {establishment.active ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{establishment.users} usuários</span>
                  </div>
                  <Badge variant="outline">
                    {establishment.type}
                  </Badge>
                </div>
                {establishment.active && (
                  <Button 
                    className="w-full mt-4" 
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

        {filteredEstablishments.length === 0 && (
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