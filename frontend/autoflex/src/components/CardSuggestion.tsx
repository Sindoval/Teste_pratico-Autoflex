import type { ProductionSuggestion } from "@/types";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";


const CardSuggestion = (
  { productName, totalPrice, quantityToProduce, materials }: ProductionSuggestion) => {
  return (
    <Card className="hover:border-primary/50 transition-colors shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-xl font-bold text-slate-900">{productName}</h4>
              <Badge className="bg-blue-600">{`${quantityToProduce} Units`}</Badge>
            </div>
            <p className="text-sm text-slate-500">Suggested production quantity</p>
          </div>

          <div className="flex items-center gap-2 lg:flex-col lg:items-end">
            <span className="text-sm text-slate-500">Total Profit:</span>
            <span className="text-xl font-extrabold text-green-600">
              ${totalPrice.toLocaleString()}
            </span>
          </div>

          <div className="bg-slate-100 p-4 rounded-lg space-y-3 min-w-[280px] lg:max-w-[350px]">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
              Required Materials:
            </p>

            <div className="space-y-2 max-h-[120px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {materials.map(({ name, requiredQuantity, stockAtMoment, unit }) => (
                <div key={name} className="flex justify-between items-center text-sm border-b border-slate-100 pb-1 last:border-0">
                  <span className="text-slate-600">
                    {name}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {requiredQuantity.toFixed(2)}/{stockAtMoment} {unit}
                  </span>
                </div>
              ))}
            </div>

            {materials.length > 4 && (
              <p className="text-[10px] text-center text-slate-400 italic">
                Scroll to see more materials
              </p>
            )}
          </div>

        </div>
      </CardContent>
    </Card>
  );
}

export default CardSuggestion;