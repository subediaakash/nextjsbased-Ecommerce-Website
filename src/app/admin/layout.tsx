import { Navbar } from "@/components/Navbar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />

      <div className="container my-6">{children}</div>
    </>
  );
}
