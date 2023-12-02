import Head from 'next/head';
import dynamic from 'next/dynamic';
import CTA from './components/landing-page/CTA';
import Dashboard from './components/dashboard/Dashboard';

// Dynamically import SinginButton with SSR disabled
const SinginButton = dynamic(() => import('./components/signin/SinginButton'), {
  ssr: false,
});

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
          <Dashboard />
        </div>
        <div className="mt-6">
          <CTA />
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t text-gray-800">
        © {new Date().getFullYear()} End of Life Planner
      </footer>
    </div>
  );
}