import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { DollarSign, Edit, ScrollText, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import EditProductDialog from "./EditProductDialog";
import type { ComponentProduct } from "@/types";

interface CardProductProps {
  id: number;
  name: string;
  price: number;
  materials: ComponentProduct[];
  onDelete: (id: number, name: string) => void;
}

const CardProduct = ({ id, name, price, materials, onDelete }: CardProductProps) => {
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <Card className="flex flex-col shadow-sm border-slate-200 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold text-slate-900">{name}</CardTitle>
            <p className="text-xs font-mono text-slate-400">ID: #P{id}</p>
          </div>
          <div className="flex items-center text-green-600 font-bold bg-green-50 px-2 py-1 rounded-md">
            <DollarSign size={14} />
            <span>{price.toFixed(2)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <ScrollText size={14} />
            <span>Recipe Details</span>
          </div>

          <div className="bg-slate-50 rounded-md p-3 border border-slate-100">
            <div className="max-h-[120px] overflow-y-auto pr-2 scrollbar-thin">
              <ul className="space-y-2">
                {materials.map((m) => (
                  <li key={m.materialId} className="flex justify-between text-sm border-b border-slate-200/50 pb-1 last:border-0">
                    <span className="text-slate-600">{m.materialName}</span>
                    <span className="font-bold text-slate-900">
                      {m.requiredQuantity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-50">
        <Button
          variant="outline"
          className="w-full gap-2 text-slate-600 hover:bg-slate-100"
          onClick={() => setOpenEdit(true)}
        >
          <Edit size={16} /> Edit
        </Button>
        <Button
          variant="destructive"
          className="w-full gap-2"
          onClick={() => onDelete(id, name)}
        >
          <Trash2 size={16} /> Delete
        </Button>
      </CardFooter>

      <EditProductDialog
        product={{ id, name, price, materials }}
        open={openEdit}
        onOpenChange={setOpenEdit}
      />
    </Card>
  );
}

export default CardProduct;