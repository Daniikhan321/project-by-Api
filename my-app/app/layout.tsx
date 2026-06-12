export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav
          style={{
            padding: "20px",
            background: "#f5f5f5",
          }}
        >
          My Navbar
        </nav>

        {children}

        <footer
          style={{
            padding: "20px",
            background: "#f5f5f5",
            marginTop: "50px",
          }}
        >
          My Footer
        </footer>
      </body>
    </html>
  );
}