"use client";

export default function Dashboard() {

  return (

    <div className="space-y-6">

      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      {/* Cards */}

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">Total Sales</p>
          <h2 className="text-2xl font-bold">34,945</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">Total Income</p>
          <h2 className="text-2xl font-bold">$37,802</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">Orders Paid</p>
          <h2 className="text-2xl font-bold">34,945</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">Total Visitors</p>
          <h2 className="text-2xl font-bold">34,945</h2>
        </div>

      </div>

    </div>

  );

}