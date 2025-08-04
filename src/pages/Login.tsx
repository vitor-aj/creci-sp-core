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
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/95 to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10" />
        
        {/* Floating elements */}
        <div className="absolute top-20 right-16 w-32 h-32 bg-white/5 rounded-3xl rotate-12 backdrop-blur-sm" />
        <div className="absolute bottom-32 right-24 w-20 h-20 bg-white/10 rounded-2xl -rotate-12 backdrop-blur-sm" />
        <div className="absolute top-1/3 left-12 w-16 h-16 bg-white/5 rounded-full backdrop-blur-sm" />
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-white/10 rounded-xl rotate-45 backdrop-blur-sm" />
        
        <div className="relative z-10 flex flex-col justify-center items-center px-16 text-white text-center">
          <div className="max-w-md">
            <div className="mb-8">
              <img 
                src={creciLogo} 
                alt="CRECI SP Logo" 
                className="w-40 h-auto mb-8 mx-auto drop-shadow-2xl"
                style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 20px rgba(255,255,255,0.3))' }}
              />
              <h1 className="text-6xl font-bold mb-4 tracking-tight bg-gradient-to-r from-white to-white/90 bg-clip-text">
                CORE
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-white/80 to-white/40 mx-auto mb-6 rounded-full" />
              <p className="text-2xl font-light mb-6 text-white/95">
                Plataforma Integrada
              </p>
              <p className="text-lg text-white/85 leading-relaxed font-light">
                O hub central que conecta todos os sistemas do CRECI-SP em uma experiência unificada e moderna.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-muted/10 to-background p-8">
        <Card className="w-full max-w-lg shadow-2xl border-0 bg-card/80 backdrop-blur-lg">
          <CardHeader className="text-center pb-8 pt-10">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-2xl">
                <img 
                  src={creciLogo} 
                  alt="CRECI SP Logo" 
                  className="w-16 h-auto"
                />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-primary mb-3 tracking-tight">
              Bem-vindo ao CORE
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground/80">
              Faça login para acessar a plataforma integrada
            </CardDescription>
          </CardHeader>
          <CardContent className="px-10 pb-10">
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-medium">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="seu@email.com" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    className="pl-12 h-12 text-base border-2 bg-background/50 focus:bg-background transition-all duration-200" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-medium">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Digite sua senha" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    className="pl-12 pr-12 h-12 text-base border-2 bg-background/50 focus:bg-background transition-all duration-200" 
                    required 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <a 
                  href="/forgot-password" 
                  className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Esqueci minha senha
                </a>
              </div>

              <Button 
                type="submit" 
                variant="gradient" 
                className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200" 
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar no CORE"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Login;