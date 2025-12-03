import Link from "next/link";

export default function Home() {
  const linkStyle =
    "border rounded border-white py-4 px-20 text-black font bg-zinc-50 hover:bg-black hover:text-zinc-50";
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="font-bold flex min-h-screen w-full max-w-3xl items-center justify-evenly py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Link className={linkStyle} href="/admin">
          Admin
        </Link>
        <Link className={linkStyle} href="/user">
          User
        </Link>
      </main>
    </div>
  );
}
