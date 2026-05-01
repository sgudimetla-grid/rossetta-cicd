import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cartContext";

export const metadata = {
  title: "AutoElite - Premium Car Marketplace",
  description: "Browse and buy premium cars. Built for testing Tekton pipelines and Rosetta workflows.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
