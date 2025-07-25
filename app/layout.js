import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Mini Blog",
  description: "A modern, professional blog built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
