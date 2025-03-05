import { AppSidebar } from "@/components/ui/app-sidebar";
import Navbar from "@/common/navbar"; // ✅ Import Navbar
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center justify-between pl-2 border-b">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700" />
          </div>

          <div className="flex-1">
            <Navbar />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
