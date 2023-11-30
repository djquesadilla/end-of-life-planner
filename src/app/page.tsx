import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <Head>
        <title>End of Life Planner</title>
        <meta name="description" content="Plan and share your wishes for end of life with loved ones." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center text-gray-800">
        <h1 className="text-6xl font-bold">
          End of life planner
        </h1>

        <p className="mt-3 text-2xl">
          Share your wishes for end of life with loved ones.
        </p>

        <div className="mt-6">
        <Link href="/signup" className="px-8 py-3 font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700">
          Signup
        </Link>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t text-gray-800">
        © {new Date().getFullYear()} End of Life Planner
      </footer>
    </div>
  );
}