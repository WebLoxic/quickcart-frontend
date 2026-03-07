import Sidebar from "@/component/admin/sidebar/Sidebar";
import Header from "@/component/layout/Header";

export default function AdminLayout({ children }) {

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Right Content */}

      <div className="flex-1 flex flex-col">

        <Header />

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>

  );

}