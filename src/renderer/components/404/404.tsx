import { Link } from 'react-router-dom';

export default function Error404() {
  return (
    <main className="grid h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-7xl font-semibold text-indigo-600">404</p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-5xl">
          Oops! This page could not be found
        </h1>
        <p className="mt-5 text-base leading-7">
          Sorry, but the page you are looking for does not exist, has been
          removed, or is temporarily unavailable.
        </p>
        <div className="mt-5 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
