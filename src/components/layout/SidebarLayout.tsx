import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-black text-white">
      {/* Sidebar */}
      <aside
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-[#18181b] border-r border-[#232323] flex flex-col transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#232323]">
          <span className="text-xl font-bold">Projects</span>
          <button
            className="lg:hidden p-2 rounded hover:bg-[#232323]"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-2">
          {children}
        </div>
        <div className="px-4 py-2 border-t border-[#232323] text-xs text-[#b3b3b3]">
          © 2025 Manim
        </div>
      </aside>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      {/* Main content */}
      <div className="flex-1 flex flex-col h-full">
        <div className="flex items-center px-4 py-3 border-b border-[#232323] bg-[#18181b] sticky top-0 z-10">
          <button
            className="p-2 mr-2 lg:hidden rounded hover:bg-[#232323]"
            onClick={() => setOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-lg font-semibold">Manim</span>
        </div>
        <main className="flex-1 flex flex-col h-full overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
