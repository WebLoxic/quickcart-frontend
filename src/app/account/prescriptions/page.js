export default function PrescriptionsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        My Prescriptions
      </h1>

      <div className="text-center py-20">
        <div className="text-6xl mb-6">📝</div>
        <h2 className="text-xl font-semibold">
          No prescriptions uploaded yet
        </h2>
        <p className="text-gray-500 mt-2">
          Upload your prescription to order medicines easily.
        </p>

        <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg">
          Upload Prescription
        </button>
      </div>
    </div>
  );
}