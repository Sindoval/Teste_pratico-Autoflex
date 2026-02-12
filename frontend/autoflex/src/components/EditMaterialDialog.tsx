import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { editMaterial } from "@/store/slices/inventorySlice";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import type { RawMaterial } from "@/types";

interface MaterialDialogProp {
  material: RawMaterial;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditMaterialDialog = ({ material, open, onOpenChange }: MaterialDialogProp) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<RawMaterial>({ ...material });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(editMaterial(formData)).unwrap();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to edit:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Material</DialogTitle>
            <DialogDescription>
              Update the stock and information for <strong>{material.name}</strong>.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                value={formData.name}
                className="col-span-3"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stockQuantity}
                className="col-span-3"
                onChange={(e) => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMaterialDialog;