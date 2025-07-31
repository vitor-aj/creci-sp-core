import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    toast
  } = useToast();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular validação
    if (!email || !password) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Simular login
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/select-establishment";
    }, 1500);
  };
  return <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col justify-center items-center px-12 text-gray-800 w-full">
          <div className="mb-8 text-center">
            <img 
              src="/src/assets/creci-logo.png" 
              alt="CRECI SP Logo" 
              className="h-32 w-auto mx-auto mb-6"
            />
            <h1 className="text-3xl font-bold mb-4 text-gray-800">
              Sistema Integrado CRECI SP
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Conselho Regional de Corretores de Imóveis
            </p>
            <p className="text-base text-gray-500">
              2ª Região - São Paulo
            </p>
          </div>
          
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-600">
              Plataforma oficial para gestão e controle
            </p>
            <p className="text-sm text-gray-600">
              de atividades do CRECI SP
            </p>
          </div>
        </div>
        
        {/* Subtle decoration */}
        <div className="absolute top-20 right-20 w-16 h-16 border border-gray-200 rounded-full opacity-50" />
        <div className="absolute bottom-32 right-32 w-12 h-12 border border-gray-300 rounded-full opacity-30" />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-subtle p-6">
        <Card className="w-full max-w-md shadow-large">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">
              Bem-vindo de volta
            </CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
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

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="Digite sua senha" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 pr-10" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <a href="/forgot-password" className="text-sm text-accent hover:text-accent/80 transition-colors">
                  Esqueci minha senha
                </a>
              </div>

              <Button type="submit" variant="gradient" className="w-full" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Login;