import { FolderTree, BookOpen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface TopicCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  language: string;
  tags: string[];
  pathCount: number;
  exerciseCount: number;
  onClick?: () => void;
}

const TopicCard = ({
  title,
  description,
  icon,
  color,
  language,
  tags,
  pathCount,
  exerciseCount,
  onClick,
}: TopicCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in" onClick={onClick}>
      <CardHeader>
        <div className={`w-full h-32 bg-gradient-to-br ${color} rounded-lg mb-4 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform`}>
          {icon}
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-sm mt-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{pathCount} parcours</span>
          </div>
          <div className="flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{exerciseCount} exercices</span>
          </div>
        </div>

        {/* Language Badge */}
        <Badge className="bg-blue-100 text-blue-800 border-blue-300">
          🌐 {language}
        </Badge>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <FolderTree className="w-4 h-4 mr-2" />
          Explorer le topic
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TopicCard;
