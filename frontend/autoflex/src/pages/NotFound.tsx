import { Button } from "@/components/ui/button";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
        <FileQuestion className="h-24 w-24 text-primary relative z-10 animate-bounce-slow" />
      </div>

      <div className="text-center space-y-3 mb-10">
        <h1 className="text-6xl font-bold text-slate-900 tracking-tighter">404</h1>
        <h2 className="text-2xl font-semibold text-slate-800">Page Not Found</h2>
        <p className="text-slate-500 max-w-md mx-auto">
          Oops! The page you are looking for doesn't exist or has been moved to another inventory.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-md">
        <Button
          variant="outline"
          className="flex-1 gap-2 border-slate-200"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Go Back
        </Button>
        <Button
          className="flex-1 gap-2 bg-primary hover:bg-blue-700"
          onClick={() => navigate("/")}
        >
          <Home size={18} />
          Back to Home
        </Button>
      </div>

      <p className="mt-16 text-sm text-slate-400 font-mono">
        Error Code: ERR_PAGE_NOT_FOUND_AUTOFLEX
      </p>
    </div>
  );
}

export default NotFound;