import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, ScrollText, DollarSign } from "lucide-react";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Industrial Valve Assembly",
      price: 125.00,
      materials: [
        { materialName: "Steel Sheets", requiredQuantity: 2, unit: "units" },
        { materialName: "Rubber Gaskets", requiredQuantity: 4, unit: "units" },
        { materialName: "Silicon Seals", requiredQuantity: 2, unit: "units" },
        { materialName: "Copper Wiring", requiredQuantity: 10, unit: "meters" },
      ]
    },
    {
      id: 2,
      name: "Modular Connector Kit",
      price: 45.50,
      materials: [
        { materialName: "Plastic Casings", requiredQuantity: 5, unit: "units" },
        { materialName: "Copper Wiring", requiredQuantity: 8, unit: "units" },
      ]
    },
    {
      id: 2,
      name: "Modular Connector Kit",
      price: 45.50,
      materials: [
        { materialName: "Plastic Casings", requiredQuantity: 5, unit: "units" },
        { materialName: "Copper Wiring", requiredQuantity: 8, unit: "units" },
      ]
    },
    {
      id: 2,
      name: "Modular Connector Kit",
      price: 45.50,
      materials: [
        { materialName: "Plastic Casings", requiredQuantity: 5, unit: "units" },
        { materialName: "Copper Wiring", requiredQuantity: 8, unit: "units" },
      ]
    }
  ];

  return (
    <div className="space-y-6 bg-white px-4 md:px-10 pb-10 mb-10">

      <div className="flex flex-col gap-5 items-start pt-8">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
          Product Catalog
        </h2>
        <Button className="bg-primary hover:bg-blue-700 w-[100%] md:w-[25%]">
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>

      {/* Grid de Produtos - Adaptável para Mobile/Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col shadow-sm border-slate-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-bold text-slate-900">{product.name}</CardTitle>
                  <p className="text-xs font-mono text-slate-400">ID: #P{product.id}</p>
                </div>
                <div className="flex items-center text-green-600 font-bold">
                  <DollarSign size={16} />
                  <span>{product.price.toFixed(2)}</span>
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
                      {product.materials.map((mat, idx) => (
                        <li key={idx} className="flex justify-between text-sm border-b border-slate-200/50 pb-1 last:border-0">
                          <span className="text-slate-600">{mat.materialName}</span>
                          <span className="font-bold text-slate-900">
                            {mat.requiredQuantity} {mat.unit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {product.materials.length > 3 && (
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
        ))}
      </div>
    </div>
  );
};

export default Products;