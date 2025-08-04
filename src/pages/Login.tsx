import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import creciLogo from "@/assets/creci-sp-logo.png";
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
  return <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <img src={creciLogo} alt="CRECI SP Logo" className="w-32 h-auto" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">CRECI CORE</h1>
          <div className="w-16 h-1 bg-primary mx-auto mb-4 rounded-full" />
          <p className="text-lg text-gray-600 font-light">
            Plataforma Integrada CRECI-SP
          </p>
        </div>

        {/* Login Form */}
        <Card className="border-0 shadow-xl bg-white">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-semibold text-gray-900 mb-2">
              Fazer Login
            </CardTitle>
            <CardDescription className="text-gray-500">
              Digite suas credenciais para continuar
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  E-mail
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10 h-12 text-base border-gray-200 bg-gray-50 focus:bg-white focus:border-primary transition-all duration-200" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="Digite sua senha" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 pr-10 h-12 text-base border-gray-200 bg-gray-50 focus:bg-white focus:border-primary transition-all duration-200" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <a href="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                  Esqueci minha senha
                </a>
              </div>

              <Button type="submit" className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white transition-all duration-200 shadow-lg hover:shadow-xl" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar no CORE"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">© 2025 CRECI-SP. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>;
};
export default Login;