import {
  IconBolt,
  IconChartBar,
  IconCode,
  IconPalette,
  IconPuzzle,
  IconSparkles,
} from "@tabler/icons-react";

export function FeaturesBento() {
  return (
    <section className="py-32 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            Design{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              incrível
            </span>
            .<br />
            Poder{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">
              ilimitado
            </span>
            .
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Tudo que você precisa para criar funis que convertem de verdade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-8 sm:p-12 hover:border-purple-500/50 transition-all group">
            <IconPalette className="h-12 w-12 text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-3xl text-white mb-4">
              +50 Widgets Prontos
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              Botões, textos, imagens, vídeos, quizzes, formulários, timers,
              progress bars e muito mais. Arraste, solte e personalize cada
              detalhe.
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-900/30 to-orange-900/30 backdrop-blur-sm border border-pink-500/30 rounded-3xl p-8 hover:border-pink-500/50 transition-all group">
            <IconBolt className="h-12 w-12 text-pink-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-2xl text-white mb-4">Sem Código</h3>
            <p className="text-slate-300 leading-relaxed">
              Interface visual intuitiva. Crie funis profissionais sem escrever
              uma linha de código.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 backdrop-blur-sm border border-orange-500/30 rounded-3xl p-8 hover:border-orange-500/50 transition-all group">
            <IconPuzzle className="h-12 w-12 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-2xl text-white mb-4">
              Lógica Condicional
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Crie fluxos inteligentes baseados nas respostas dos usuários.
            </p>
          </div>

          <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-blue-500/30 rounded-3xl p-8 sm:p-12 hover:border-blue-500/50 transition-all group">
            <IconSparkles className="h-12 w-12 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-3xl text-white mb-4">
              Customização Total
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              Cores, fontes, espaçamentos, bordas, sombras. Cada pixel sob seu
              controle. Crie funis que combinam perfeitamente com sua marca.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm border border-green-500/30 rounded-3xl p-8 hover:border-green-500/50 transition-all group">
            <IconChartBar className="h-12 w-12 text-green-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-2xl text-white mb-4">
              Analytics Real-Time
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Acompanhe cada interação e otimize suas conversões em tempo real.
            </p>
          </div>

          <div className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-purple-900/30 via-pink-900/30 to-orange-900/30 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-8 sm:p-12 hover:border-purple-500/50 transition-all group">
            <IconCode className="h-12 w-12 text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-3xl text-white mb-4">
              Integrações Poderosas
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              Conecte com suas ferramentas favoritas via Webhooks. CRM, Email
              Marketing, Automações e muito mais. Seu funil integrado ao seu
              ecossistema completo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
