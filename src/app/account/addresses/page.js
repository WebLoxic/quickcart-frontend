"use client";

import { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 28.7041,
  lng: 77.1025,
};

export default function AddressesPage() {
  const [openModal, setOpenModal] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(center);

  const handleMapClick = (e) => {
    setMarkerPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        My Addresses
      </h1>

      <button
        onClick={() => setOpenModal(true)}
        className="text-green-600 mb-6 font-medium"
      >
        + Add new address
      </button>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="font-semibold">Home</p>
        <p className="text-sm text-gray-600">
          Commercial Complex, Gopal Nagar, Azadpur, Delhi
        </p>
      </div>

      {/* ================= MODAL ================= */}
      {openModal && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-end md:items-center justify-center">

    {/* Modal Container */}
    <div className="
      bg-white w-full
      h-[85vh] md:h-[80vh]
      md:w-[900px]
      rounded-t-2xl md:rounded-2xl
      overflow-hidden
      shadow-xl
      animate-slideUp
    ">

      {/* ===== MOBILE STYLE HEADER ===== */}
      <div className="md:hidden p-4 border-b flex items-center justify-between">
        <button onClick={() => setOpenModal(false)}>←</button>
        <p className="font-semibold">Confirm map pin location</p>
        <div></div>
      </div>

      <div className="grid md:grid-cols-2 h-full">

        {/* ===== MAP SECTION ===== */}
        <div className="h-[55%] md:h-full">
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={markerPosition}
              zoom={15}
              onClick={handleMapClick}
            >
              <Marker position={markerPosition} />
            </GoogleMap>
          </LoadScript>
        </div>

        {/* ===== FORM SECTION ===== */}
        <div className="p-4 md:p-6 flex flex-col justify-between overflow-y-auto">

          <div className="space-y-3">

            <h2 className="hidden md:block text-lg font-semibold">
              Enter complete address
            </h2>

            <input
              type="text"
              placeholder="Flat / House no / Building name"
              className="w-full p-2.5 border rounded-lg text-sm"
            />

            <input
              type="text"
              placeholder="Floor (optional)"
              className="w-full p-2.5 border rounded-lg text-sm"
            />

            <input
              type="text"
              placeholder="Area / Sector / Locality"
              className="w-full p-2.5 border rounded-lg text-sm"
            />

            <input
              type="text"
              placeholder="Nearby Landmark"
              className="w-full p-2.5 border rounded-lg text-sm"
            />

            <input
              type="text"
              placeholder="Your name"
              className="w-full p-2.5 border rounded-lg text-sm"
            />

            <input
              type="text"
              placeholder="Phone number"
              className="w-full p-2.5 border rounded-lg text-sm"
            />

          </div>

          <button className="mt-4 bg-green-600 text-white py-2.5 rounded-lg text-sm font-medium">
            Confirm location & proceed
          </button>

        </div>

      </div>
    </div>
  </div>
)}
    </div>
  );
}