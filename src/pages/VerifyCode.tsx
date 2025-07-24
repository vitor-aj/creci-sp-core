
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!code || code.length !== 6) {
      toast({
        title: "Erro de validação",
        description: "Por favor, insira um código válido de 6 dígitos.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simular verificação do código
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Código verificado",
        description: "Código confirmado com sucesso.",
      });
      // Redirecionar para página de redefinição de senha
      window.location.href = `/reset-password?email=${encodeURIComponent(email)}&code=${code}`;
    }, 1500);
  };

  const resendCode = () => {
    toast({
      title: "Código reenviado",
      description: "Um novo código foi enviado para seu e-mail.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-6">
      <Card className="w-full max-w-md shadow-large">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Verificar código
          </CardTitle>
          <CardDescription>
            Digite o código de 6 dígitos enviado para<br />
            <strong>{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="code">Código de verificação</Label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="code"
                  type="text"
                  placeholder="000000"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="pl-10 text-center text-lg font-mono tracking-widest"
                  maxLength={6}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              variant="gradient"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Verificando..." : "Verificar código"}
            </Button>

            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={resendCode}
                className="text-sm text-accent hover:text-accent/80 transition-colors"
              >
                Reenviar código
              </button>
              <div>
                <a 
                  href="/forgot-password"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Voltar
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyCode;
