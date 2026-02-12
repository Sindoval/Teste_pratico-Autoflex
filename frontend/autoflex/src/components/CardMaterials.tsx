import { Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { Card } from "./ui/card";
import type { RawMaterial } from "@/types";
import EditMaterialDialog from "./EditMaterialDialog";
import { useState } from "react";

interface MaterialItemProps {
  material: RawMaterial;
  onDelete: (id: number, name: string) => void;
  isTableRow?: boolean;
}

const CardMaterial = ({ material, onDelete, isTableRow }: MaterialItemProps) => {
  const { id, name, stockQuantity, unit } = material;
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialog = (open: boolean) => {
    setOpenDialog(open);
  }

  if (isTableRow) {
    return (
      <TableRow>
        <TableCell className="font-mono text-slate-500">#{id}</TableCell>
        <TableCell className="font-medium">{name}</TableCell>
        <TableCell className="font-semibold">
          {stockQuantity} {unit}
        </TableCell>
        <TableCell className="text-center">
          <div className="flex justify-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-primary"
              onClick={() => setOpenDialog(true)}
            >
              <Edit size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-red-500"
              onClick={() => onDelete(id, material.name)}
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </TableCell>
        <EditMaterialDialog
          open={openDialog}
          onOpenChange={handleDialog}
          material={material}
        />
      </TableRow>
    );
  }

  return (
    <Card className="p-4 border-slate-200 shadow-none space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-slate-900">{name}</h4>
          <span className="text-xs font-mono text-slate-400">ID: #{id}</span>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-primary">
            {stockQuantity} {unit}
          </p>
        </div>
      </div>

      <div className="flex gap-2 pt-2 border-t border-slate-100">
        <Button
          variant="outline"
          className="flex-1 h-9 gap-2"
          onClick={() => setOpenDialog(true)}
        >
          <Edit size={16}
          /> Edit
        </Button>
        <Button
          variant="destructive"
          className="flex-1 h-9 gap-2"
          onClick={() => onDelete(id, material.name)}
        >
          <Trash2 size={16} /> Delete
        </Button>
      </div>

      <EditMaterialDialog
        open={openDialog}
        onOpenChange={handleDialog}
        material={material}
      />
    </Card>
  );
};

export default CardMaterial;