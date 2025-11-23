import { IconChevronRight, IconSparkles } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 border border-purple-500/20 px-4 py-2 text-sm text-purple-300">
            <IconSparkles className="h-4 w-4" />
            <span>Primeiro criador de funis interativos do Brasil</span>
          </div>

          <h1 className="font-black text-5xl sm:text-6xl lg:text-7xl text-white leading-tight">
            Funis que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              engajam
            </span>
            ,<br />
            convertem e{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
              explodem
            </span>{" "}
            vendas
          </h1>

          <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Crie quizzes e funis dinâmicos que transformam visitantes em
            clientes qualificados. Sem código. Sem complicação. Só resultados.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-2xl shadow-purple-500/50 transition-all hover:scale-105"
            >
              Criar Meu Funil Grátis
              <IconChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-purple-500/50 text-white hover:bg-purple-500/10 px-8 py-6 text-lg rounded-full"
            >
              Ver Exemplo ao Vivo
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 pt-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span>Sem cartão de crédito</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span>Setup em 5 minutos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}
