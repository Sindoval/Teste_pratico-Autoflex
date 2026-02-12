import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Boxes, Box, TrendingUp } from "lucide-react";

const Dashboard = () => {
  // Dados estruturados conforme o seu Backend (ProductionSuggestionDTO)
  const suggestions = [
    {
      productId: 1,
      productName: "Circuit Board 2.1",
      quantityToProduce: 250,
      unit: "pcs", // Vem do MeasurementUnit
      totalPrice: 12500,
      materials: [
        { name: "Copper Wire", current: 300, required: 450, isBottleneck: true },
        { name: "Resistors", current: 2500, required: 2000, isBottleneck: false },
      ]
    },
    {
      productId: 2,
      productName: "Industrial Gearbox",
      quantityToProduce: 15,
      unit: "Units",
      totalPrice: 7500,
      materials: [
        { name: "Steel Rods", current: 200, required: 300, isBottleneck: true },
        { name: "Bearings", current: 120, required: 60, isBottleneck: false },
        { name: "Bearings", current: 120, required: 60, isBottleneck: false },
        { name: "Bearings", current: 120, required: 60, isBottleneck: false },
        { name: "Bearings", current: 120, required: 60, isBottleneck: false },
      ]
    }
  ];

  return (
    <div className="space-y-8 bg-slate-50/50 px-4 md:px-10 pb-10 min-h-screen bg-white mb-10">
      <h2 className="hidden md:block text-3xl font-bold tracking-tight text-slate-900 pt-8">
        Dashboard Overview
      </h2>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 pt-4 md:pt-0">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium text-slate-500 uppercase">Registered Materials</CardTitle>
            <Boxes className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">1,850</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium text-slate-500 uppercase">Registered Products</CardTitle>
            <Box className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">42</div>
          </CardContent>
        </Card>

      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <TrendingUp className="text-primary h-5 w-5" />
          <h3 className="text-xl font-bold text-slate-800">Production Suggestions</h3>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
          {suggestions.map((item) => (
            <Card key={item.productId} className="hover:border-primary/50 transition-colors shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xl font-bold text-slate-900">{item.productName}</h4>
                      <Badge className="bg-blue-600">{item.quantityToProduce} {item.unit}</Badge>
                    </div>
                    <p className="text-sm text-slate-500">Suggested production quantity</p>
                  </div>

                  <div className="flex items-center gap-2 lg:flex-col lg:items-end">
                    <span className="text-sm text-slate-500">Total Profit:</span>
                    <span className="text-xl font-extrabold text-green-600">
                      ${item.totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="bg-slate-100 p-4 rounded-lg space-y-3 min-w-[280px] lg:max-w-[350px]">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                      Required Materials:
                    </p>

                    <div className="space-y-2 max-h-[120px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                      {item.materials.map((mat, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-100 pb-1 last:border-0">
                          <span className={mat.isBottleneck ? "text-red-600 font-semibold" : "text-slate-600"}>
                            {mat.name} {mat.isBottleneck && "⚠️"}
                          </span>
                          <span className="text-xs text-slate-500 font-mono">
                            {mat.current}/{mat.required}
                          </span>
                        </div>
                      ))}
                    </div>

                    {item.materials.length > 4 && (
                      <p className="text-[10px] text-center text-slate-400 italic">
                        Scroll to see more materials
                      </p>
                    )}
                  </div>

                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;