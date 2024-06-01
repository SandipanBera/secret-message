import Navbar from "@/components/Navbar";
export default function DashboardLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      {children}
    </div>
  )
}
