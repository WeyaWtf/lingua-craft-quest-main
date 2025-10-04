import Navigation from "@/components/Navigation";

const Community = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-6">👥</div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Communauté
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          L'espace communautaire avec les topics et discussions arrive bientôt !
        </p>
      </div>
    </div>
  );
};

export default Community;
