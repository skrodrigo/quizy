export function StatsSection() {
  const stats = [
    {
      value: "+50",
      label: "Widgets Interativos",
      description: "Componentes prontos para usar",
    },
    {
      value: "100%",
      label: "Customizável",
      description: "Cores, fontes e estilos do seu jeito",
    },
    {
      value: "∞",
      label: "Possibilidades",
      description: "Funis ilimitados de criatividade",
    },
    {
      value: "1º",
      label: "No Brasil",
      description: "Pioneiros em funis interativos",
    },
  ];

  return (
    <section className="py-20 bg-slate-950 border-y border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bold text-3xl sm:text-4xl text-white mb-4">
            Números que impressionam
          </h2>
          <p className="text-slate-400 text-lg">
            A plataforma que está revolucionando a forma de criar funis
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
              <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 text-center hover:border-purple-500/50 transition-all">
                <div className="font-black text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-400 mb-2">
                  {stat.value}
                </div>
                <div className="font-semibold text-white text-lg mb-1">
                  {stat.label}
                </div>
                <div className="text-slate-400 text-sm">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
