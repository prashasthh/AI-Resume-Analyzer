import { cn } from "../libb/utils";
import ScoreBadge from "./ScoreBadge";

interface CategoryHeaderProps {
  title: string;
  categoryScore: number;
}

export default function CategoryHeader({ title, categoryScore }: CategoryHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-2xl font-bold text-white">{title}</h3>
      <ScoreBadge score={categoryScore} />
    </div>
  );
}
