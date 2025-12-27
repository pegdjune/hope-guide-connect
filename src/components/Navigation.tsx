import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import { Heart, Menu, X, Calculator, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all">
              <Heart className="w-6 h-6 text-primary" fill="currentColor" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              FertilEurope
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink
              to="/comparateur"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              activeClassName="text-primary"
            >
              Comparateur
            </NavLink>
            <NavLink
              to="/fiv"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              activeClassName="text-primary"
            >
              FIV par pays
            </NavLink>
            
            {/* Simulateurs Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors font-medium">
                <Calculator className="w-4 h-4" />
                Outils
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem asChild>
                  <NavLink to="/simulateurs/remboursement" className="w-full cursor-pointer">
                    💚 Remboursement SS
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink to="/simulateurs/cout-pays" className="w-full cursor-pointer">
                    💶 Coût par pays
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink to="/simulateurs/chances-succes" className="w-full cursor-pointer">
                    📈 Chances de succès
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink to="/simulateurs/budget-global" className="w-full cursor-pointer">
                    💰 Budget global
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <NavLink
              to="/blog"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              activeClassName="text-primary"
            >
              Blog
            </NavLink>
            <NavLink
              to="/a-propos"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              activeClassName="text-primary"
            >
              À propos
            </NavLink>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-medium">
              <NavLink to="/diagnostic">
                Commencer le diagnostic
              </NavLink>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <NavLink
              to="/comparateur"
              className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-primary font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Comparateur
            </NavLink>
            <NavLink
              to="/fiv"
              className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-primary font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              FIV par pays
            </NavLink>
            
            {/* Mobile Simulateurs */}
            <div className="space-y-2">
              <span className="block py-2 text-foreground font-medium flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Outils
              </span>
              <div className="pl-6 space-y-2">
                <NavLink
                  to="/simulateurs/remboursement"
                  className="block py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  💚 Remboursement SS
                </NavLink>
                <NavLink
                  to="/simulateurs/cout-pays"
                  className="block py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  💶 Coût par pays
                </NavLink>
                <NavLink
                  to="/simulateurs/chances-succes"
                  className="block py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📈 Chances de succès
                </NavLink>
                <NavLink
                  to="/simulateurs/budget-global"
                  className="block py-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  💰 Budget global
                </NavLink>
              </div>
            </div>
            
            <NavLink
              to="/blog"
              className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-primary font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </NavLink>
            <NavLink
              to="/a-propos"
              className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
              activeClassName="text-primary font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              À propos
            </NavLink>
            <Button asChild className="w-full bg-primary hover:bg-primary-hover text-primary-foreground">
              <NavLink to="/diagnostic" onClick={() => setMobileMenuOpen(false)}>
                Commencer le diagnostic
              </NavLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
