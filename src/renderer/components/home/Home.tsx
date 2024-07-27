import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="dark:text-white text-4xl font-bold tracking-tight sm:text-6xl">
            CropDrop
          </h1>
          <p>An image cropper for profile pictures and banners</p>
          <div className="py-5 flex flex-row justify-center gap-5">
            <Link
              to="/cropper"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get Started
            </Link>
            <Link
              to="/about"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
