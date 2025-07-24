import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Plus, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Establishments() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Estabelecimentos</h1>
          <p className="text-muted-foreground">Gerencie locais e unidades</p>
        </div>
        <Dialog onOpenChange={(open) => console.log('Establishments Dialog:', open)}>
          <DialogTrigger asChild>
            <Button onClick={() => console.log('Establishments button clicked')}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Estabelecimento
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Estabelecimento</DialogTitle>
              <DialogDescription>
                Cadastre um novo local ou unidade
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="est-name">Nome do estabelecimento</Label>
                <Input id="est-name" placeholder="Digite o nome do estabelecimento" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="est-address">Endereço</Label>
                <Input id="est-address" placeholder="Digite o endereço completo" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="est-type">Tipo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sede">Sede</SelectItem>
                    <SelectItem value="regional">Regional</SelectItem>
                    <SelectItem value="filial">Filial</SelectItem>
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
          { name: "CRECI SP - Sede Central", address: "Av. Paulista, 1000", type: "Sede", users: 45, active: true },
          { name: "Regional Santos", address: "Rua XV de Novembro, 200", type: "Regional", users: 12, active: true },
          { name: "Regional Campinas", address: "Av. Francisco Glicério, 500", type: "Regional", users: 18, active: true },
          { name: "Regional Ribeirão Preto", address: "Rua General Osório, 300", type: "Regional", users: 8, active: false },
        ].map((establishment, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="h-5 w-5 text-primary" />
                <span>{establishment.name}</span>
              </CardTitle>
              <CardDescription className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{establishment.address}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant={establishment.active ? "default" : "secondary"}>
                    {establishment.active ? "Ativo" : "Inativo"}
                  </Badge>
                  <Badge variant="outline">
                    {establishment.type}
                  </Badge>
                </div>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{establishment.users}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}