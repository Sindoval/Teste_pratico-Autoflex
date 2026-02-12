import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Boxes, Box, TrendingUp, Loader2, AlertTriangle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { fetchProductionSuggestions } from "@/store/slices/suggestionSlice";
import CardSuggestion from "@/components/CardSuggestion";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const { suggestions, loading: loadingSug } = useAppSelector((state) => state.suggestions);

  const { materials } = useAppSelector((state) => state.inventory);
  const { products } = useAppSelector((state) => state.products);

  console.log(suggestions);


  useEffect(() => {
    dispatch(fetchProductionSuggestions());
  }, [dispatch])

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
            <div className="text-lg md:text-2xl font-bold">{materials.length}</div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium text-slate-500 uppercase">Registered Products</CardTitle>
            <Box className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>

      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <TrendingUp className="text-primary h-5 w-5" />
          <h3 className="text-xl font-bold text-slate-800">Production Suggestions</h3>
        </div>

        {loadingSug ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-slate-500 animate-pulse font-medium">Calculating suggestions...</p>
          </div>
        ) : suggestions.length > 0 ? (
          <div className="flex flex-col gap-6">
            {suggestions.map((suggestion) => (
              <CardSuggestion
                key={suggestion.productId}
                materials={suggestion.materials}
                productId={suggestion.productId}
                productName={suggestion.productName}
                quantityToProduce={suggestion.quantityToProduce}
                totalPrice={suggestion.totalPrice}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border-2 border-dashed rounded-xl p-12 text-center">
            <AlertTriangle className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900">No suggestions available</h3>
            <p className="text-slate-500">Check your material stock levels to see new recommendations.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;