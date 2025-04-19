export function ClientLogos() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-lg font-medium text-muted-foreground mb-8">
          Trusted By
        </h2>
        <div className="flex justify-center items-center space-x-12 opacity-75 grayscale">
          {/* Placeholder for client logos - replace src with actual logo URLs */}
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=150"
            alt="Client Logo"
            className="h-8 object-contain"
          />
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=150"
            alt="Client Logo"
            className="h-8 object-contain"
          />
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=150"
            alt="Client Logo"
            className="h-8 object-contain"
          />
        </div>
      </div>
    </section>
  );
}