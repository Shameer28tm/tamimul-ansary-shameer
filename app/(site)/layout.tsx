import { MotionProvider } from "@/components/MotionProvider";
import { Loader } from "@/components/Loader";
import { Cursor } from "@/components/Cursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <MotionProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Loader />
      <Cursor />
      <Navbar />
      {children}
      <Footer />
    </MotionProvider>
  );
}
