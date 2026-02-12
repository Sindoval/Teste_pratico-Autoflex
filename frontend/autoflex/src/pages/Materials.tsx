import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, AlertCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { deleteMaterial, fetchMaterials } from "@/store/slices/inventorySlice";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import CardMaterial from "@/components/CardMaterials";
import CreateMaterialDialog from "@/components/CreateMaterialDialog";

const Materials = () => {
  const dispatch = useAppDispatch();
  const MySwal = withReactContent(Swal);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { materials, loading, error } = useAppSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(fetchMaterials())
  }, [dispatch]);

  const handleDelete = (id: number, name: string) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: `You are about to delete ${name}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {

        try {
          await dispatch(deleteMaterial(id)).unwrap();

          MySwal.fire({
            title: 'Deleted!',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          MySwal.fire({
            title: 'Action Denied',
            text: `This material is linked to existing products and cannot be deleted.(${error})`,
            icon: 'error',
            confirmButtonColor: '#3b82f6',
          });
        }
      }
    });
  };

  const handleDialog = (open: boolean) => {
    setDialogOpen(open);
  }

  return (
    <div className="space-y-6 bg-white px-4 md:px-10 mb-20">
      <div className="flex flex-col gap-5 items-start pt-8">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
          Raw Materials Overview
        </h2>
        <Button
          className="bg-primary hover:bg-blue-700 w-[100%] md:w-[25%]"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Material
        </Button>
      </div>

      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold">Current Inventory</CardTitle>
          <p className="text-sm text-slate-500">List of all materials managed in the system</p>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-slate-500 text-sm font-medium animate-pulse">
                Loading materials from database...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-red-100 rounded-lg bg-red-50/30">
              <AlertCircle className="h-10 w-10 text-red-500 mb-3" />
              <h3 className="text-lg font-bold text-slate-800">Failed to load data</h3>
              <p className="text-slate-600 mb-6 max-w-sm">{error}</p>
              <Button variant="outline" onClick={() => dispatch(fetchMaterials())}>
                Try Again
              </Button>
            </div>
          ) : (
            <>
              {/* DESKTOP (TABLE) */}
              <div className="hidden md:block rounded-md border">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead className="w-[100px] font-bold">ID</TableHead>
                      <TableHead className="font-bold">Material Name</TableHead>
                      <TableHead className="font-bold">Current Stock</TableHead>
                      <TableHead className="text-center font-bold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {materials.map((m) => (
                      <CardMaterial
                        key={m.id}
                        material={m}
                        onDelete={handleDelete}
                        isTableRow={true}
                      />
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="grid grid-cols-1 gap-4 md:hidden">
                {materials.map((m) => (
                  <CardMaterial
                    key={m.id}
                    material={m}
                    onDelete={handleDelete}
                    isTableRow={false}
                  />
                ))}
              </div>

              {materials.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-slate-400 font-medium">No materials found.</p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
      <CreateMaterialDialog
        open={dialogOpen}
        onOpenChange={handleDialog}
      />
    </div>
  );
};

export default Materials;