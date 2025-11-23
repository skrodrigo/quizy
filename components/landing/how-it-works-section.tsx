import {
  IconChartBar,
  IconMouse,
  IconPalette,
  IconRocket,
} from "@tabler/icons-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: IconMouse,
      title: "Arraste e Solte",
      description:
        "Escolha entre +50 widgets e monte seu funil em minutos. Sem código, sem complicação.",
    },
    {
      icon: IconPalette,
      title: "Personalize Tudo",
      description:
        "Cores, fontes, espaçamentos. Cada detalhe ajustável para combinar com sua marca.",
    },
    {
      icon: IconRocket,
      title: "Publique Instantâneo",
      description:
        "Um clique e seu funil está no ar. Domínio próprio, rápido e profissional.",
    },
    {
      icon: IconChartBar,
      title: "Analise e Otimize",
      description:
        "Acompanhe cada interação em tempo real e melhore suas conversões continuamente.",
    },
  ];

  return (
    <section className="py-32 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
            Simples.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Rápido
            </span>
            . Poderoso.
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Crie funis profissionais em 4 passos simples
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-muted backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all h-full">
                  <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-purple-500/20 text-purple-400 font-bold text-sm mb-4">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-xl text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
