import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Gamepad2, PenTool, Users, Route } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Accueil", icon: Home },
    { path: "/catalog", label: "Catalogue", icon: BookOpen },
    { path: "/learning-paths", label: "Parcours", icon: Route },
    { path: "/exercises", label: "Exercices", icon: Gamepad2 },
    { path: "/creator", label: "Créer", icon: PenTool },
    { path: "/community", label: "Communauté", icon: Users },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-2xl">🌍</span>
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Koilingua
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
