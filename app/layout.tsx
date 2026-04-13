import "./globals.css";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#222831] min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
