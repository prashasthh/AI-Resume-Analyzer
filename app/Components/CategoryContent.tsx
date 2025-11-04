interface CategoryContentProps {
  tips: string[];
}

export default function CategoryContent({ tips }: CategoryContentProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm bg-yellow-500/20 text-yellow-400">
                !
              </div>
            </div>
            <p className="text-gray-300 text-sm flex-1">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
