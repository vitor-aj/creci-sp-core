import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import creciLogo from "@/assets/creci-logo.png";
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
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="relative z-10 flex flex-col justify-center items-center px-12 text-white text-center">
          <div className="mb-8">
            <img 
              src={creciLogo} 
              alt="CRECI SP Logo" 
              className="w-48 h-auto mb-6 mx-auto filter brightness-0 invert"
            />
            <h1 className="text-5xl font-bold mb-4 tracking-wide">CORE</h1>
            <div className="w-16 h-1 bg-white mx-auto mb-4 rounded-full"></div>
            <p className="text-xl font-light mb-2 text-white/90">
              Plataforma Integrada
            </p>
            <p className="text-lg text-white/80 leading-relaxed max-w-md">
              Sistema unificado que conecta e gerencia todos os sistemas do CRECI-SP em uma única plataforma moderna e eficiente.
            </p>
          </div>
        </div>
        
        {/* Modern geometric decoration */}
        <div className="absolute top-10 right-10 w-32 h-32 border-2 border-white/10 rounded-3xl rotate-12" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white/20 rounded-2xl -rotate-12" />
        <div className="absolute top-1/2 left-10 w-16 h-16 border-2 border-white/15 rounded-full" />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-subtle p-6">
        <Card className="w-full max-w-md shadow-large border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <img 
                src={creciLogo} 
                alt="CRECI SP Logo" 
                className="w-20 h-auto"
              />
            </div>
            <CardTitle className="text-3xl font-bold text-primary mb-2">
              Bem-vindo ao CORE
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Acesse a plataforma integrada do CRECI-SP
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