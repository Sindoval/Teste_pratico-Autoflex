import type { Product } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { DollarSign, Edit, ScrollText, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

const CardProduct = ({ id, name, price, materials }: Product) => {

  return (
    <Card className="flex flex-col shadow-sm border-slate-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold text-slate-900">{name}</CardTitle>
            <p className="text-xs font-mono text-slate-400">ID: #P{id}</p>
          </div>
          <div className="flex items-center text-green-600 font-bold">
            <DollarSign size={16} />
            <span>{price.toFixed(2)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold">
            <ScrollText size={16} />
            <span>Recipe Details</span>
          </div>

          {/* LISTA DE MATERIAIS COM SCROLL INTERNO */}
          <div className="bg-slate-50 rounded-md p-3 border border-slate-100">
            <div className="max-h-[120px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
              <ul className="space-y-2">
                {materials.map(({ materialId, materialName, requiredQuantity, unit }) => (
                  <li key={materialId} className="flex justify-between text-sm border-b border-slate-200/50 pb-1 last:border-0">
                    <span className="text-slate-600">{materialName}</span>
                    <span className="font-bold text-slate-900">
                      {requiredQuantity} {unit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {materials.length > 3 && (
              <div className="text-[10px] text-center text-slate-400 mt-2 italic">
                Scroll to view full recipe
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-50">
        <Button variant="outline" className="w-full gap-2 text-slate-600">
          <Edit size={16} /> Edit
        </Button>
        <Button variant="destructive" className="w-full gap-2">
          <Trash2 size={16} /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CardProduct;