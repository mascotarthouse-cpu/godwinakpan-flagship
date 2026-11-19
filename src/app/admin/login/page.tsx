import LoginForm from "./LoginForm";
export const metadata = { title: "Admin", robots: { index: false } };
export default async function Login({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian px-4 text-sky">
      <div className="w-full max-w-sm">
        <p className="display mb-1 text-red">:::</p>
        <h1 className="display text-4xl">Studio</h1>
        <p className="mt-2 text-sky/50">Sign in to manage godwinakpan.ng</p>
        <LoginForm next={next || "/admin"} />
      </div>
    </div>
  );
}
