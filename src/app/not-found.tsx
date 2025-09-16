export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-xl mx-auto px-6 text-center">
        <div className="text-7xl">404</div>
        <h1 className="mt-2 text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <a
          href="/"
          className="inline-block mt-6 px-5 py-3 rounded-2xl bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900"
        >
          Go home
        </a>
      </div>
    </main>
  );
}

