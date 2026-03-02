export default function PrivacyPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Account Privacy
      </h1>

      <div className="space-y-6">

        <div className="bg-gray-50 p-5 rounded-lg">
          <h3 className="font-semibold mb-2">
            Change Password
          </h3>
          <button className="text-green-600 font-medium">
            Update Password
          </button>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg">
          <h3 className="font-semibold mb-2">
            Delete Account
          </h3>
          <button className="text-red-600 font-medium">
            Request Account Deletion
          </button>
        </div>

      </div>
    </div>
  );
}