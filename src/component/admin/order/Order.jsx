"use client";

export default function Order() {

  return (

    <div>

      <h1 className="text-2xl font-bold mb-6">
        Orders
      </h1>

      <div className="bg-white rounded-lg shadow p-6">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">Order ID</th>
              <th className="text-left">Customer</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-b">

              <td>#1021</td>
              <td>John Doe</td>
              <td>$120</td>
              <td className="text-green-500">Paid</td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

  );

}