import ThemeSelector from "@/components/ThemeSelector";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20">
      <main className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 py-12">
          <h1 className="text-5xl font-bold text-foreground">
            Welcome to Conq
          </h1>
          <p className="text-xl text-muted-foreground">
            Social Media Content Pipeline Manager
          </p>
        </div>

        {/* Theme Selector Section */}
        <section className="space-y-4">
          <ThemeSelector />
        </section>

        {/* Demo Cards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Theme Preview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Card */}
            <div className="p-6 bg-card rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Primary Colors</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity">
                  Primary Button
                </button>
                <button className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity">
                  Secondary Button
                </button>
                <button className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity">
                  Accent Button
                </button>
              </div>
            </div>

            {/* State Colors Card */}
            <div className="p-6 bg-card rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">State Colors</h3>
              <div className="space-y-3">
                <div className="px-4 py-2 bg-success text-success-foreground rounded-md">
                  Success Message
                </div>
                <div className="px-4 py-2 bg-warning text-warning-foreground rounded-md">
                  Warning Message
                </div>
                <div className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md">
                  Error Message
                </div>
              </div>
            </div>

            {/* Text Variants Card */}
            <div className="p-6 bg-card rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Text Variants</h3>
              <div className="space-y-2">
                <p className="text-foreground">Primary text color</p>
                <p className="text-muted-foreground">Muted text color</p>
                <p className="text-card-foreground">Card text color</p>
                <a href="#" className="text-link hover:text-link-hover transition-colors">
                  Link text color
                </a>
              </div>
            </div>

            {/* Interactive Elements Card */}
            <div className="p-6 bg-card rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Interactive Elements</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Text input"
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="flex justify-center pt-8">
          <a
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
            href="/dashboard"
          >
            Go to Dashboard
          </a>
        </section>
      </main>
    </div>
  );
}
