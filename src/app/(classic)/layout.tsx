import { Inter, Lora } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

// Pages that haven't moved to the picked look yet keep the original site chrome and fonts.
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const lora = Lora({ variable: "--font-lora", subsets: ["latin"] });

export default function ClassicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} ${lora.variable} antialiased bg-warm-white text-gray-900 min-h-screen flex flex-col`}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
