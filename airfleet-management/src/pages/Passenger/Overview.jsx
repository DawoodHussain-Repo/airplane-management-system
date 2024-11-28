import React from "react";

const AirportOverview = () => {
  // Mock data for airport services, lounges, shops, and amenities
  const airportData = {
    services: [
      { id: 1, name: "Free Wi-Fi", description: "Stay connected with free Wi-Fi throughout the airport." },
      { id: 2, name: "Information Desk", description: "Ask for assistance and general information at the help desk." },
      { id: 3, name: "Lost & Found", description: "Lost your belongings? Visit the Lost & Found section." },
    ],
    lounges: [
      { id: 1, name: "Sky Lounge", description: "Premium access to a lounge with refreshments, Wi-Fi, and comfortable seating.", location: "Gate 5" },
      { id: 2, name: "VIP Lounge", description: "Exclusive access for first-class and business-class passengers with high-end services.", location: "Near Security" },
    ],
    shops: [
      { id: 1, name: "Duty-Free", description: "Shop for international brands, perfumes, cosmetics, and more." },
      { id: 2, name: "Tech Store", description: "Find gadgets, electronics, and accessories for your journey." },
      { id: 3, name: "Fashion Boutique", description: "Explore a variety of stylish clothing and accessories." },
    ],
    amenities: [
      { id: 1, name: "Restrooms", description: "Clean and accessible restrooms located throughout the airport." },
      { id: 2, name: "Charging Stations", description: "Charge your devices at stations located in common areas." },
      { id: 3, name: "Baby Care Rooms", description: "Private rooms for mothers with young children to feed and change babies." },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Airport Overview</h2>

        {/* Airport Services */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Airport Services</h3>
          <div className="space-y-4">
            {airportData.services.map((service) => (
              <div key={service.id} className="bg-gray-700 p-4 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold">{service.name}</h4>
                <p className="text-sm text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Airport Lounges */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Airport Lounges</h3>
          <div className="space-y-4">
            {airportData.lounges.map((lounge) => (
              <div key={lounge.id} className="bg-gray-700 p-4 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold">{lounge.name}</h4>
                <p className="text-sm text-gray-400">{lounge.description}</p>
                <p className="text-sm text-yellow-400">Location: {lounge.location}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Airport Shops */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Airport Shops</h3>
          <div className="space-y-4">
            {airportData.shops.map((shop) => (
              <div key={shop.id} className="bg-gray-700 p-4 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold">{shop.name}</h4>
                <p className="text-sm text-gray-400">{shop.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Airport Amenities */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Airport Amenities</h3>
          <div className="space-y-4">
            {airportData.amenities.map((amenity) => (
              <div key={amenity.id} className="bg-gray-700 p-4 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold">{amenity.name}</h4>
                <p className="text-sm text-gray-400">{amenity.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AirportOverview;
