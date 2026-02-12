import { Button } from "@/components/ui/button";
import { Plus, Loader2, AlertCircle, PackageSearch } from "lucide-react"; // 
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { deleteProduct, fetchProducts } from "@/store/slices/productSlice";
import CardProduct from "@/components/CardProduct";
import CreateProductDialog from "@/components/CreateProductDialog";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const Products = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.products);
  const [dialogOpen, setDialogOpen] = useState(false);
  const MySwal = withReactContent(Swal);

  const handleDialog = (open: boolean) => {
    setDialogOpen(open);
  };

  const handleDelete = (id: number, name: string) => {
    MySwal.fire({
      title: 'Delete Product?',
      text: `Are you sure you want to remove "${name}" from the catalog?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteProduct(id)).unwrap();
          MySwal.fire({ title: 'Deleted!', icon: 'success', timer: 1500, showConfirmButton: false });
        } catch (error) {
          MySwal.fire('Error', String(error), 'error');
        }
      }
    });
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="space-y-6 bg-white px-4 md:px-10 pb-10 mb-10">
      <div className="flex flex-col gap-5 items-start pt-8">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
          Product Catalog
        </h2>
        <Button
          className="bg-primary hover:bg-blue-700 w-[100%] md:w-[25%]"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-slate-500 font-medium animate-pulse">
            Loading your product catalog...
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-red-100 rounded-xl bg-red-50/30">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-xl font-bold text-slate-800">Connection Error</h3>
          <p className="text-slate-600 max-w-sm mb-6">{error}</p>
          <Button
            variant="outline"
            onClick={() => dispatch(fetchProducts())}
            className="border-red-200 hover:bg-red-50"
          >
            Try Again
          </Button>
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <CardProduct
                  key={product.id}
                  id={product.id}
                  materials={product.materials}
                  name={product.name}
                  price={product.price}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-slate-100 rounded-xl">
              <PackageSearch className="h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-900">No products found</h3>
              <p className="text-slate-500">Create your first product and its recipe to get started.</p>
            </div>
          )}
        </>
      )}
      <CreateProductDialog
        open={dialogOpen}
        onOpenChange={handleDialog} />
    </div>
  );
};

export default Products;