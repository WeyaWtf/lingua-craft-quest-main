import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, Gamepad2, PenTool, Users, Route, LogOut, User, GraduationCap, ClipboardList, Bell, MessageSquare, MessageCircle, Settings, CreditCard, Calendar, Coins, ShoppingBag, BarChart3, Edit3, HelpCircle } from "lucide-react";
import { LevelBadge } from "./gamification/LevelBadge";
import { CoinDisplay } from "./gamification/CoinDisplay";
import { StreakIndicator } from "./gamification/StreakIndicator";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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

          <div className="flex items-center gap-3">
            {/* Gamification indicators - only show when logged in */}
            {user && (
              <div className="hidden lg:flex items-center gap-3">
                <StreakIndicator size="sm" showLabel={false} />
                <CoinDisplay size="sm" showLabel={false} onClick={() => {/* TODO: Navigate to shop */}} />
                <LevelBadge size="md" showXP={false} />
              </div>
            )}

            {/* Auth button */}
            {loading ? (
              <div className="w-24 h-9 bg-accent animate-pulse rounded-lg" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden md:inline">
                      {user.user_metadata?.username || user.email?.split('@')[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Mon compte</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => navigate('/my-learning')}>
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Mon apprentissage
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/assignments')}>
                    <ClipboardList className="w-4 h-4 mr-2" />
                    Mes devoirs
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/learning-groups')}>
                    <Users className="w-4 h-4 mr-2" />
                    Groupe d'apprentissage
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => navigate('/notifications')}>
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/messages')}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Messages
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/forum')}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Forum
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => navigate('/account-settings')}>
                    <Settings className="w-4 h-4 mr-2" />
                    Paramètres du compte
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/payment-methods')}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Modes de paiement
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/subscriptions')}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Abonnements
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/credits')}>
                    <Coins className="w-4 h-4 mr-2" />
                    Crédits
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/purchase-history')}>
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Historique des achats
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="w-4 h-4 mr-2" />
                    Profil public
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/edit-profile')}>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Modifier le profil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/help')}>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Aide et support
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={async () => {
                      await supabase.auth.signOut();
                      toast.success('Déconnexion réussie');
                      navigate('/');
                    }}
                    className="text-red-600 focus:text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/signin')}
                  className="text-sm font-medium"
                >
                  Se connecter
                </Button>
                <Button
                  onClick={() => navigate('/signup')}
                  className="text-sm font-medium"
                >
                  S'inscrire
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
