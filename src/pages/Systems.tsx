import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Plus, Server, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Systems() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sistemas</h1>
          <p className="text-muted-foreground">Configure ambientes e infraestrutura</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Sistema
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { name: "Produção", environment: "PROD", status: "Online", uptime: "99.9%" },
          { name: "Homologação", environment: "HML", status: "Online", uptime: "98.5%" },
          { name: "Desenvolvimento", environment: "DEV", status: "Manutenção", uptime: "95.2%" },
          { name: "Teste", environment: "TEST", status: "Online", uptime: "97.8%" },
        ].map((system, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-primary" />
                <span>{system.name}</span>
              </CardTitle>
              <CardDescription>
                Ambiente {system.environment}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge variant={system.status === "Online" ? "default" : "secondary"}>
                    {system.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Uptime:</span>
                  <span className="text-sm font-medium">{system.uptime}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Server className="h-4 w-4 mr-1" />
                    Config
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Activity className="h-4 w-4 mr-1" />
                    Monitor
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