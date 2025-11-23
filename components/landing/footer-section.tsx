import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandYoutube,
} from "@tabler/icons-react";
import Link from "next/link";

export function FooterSection() {
  return (
    <footer className="bg-muted border-t border-slate-800 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
              funilead
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              A plataforma que transforma visitantes em clientes através de
              funis interativos e dinâmicos.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Menu</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Recursos
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Planos
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Suporte</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Ajuda
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Social</h4>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-slate-400 hover:text-purple-400 transition-colors"
              >
                <IconBrandInstagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-slate-400 hover:text-purple-400 transition-colors"
              >
                <IconBrandYoutube className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-slate-400 hover:text-purple-400 transition-colors"
              >
                <IconBrandLinkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            © 2025 funilead. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
