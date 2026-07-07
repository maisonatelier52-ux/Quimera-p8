import Link from 'next/link';
import { Home, LayoutDashboard, FileText, Folder, Users, Layers, LogOut, Settings } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link href="/admin" className="text-xl font-bold text-blue-600 tracking-tight">Admin Panel</Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <Link href="/admin" className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors">
            <LayoutDashboard className="w-5 h-5 mr-3 text-gray-500" /> Dashboard
          </Link>
          <Link href="/admin/articles" className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors">
            <FileText className="w-5 h-5 mr-3 text-gray-500" /> Articles
          </Link>
          <Link href="/admin/categories" className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors">
            <Folder className="w-5 h-5 mr-3 text-gray-500" /> Categories
          </Link>
          <Link href="/admin/authors" className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors">
            <Users className="w-5 h-5 mr-3 text-gray-500" /> Authors
          </Link>
          <Link href="/admin/pages" className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors">
            <Layers className="w-5 h-5 mr-3 text-gray-500" /> Pages
          </Link>
          <div className="pt-4 mt-4 border-t border-gray-100">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Settings</p>
            <Link href="/admin/settings/appearance" className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors">
              <Settings className="w-5 h-5 mr-3 text-gray-500" /> Appearance
            </Link>
            <Link href="/admin/settings/article" className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors">
              <Settings className="w-5 h-5 mr-3 text-gray-500" /> Article Settings
            </Link>
            <Link href="/admin/settings/homepage" className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors">
              <Settings className="w-5 h-5 mr-3 text-gray-500" /> Homepage
            </Link>
            <Link href="/admin/settings/header" className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors">
              <Settings className="w-5 h-5 mr-3 text-gray-500" /> Header
            </Link>
            <Link href="/admin/settings/footer" className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors">
              <Settings className="w-5 h-5 mr-3 text-gray-500" /> Footer
            </Link>
          </div>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Link href="/admin/login" className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5 mr-3" /> Logout
          </Link>
        </div>
      </aside>
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
          <h1 className="text-lg font-semibold text-gray-800">Welcome Back, Admin</h1>
          <Link href="/" className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
            <Home className="w-4 h-4 mr-2" /> View Site
          </Link>
        </header>
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
          {children}
        </div>
      </main>
    </div>
  );
}
