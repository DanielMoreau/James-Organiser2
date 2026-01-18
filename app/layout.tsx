import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <div className="app-background">
          {children}
        </div>
      </body>
    </html>
  );
}
