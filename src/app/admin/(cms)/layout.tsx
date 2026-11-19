import Link from "next/link";
import { db } from "@/db";
import { logout, runSetup } from "../actions";
import { databaseReady } from "@/db/setup";
import AdminNav from "./AdminNav";

export const metadata = { title: "Admin", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function CmsLayout({ children }: { children: React.ReactNode }) {
  const ready = await databaseReady();
  return (
    <div className="min-h-screen bg-paper text-eagle lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-eagle/10 bg-sky p-4 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:p-6">
        <div className="flex items-center justify-between lg:block">
          <Link href="/admin" className="display flex items-center gap-2 text-lg"><span className="text-red">:::</span> Studio</Link>
          <form action={logout} className="lg:hidden"><button className="text-sm text-ash">Sign out</button></form>
        </div>
        <AdminNav />
        <div className="mt-8 hidden space-y-2 text-sm lg:block">
          <Link href="/" target="_blank" className="block text-ash hover:text-eagle">View site ↗</Link>
          <form action={logout}><button className="text-ash hover:text-red">Sign out</button></form>
        </div>
      </aside>
      <div className="min-w-0 p-4 sm:p-8 lg:p-12">
        {!db && (
          <div className="mb-8 rounded-2xl border border-red/30 bg-red/5 p-5 text-sm">
            <b>No database connected.</b> The site is running on its built-in content. In Netlify, enable Netlify DB (or add DATABASE_URL), then run the setup in the README to start editing here.
          </div>
        )}
        {db && !ready ? (
          <div className="max-w-xl rounded-2xl border border-eagle/10 bg-sky p-8">
            <p className="display text-3xl">One-time setup</p>
            <p className="mt-3 text-ash">Your database is connected but empty. This creates the tables and adds the starter content (three insights and five work entries).</p>
            <form action={runSetup} className="mt-6"><button className="btn-dark">Set up database</button></form>
          </div>
        ) : children}
      </div>
    </div>
  );
}
