import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createProducts } from "@/store/slices/productSlice";
import { fetchMaterials } from "@/store/slices/inventorySlice";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Plus, Trash2, Loader2 } from "lucide-react";
import Swal from "sweetalert2";

interface CreateProductDialogProp {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateProductDialog = ({ open, onOpenChange }: CreateProductDialogProp) => {
  const dispatch = useAppDispatch();
  const { materials } = useAppSelector((state) => state.inventory);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [recipe, setRecipe] = useState<{ materialId: number; requiredQuantity: number }[]>([]);

  useEffect(() => {
    if (open && materials.length === 0) {
      dispatch(fetchMaterials());
    }
  }, [open, materials.length, dispatch]);

  const addMaterialToRecipe = () => {
    setRecipe([...recipe, { materialId: materials[0]?.id, requiredQuantity: 1 }]);
  };

  const removeMaterialFromRecipe = (index: number) => {
    setRecipe(recipe.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (recipe.length === 0) return Swal.fire("Ops!", "Add at least one material to the recipe.", "warning");

    setIsSubmitting(true);
    try {
      await dispatch(createProducts({ name, price, materials: recipe })).unwrap();
      Swal.fire("Created!", "Product and recipe saved.", "success");
      onOpenChange(false);
      // Limpar campos...
    } catch (err) {
      onOpenChange(false);
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
            <DialogTitle>New Product & Recipe</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Price</Label>
              <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="col-span-3" required />
            </div>
          </div>

          <div className="space-y-4 border-t pt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-sm text-slate-700">Recipe Materials</h3>
              <Button type="button" variant="outline" size="sm" onClick={addMaterialToRecipe}>
                <Plus className="h-4 w-4 mr-1" /> Add Item
              </Button>
            </div>

            {recipe.map((item, index: number) => {
              const selectedMaterial = materials.find(m => m.id === item.materialId);
              const unitLabel = selectedMaterial ? selectedMaterial.unit : "";

              return (
                <div key={index} className="flex gap-2 items-end border-b pb-3">
                  <div className="flex-[2]">
                    <Label className="text-[10px] uppercase text-slate-400 font-bold">Material</Label>
                    <select
                      className="w-full border rounded-md h-9 text-sm p-1 focus:ring-1 focus:ring-primary outline-none"
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

                  <div className="flex-1">
                    <Label className="text-[10px] uppercase text-slate-400 font-bold">
                      Qty {unitLabel && `(${unitLabel})`}
                    </Label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={item.requiredQuantity === 0 ? "" : item.requiredQuantity}
                        placeholder="0"
                        className="pr-2"
                        onChange={(e) => {
                          const val = e.target.value;
                          const newRecipe = [...recipe];
                          newRecipe[index].requiredQuantity = val === "" ? 0 : Number(val);
                          setRecipe(newRecipe);
                        }}
                      />
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:bg-red-50"
                    onClick={() => removeMaterialFromRecipe(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductDialog;