"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, FileText, Folder, Users, Layers, LogOut, Settings, BarChart2, Search, Bell, Command, ChevronRight, MessageSquare } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const getBreadcrumb = () => {
    if (!pathname || pathname === '/admin') return 'Dashboard';
    
    const parts = pathname.replace('/admin/', '').split('/');
    return parts.map(part => {
      // Capitalize first letter and handle cases like 'create' -> 'Create'
      return part.charAt(0).toUpperCase() + part.slice(1);
    }).join(' / ');
  };

  return (
    <div className="flex h-screen bg-neutral-50 text-neutral-900 font-sans antialiased selection:bg-neutral-200">
      {/* Sidebar */}
      <aside className="w-[240px] bg-neutral-50 border-r border-neutral-200 flex flex-col shrink-0">
        <div className="h-12 flex items-center px-4 border-b border-neutral-200">
          <div className="flex items-center gap-2 text-neutral-900 font-semibold tracking-tight text-sm">
            <div className="w-5 h-5 bg-neutral-900 rounded-[4px] flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">F</span>
            </div>
            Foxiz CMS
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-3 px-3">
          <div className="space-y-0.5">
            <Link href="/admin" className={`flex items-center px-2 py-1.5 text-[13px] font-medium rounded-md transition-colors ${pathname === '/admin' ? 'bg-neutral-200/60 text-neutral-900' : 'text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900'}`}>
              <LayoutDashboard className={`w-4 h-4 mr-2.5 ${pathname === '/admin' ? 'text-neutral-900' : 'text-neutral-400'}`} /> Dashboard
            </Link>
            <Link href="/admin/analytics" className={`flex items-center px-2 py-1.5 text-[13px] font-medium rounded-md transition-colors ${pathname?.includes('/admin/analytics') ? 'bg-neutral-200/60 text-neutral-900' : 'text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900'}`}>
              <BarChart2 className={`w-4 h-4 mr-2.5 ${pathname?.includes('/admin/analytics') ? 'text-neutral-900' : 'text-neutral-400'}`} /> Analytics
            </Link>
          </div>

          <div className="mt-6 mb-1 px-2 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Content</div>
          <div className="space-y-0.5">
            <Link href="/admin/articles" className={`flex items-center px-2 py-1.5 text-[13px] font-medium rounded-md transition-colors ${pathname?.includes('/admin/articles') ? 'bg-neutral-200/60 text-neutral-900' : 'text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900'}`}>
              <FileText className={`w-4 h-4 mr-2.5 ${pathname?.includes('/admin/articles') ? 'text-neutral-900' : 'text-neutral-400'}`} /> Articles
            </Link>
            <Link href="/admin/categories" className={`flex items-center px-2 py-1.5 text-[13px] font-medium rounded-md transition-colors ${pathname?.includes('/admin/categories') ? 'bg-neutral-200/60 text-neutral-900' : 'text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900'}`}>
              <Folder className={`w-4 h-4 mr-2.5 ${pathname?.includes('/admin/categories') ? 'text-neutral-900' : 'text-neutral-400'}`} /> Categories
            </Link>
            <Link href="/admin/authors" className={`flex items-center px-2 py-1.5 text-[13px] font-medium rounded-md transition-colors ${pathname?.includes('/admin/authors') ? 'bg-neutral-200/60 text-neutral-900' : 'text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900'}`}>
              <Users className={`w-4 h-4 mr-2.5 ${pathname?.includes('/admin/authors') ? 'text-neutral-900' : 'text-neutral-400'}`} /> Authors
            </Link>
            <Link href="/admin/pages" className={`flex items-center px-2 py-1.5 text-[13px] font-medium rounded-md transition-colors ${pathname?.includes('/admin/pages') ? 'bg-neutral-200/60 text-neutral-900' : 'text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900'}`}>
              <Layers className={`w-4 h-4 mr-2.5 ${pathname?.includes('/admin/pages') ? 'text-neutral-900' : 'text-neutral-400'}`} /> Pages
            </Link>
            <Link href="/admin/comments" className={`flex items-center px-2 py-1.5 text-[13px] font-medium rounded-md transition-colors ${pathname?.includes('/admin/comments') ? 'bg-neutral-200/60 text-neutral-900' : 'text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900'}`}>
              <MessageSquare className={`w-4 h-4 mr-2.5 ${pathname?.includes('/admin/comments') ? 'text-neutral-900' : 'text-neutral-400'}`} /> Comments
            </Link>
          </div>

          <div className="mt-6 mb-1 px-2 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">Settings</div>
          <div className="space-y-0.5">
            <Link href="/admin/settings/appearance" className={`flex items-center px-2 py-1.5 text-[13px] font-medium rounded-md transition-colors ${pathname?.includes('/admin/settings/appearance') ? 'bg-neutral-200/60 text-neutral-900' : 'text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900'}`}>
              <Settings className={`w-4 h-4 mr-2.5 ${pathname?.includes('/admin/settings/appearance') ? 'text-neutral-900' : 'text-neutral-400'}`} /> Appearance
            </Link>
            <Link href="/admin/settings/article" className={`flex items-center px-2 py-1.5 text-[13px] font-medium rounded-md transition-colors ${pathname?.includes('/admin/settings/article') ? 'bg-neutral-200/60 text-neutral-900' : 'text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900'}`}>
              <Settings className={`w-4 h-4 mr-2.5 ${pathname?.includes('/admin/settings/article') ? 'text-neutral-900' : 'text-neutral-400'}`} /> Article Layout
            </Link>
            <Link href="/admin/settings/homepage" className={`flex items-center px-2 py-1.5 text-[13px] font-medium rounded-md transition-colors ${pathname?.includes('/admin/settings/homepage') ? 'bg-neutral-200/60 text-neutral-900' : 'text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900'}`}>
              <Settings className={`w-4 h-4 mr-2.5 ${pathname?.includes('/admin/settings/homepage') ? 'text-neutral-900' : 'text-neutral-400'}`} /> Homepage
            </Link>
            <Link href="/admin/settings/header" className={`flex items-center px-2 py-1.5 text-[13px] font-medium rounded-md transition-colors ${pathname?.includes('/admin/settings/header') ? 'bg-neutral-200/60 text-neutral-900' : 'text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900'}`}>
              <Settings className={`w-4 h-4 mr-2.5 ${pathname?.includes('/admin/settings/header') ? 'text-neutral-900' : 'text-neutral-400'}`} /> Header
            </Link>
            <Link href="/admin/settings/footer" className={`flex items-center px-2 py-1.5 text-[13px] font-medium rounded-md transition-colors ${pathname?.includes('/admin/settings/footer') ? 'bg-neutral-200/60 text-neutral-900' : 'text-neutral-600 hover:bg-neutral-200/50 hover:text-neutral-900'}`}>
              <Settings className={`w-4 h-4 mr-2.5 ${pathname?.includes('/admin/settings/footer') ? 'text-neutral-900' : 'text-neutral-400'}`} /> Footer
            </Link>
          </div>
        </div>
        
        <div className="p-3 border-t border-neutral-200">
          <Link href="/admin/login" className="flex items-center px-2 py-1.5 text-[13px] font-medium text-neutral-600 rounded-md hover:bg-neutral-200/50 hover:text-neutral-900 transition-colors">
            <LogOut className="w-4 h-4 mr-2.5 text-neutral-400" /> Sign out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
        
        {/* Top Header */}
        <header className="h-12 border-b border-neutral-200 flex items-center justify-between px-6 shrink-0 bg-white">
          <div className="flex items-center text-[13px] text-neutral-500 font-medium">
            <Link href="/admin" className="hover:text-neutral-900 transition-colors">Foxiz</Link>
            <ChevronRight className="w-3.5 h-3.5 mx-1 text-neutral-300" />
            <span className="text-neutral-900">{getBreadcrumb()}</span>
          </div>
          
          <div className="flex items-center">
            <Link 
              href="/" 
              target="_blank"
              className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-neutral-600 bg-white border border-neutral-200 rounded-md hover:bg-neutral-50 hover:text-neutral-900 transition-colors shadow-sm"
            >
              Visit Site
              <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto bg-white text-neutral-900">
          <div className="p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
