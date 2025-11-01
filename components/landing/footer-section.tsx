import { Instagram, Youtube, Linkedin } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
              Quizy
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              A plataforma que transforma visitantes em clientes através de funis interativos e dinâmicos.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Menu</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors text-sm">Home</a></li>
              <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors text-sm">Recursos</a></li>
              <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors text-sm">Planos</a></li>
              <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors text-sm">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Suporte</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors text-sm">Ajuda</a></li>
              <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors text-sm">Contato</a></li>
              <li><a href="#" className="text-slate-400 hover:text-purple-400 transition-colors text-sm">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Social</h4>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            © 2025 Quizy. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
