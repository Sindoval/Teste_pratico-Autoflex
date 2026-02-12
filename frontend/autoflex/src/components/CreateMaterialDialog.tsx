import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { createMaterial } from "@/store/slices/inventorySlice";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import type { RawMaterial } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface CreateMaterialDialogProp {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateMaterialDialog = ({ open, onOpenChange }: CreateMaterialDialogProp) => {
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    stockQuantity: 0,
    unit: "KG"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await dispatch(createMaterial(formData as Omit<RawMaterial, 'id'>)).unwrap();

      Swal.fire({
        icon: 'success',
        title: 'Created!',
        text: 'Material added successfully.',
        timer: 1500,
        showConfirmButton: false
      });

      setFormData({ name: "", stockQuantity: 0, unit: "KG" });
      onOpenChange(false);
    } catch (error) {
      Swal.fire('Error', String(error), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const UNIT_OPTIONS = ["KG", "GRAMS", "LITERS", "METERS", "UNITS", "PIECES"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Material</DialogTitle>
            <DialogDescription>
              Enter the details of the new raw material to add it to the inventory.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                required
                value={formData.name}
                className="col-span-3"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">Stock</Label>
              <Input
                id="quantity"
                type="number"
                required
                value={formData.stockQuantity}
                className="col-span-3"
                onChange={(e) => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit" className="text-right text-slate-600 font-medium">
                Unit
              </Label>
              <div className="col-span-3">
                <Select
                  value={formData.unit}
                  onValueChange={(value) => setFormData({ ...formData, unit: value })}
                >
                  <SelectTrigger id="unit" className="w-full bg-white border-slate-200 focus:ring-primary">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>

                  <SelectContent
                    position="popper"
                    className="bg-white border border-slate-200 shadow-md min-w-[var(--radix-select-trigger-width)]"
                  >
                    {UNIT_OPTIONS.map((option) => (
                      <SelectItem
                        key={option}
                        value={option}
                        className="focus:bg-slate-100 cursor-pointer"
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Material
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateMaterialDialog;