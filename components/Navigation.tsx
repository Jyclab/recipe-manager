import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-green-700">
          🍴 Recipe Manager
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/recipes" className="text-gray-600 hover:text-green-700">
            Recipes
          </Link>
          <Link
            href="/categories"
            className="text-gray-600 hover:text-green-700"
          >
            Categories
          </Link>

          {session ? (
            <>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-green-700"
              >
                Dashboard
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-700 font-medium">
                {session.user?.name}
              </span>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="text-gray-600 hover:text-red-600"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-green-700">
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
