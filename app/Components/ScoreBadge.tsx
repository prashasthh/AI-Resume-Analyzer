import { cn } from "../libb/utils";

interface ScoreBadgeProps {
  score: number;
}

export default function ScoreBadge({ score }: ScoreBadgeProps) {
  const getColor = () => {
    if (score > 69) return "bg-green-500";
    if (score > 39) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getIcon = () => {
    if (score > 69) return "✓";
    if (score > 39) return "⚠";
    return "✗";
  };

  return (
    <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full text-white font-semibold", getColor())}>
      <span className="text-lg">{getIcon()}</span>
      <span>{score}/100</span>
    </div>
  );
}
