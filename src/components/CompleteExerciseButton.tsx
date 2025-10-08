import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface CompleteExerciseButtonProps {
  onComplete: () => void;
  disabled?: boolean;
  variant?: "default" | "success";
  className?: string;
}

export const CompleteExerciseButton = ({
  onComplete,
  disabled = false,
  variant = "success",
  className = ""
}: CompleteExerciseButtonProps) => {
  return (
    <Button
      onClick={onComplete}
      disabled={disabled}
      className={`${
        variant === "success"
          ? "bg-green-600 hover:bg-green-700 text-white"
          : ""
      } ${className}`}
    >
      <CheckCircle className="w-4 h-4 mr-2" />
      Valider
    </Button>
  );
};
