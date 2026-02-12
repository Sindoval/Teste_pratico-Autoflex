import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Box, ScrollText, Settings, LogOut, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const Layout = () => {
  const { pathname } = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Materials", path: "/materials", icon: Box },
    { name: "Products & Recipes", path: "/products", icon: ScrollText },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <header className="fixed top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-white px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-blue-600">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold"><Building /></div>
            <span className="text-xl font-bold text-blue-900 tracking-tight">AutoFlex</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Avatar className="h-9 w-9 border">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex flex-1 pt-16 h-screen overflow-hidden">

        {/* SIDEBAR - Desktop */}
        <aside className="fixed left-0 hidden h-[calc(100vh-64px)] w-64 border-r bg-white p-4 md:flex flex-col">
          <nav className="flex-1 space-y-2 pt-4">
            {navItems.map((item) => (
              <Button
                key={item.path}
                asChild
                variant={pathname === item.path ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  pathname === item.path ? "bg-blue-50 text-blue-700 hover:bg-blue-100" : "text-slate-500"
                )}
              >
                <Link to={item.path}>
                  <item.icon size={20} />
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>

          <div className="space-y-2 pb-4">
            <Separator className="my-4" />
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500">
              <Settings size={20} />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500 hover:text-red-600 hover:bg-red-50">
              <LogOut size={20} />
              Logout
            </Button>
          </div>
        </aside>

        {/* PRINCIPAL CONTENT */}
        <main className="flex-1 md:pl-64 overflow-y-auto bg-white h-full">
          <Outlet />
        </main>

        {/* NAVEGAÇÃO MOBILE - Inferior */}
        <footer className="fixed bottom-0 left-0 z-40 w-full border-t bg-white md:hidden p-2">
          <nav className="flex justify-around items-center h-14">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                asChild
                className={cn(
                  "flex-col h-auto py-1 gap-1",
                  pathname === item.path ? "text-blue-600" : "text-slate-400"
                )}
              >
                <Link to={item.path}>
                  <item.icon size={20} />
                  <span className="text-[10px] uppercase font-bold">{item.name.split(' ')[0]}</span>
                </Link>
              </Button>
            ))}
          </nav>
        </footer>
      </div>
    </div>
  );
}

export default Layout;