export default function GiftCardsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        E-Gift Cards
      </h1>

      <div className="text-center py-20">
        <div className="text-6xl mb-6">🎁</div>
        <h2 className="text-xl font-semibold">
          You don't have any gift cards yet
        </h2>
        <p className="text-gray-500 mt-2">
          Buy a gift card and surprise your loved ones.
        </p>

        <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg">
          Buy Gift Card
        </button>
      </div>
    </div>
  );
}