import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateProducts } from "@/store/slices/productSlice";
import { fetchMaterials } from "@/store/slices/inventorySlice";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Plus, Trash2, Loader2, Save } from "lucide-react";
import Swal from "sweetalert2";
import type { Product, ComponentProduct } from "@/types";

interface EditProductDialogProp {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditProductDialog = ({ product, open, onOpenChange }: EditProductDialogProp) => {
  const dispatch = useAppDispatch();
  const { materials } = useAppSelector((state) => state.inventory);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [recipe, setRecipe] = useState<ComponentProduct[]>(product.materials);

  useEffect(() => {
    if (open) {
      setName(product.name);
      setPrice(product.price);
      setRecipe(product.materials);
      if (materials.length === 0) dispatch(fetchMaterials());
    }
  }, [open, product, materials.length, dispatch]);

  const addMaterialToRecipe = () => {
    if (materials.length > 0) {
      setRecipe([...recipe, { materialId: materials[0].id, requiredQuantity: 1 }]);
    }
  };

  const removeMaterialFromRecipe = (index: number) => {
    setRecipe(recipe.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (recipe.length === 0) return Swal.fire("Recipe empty", "Product must have at least one material.", "warning");

    setIsSubmitting(true);
    try {
      await dispatch(updateProducts({
        id: product.id,
        name,
        price,
        materials: recipe
      })).unwrap();

      Swal.fire({ icon: "success", title: "Updated!", showConfirmButton: false, timer: 1500 });
      onOpenChange(false);
    } catch (err) {
      Swal.fire("Error", String(err), "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">Edit Product</DialogTitle>
            <DialogDescription>Modify product details and production recipe.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-semibold">Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="col-span-3 bg-white" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-semibold">Price ($)</Label>
              <Input type="number" step="0.01" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="col-span-3 bg-white" required />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500">Recipe Composition</h3>
              <Button type="button" variant="outline" size="sm" onClick={addMaterialToRecipe} className="h-8 border-dashed border-2">
                <Plus className="h-4 w-4 mr-1" /> Add Component
              </Button>
            </div>

            {recipe.map((item, index) => {
              const currentMat = materials.find(m => m.id === item.materialId);
              return (
                <div key={index} className="flex gap-3 items-end bg-white p-3 rounded-md border border-slate-200 shadow-sm animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex-[2] space-y-1.5">
                    <Label className="text-[10px] font-black text-slate-400">Material</Label>
                    <select
                      className="w-full border rounded-md h-9 text-sm px-2 bg-slate-50 focus:ring-2 focus:ring-primary outline-none transition-all"
                      value={item.materialId}
                      onChange={(e) => {
                        const newRecipe = [...recipe];
                        newRecipe[index].materialId = Number(e.target.value);
                        setRecipe(newRecipe);
                      }}
                    >
                      {materials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <Label className="text-[10px] font-black text-slate-400">
                      Qty {currentMat?.unit ? `(${currentMat.unit})` : ''}
                    </Label>
                    <Input
                      type="number"
                      value={item.requiredQuantity === 0 ? "" : item.requiredQuantity}
                      onChange={(e) => {
                        const newQty = e.target.value === "" ? 0 : Number(e.target.value);
                        setRecipe(prev => prev.map((recipeItem, i) =>
                          i === index ? { ...recipeItem, requiredQuantity: newQty } : recipeItem
                        ));
                      }}
                      className="h-9 bg-slate-50"
                    />
                  </div>

                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500 hover:bg-red-50" onClick={() => removeMaterialFromRecipe(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>

          <DialogFooter className="border-t pt-4">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="text-slate-500">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-[140px] bg-primary hover:bg-blue-700">
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;