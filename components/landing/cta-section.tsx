import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-32 bg-gradient-to-br from-purple-950 via-pink-950 to-orange-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950" />
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 border border-purple-500/30 px-4 py-2 text-sm text-purple-300">
            <Sparkles className="h-4 w-4" />
            <span>Comece agora, sem compromisso</span>
          </div>

          <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
            Pronto para <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">explodir</span><br />
            suas conversões?
          </h2>

          <p className="text-xl sm:text-2xl text-slate-300 max-w-2xl mx-auto">
            Junte-se a centenas de empresas que já transformaram visitantes em clientes qualificados
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="bg-white text-purple-950 hover:bg-slate-100 font-bold px-10 py-7 text-lg rounded-full shadow-2xl transition-all hover:scale-105">
              Criar Meu Primeiro Funil
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-7 text-lg rounded-full">
              Falar com Especialista
            </Button>
          </div>

          <div className="pt-8 text-slate-400">
            <p className="text-sm">Não precisa de cartão de crédito • Cancele quando quiser</p>
          </div>
        </div>
      </div>
    </section>
  );
}
