import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = {
  title: "Pratima Sahuji — Backend Developer",
  description:
    "Portfolio of Pratima Sahuji, a backend developer who builds resilient systems — APIs, databases, authentication, real-time features, and distributed event-driven architectures.",
  keywords: [
    "Backend Developer",
    "Pratima Sahuji",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "BullMQ",
    "Docker",
    "Distributed Systems",
    "WebSockets",
    "REST APIs",
    "Fintech",
    "Portfolio",
  ],
  authors: [{ name: "Pratima Sahuji", url: "https://github.com/Pratima-Sahuji" }],
  openGraph: {
    title: "Pratima Sahuji — Backend Developer",
    description:
      "I build systems that don't break. APIs, databases, authentication, and event-driven architectures.",
    url: "https://github.com/Pratima-Sahuji",
    siteName: "Pratima Sahuji Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratima Sahuji — Backend Developer",
    description:
      "I build systems that don't break. APIs, databases, authentication, and event-driven architectures.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ScrollProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
