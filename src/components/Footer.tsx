import { Heart, Mail, Phone } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-primary/10">
                <Heart className="w-5 h-5 text-primary" fill="currentColor" />
              </div>
              <span className="text-lg font-semibold text-foreground">
                FertilEurope
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Votre partenaire de confiance pour votre parcours FIV en Europe.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/comparateur" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Comparateur de cliniques
                </NavLink>
              </li>
              <li>
                <NavLink to="/diagnostic" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Diagnostic personnalisé
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink to="/a-propos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  À propos
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Guide FIV
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Législations par pays
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Témoignages
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                contact@fertileurope.com
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                +33 1 23 45 67 89
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 FertilEurope. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Mentions légales
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Politique de confidentialité
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              CGU
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
