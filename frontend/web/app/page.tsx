export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Welcome to ConQ
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            A modern web application with beautiful theming system
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                12 Beautiful Themes
              </h3>
              <p className="text-muted-foreground">
                Choose from 12 carefully crafted themes to match your mood and preference.
              </p>
            </div>

            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                Smooth Transitions
              </h3>
              <p className="text-muted-foreground">
                Experience seamless theme transitions with our optimized CSS animations.
              </p>
            </div>

            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                Persistent Preferences
              </h3>
              <p className="text-muted-foreground">
                Your theme choice is saved locally and restored on every visit.
              </p>
            </div>

            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                Modern Stack
              </h3>
              <p className="text-muted-foreground">
                Built with Next.js 16, React 19, and Tailwind CSS v4 for optimal performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
