import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    toast
  } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!email) {
      toast({
        title: "Erro de validação",
        description: "Por favor, insira seu e-mail.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Simular envio de código
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "E-mail enviado",
        description: "As instruções para recuperação da senha foram enviadas para seu e-mail."
      });
      // Redirecionar para página de verificação
      window.location.href = `/reset-password`;
    }, 3000);
  };
  return <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-6">
      <Card className="w-full max-w-md shadow-large">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Esqueci minha senha
          </CardTitle>
          <CardDescription>Informe seu e-mail de acesso que enviaremos as instruções para recuperar sua senha</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
              </div>
            </div>

            <Button type="submit" variant="gradient" className="w-full" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar"}
            </Button>

            <div className="text-center">
              <a href="/login" className="inline-flex items-center text-sm text-accent hover:text-accent/80 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Voltar para login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>;
};
export default ForgotPassword;