import Image from 'next/image';

export function ClientLogos() {
  const clients = [
    {
      name: "Airbnb",
      logo: "/images/clients/airbnb-logo.svg",
      width: 120
    },
    {
      name: "Dropbox",
      logo: "/images/clients/dropbox-logo.svg",
      width: 130
    },
    {
      name: "Slack",
      logo: "/images/clients/slack-logo.svg",
      width: 120
    },
    {
      name: "Spotify",
      logo: "/images/clients/spotify-logo.svg",
      width: 110
    },
    {
      name: "Stripe",
      logo: "/images/clients/stripe-logo.svg",
      width: 100
    }
  ];

  return (
    <div className="w-full">
      <h2 className="text-center text-lg font-medium text-muted-foreground mb-8">
        Trusted By
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 opacity-75 grayscale">
        {clients.map((client) => (
          <div key={client.name} className="relative h-8 transition-all duration-300 hover:opacity-100 hover:filter-none">
            <Image 
              src={client.logo} 
              alt={`${client.name} logo`}
              width={client.width}
              height={32}
              className="h-8 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}