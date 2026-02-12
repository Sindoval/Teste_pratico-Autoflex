import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";

const Materials = () => {
  const materials = [
    { id: 1, name: "Steel Bars", stockQuantity: 150, unit: "KG" },
    { id: 3, name: "Aluminum Sheets", stockQuantity: 75, unit: "METERS" },
    { id: 4, name: "Aluminum Sheets", stockQuantity: 75, unit: "METERS" },

  ];

  return (
    <div className="space-y-6 bg-white px-4 md:px-10 mb-20">

      <div className="flex flex-col gap-5 items-start pt-8">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
          Raw Materials Overview
        </h2>
        <Button className="bg-primary hover:bg-blue-700 w-[100%] md:w-[25%]">
          <Plus className="mr-2 h-4 w-4" /> Add New Material
        </Button>
      </div>

      <Card className="shadow-sm border-slate-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold">Current Inventory</CardTitle>
          <p className="text-sm text-slate-500">List of all materials</p>
        </CardHeader>

        <CardContent>
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
                  <TableRow key={m.id}>
                    <TableCell className="font-mono text-slate-500">#{m.id}</TableCell>
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell className="font-semibold">
                      {m.stockQuantity} {m.unit}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                          <Edit size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-slate-400 hover:text-red-500"
                          onClick={() => () => console.log("Delete")}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* --- VERSION MOBILE  */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {materials.map((m) => (
              <Card className="p-4 border-slate-200 shadow-none space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900">{m.name}</h4>
                    <span className="text-xs font-mono text-slate-400">ID: #{m.id}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">
                      {m.stockQuantity} {m.unit}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <Button variant="outline" className="flex-1 h-9 gap-2">
                    <Edit size={16} /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1 h-9 gap-2"
                    onClick={() => console.log("Delete")
                    }
                  >
                    <Trash2 size={16} /> Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default Materials;