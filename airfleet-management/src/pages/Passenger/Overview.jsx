import React, { useEffect, useState } from "react";
import axios from "axios";

const AirportOverview = () => {
  const [airportServices, setAirportServices] = useState([]);
  const [airportLounges, setAirportLounges] = useState([]);
  const [airportShops, setAirportShops] = useState([]);
  const [airportAmenities, setAirportAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAirportData = async () => {
    try {
      const [servicesResponse, loungesResponse, shopsResponse, amenitiesResponse] = await Promise.all([
        axios.get("http://localhost:5000/api/airport/services"),
        axios.get("http://localhost:5000/api/airport/lounges"),
        axios.get("http://localhost:5000/api/airport/shops"),
        axios.get("http://localhost:5000/api/airport/amenities")
      ]);

      // Check the structure of the response data
      console.log("Services Response: ", servicesResponse.data);
      console.log("Lounges Response: ", loungesResponse.data);
      console.log("Shops Response: ", shopsResponse.data);
      console.log("Amenities Response: ", amenitiesResponse.data);

      // Ensure the responses are arrays before setting the state
      setAirportServices(servicesResponse.data || []);
      setAirportLounges(loungesResponse.data || []);
      setAirportShops(shopsResponse.data || []);
      setAirportAmenities(amenitiesResponse.data || []);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("There was an error fetching the data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAirportData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Loading Airport Overview...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">{error}</h2>
        </div>
      </div>
    );
  }

  // Check if the data is properly set in the state
  console.log("State after fetching data:", {
    airportServices,
    airportLounges,
    airportShops,
    airportAmenities
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Airport Overview</h2>

        {/* Airport Services */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Airport Services</h3>
          <div className="space-y-4">
            {airportServices.length > 0 ? (
              airportServices.map((service) => (
                <div key={service._id} className="bg-gray-700 p-4 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold">{service.name}</h4>
                  <p className="text-sm text-gray-400">{service.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No airport services available.</p>
            )}
          </div>
        </section>

        {/* Airport Lounges */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Airport Lounges</h3>
          <div className="space-y-4">
            {airportLounges.length > 0 ? (
              airportLounges.map((lounge) => (
                <div key={lounge._id} className="bg-gray-700 p-4 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold">{lounge.name}</h4>
                  <p className="text-sm text-gray-400">{lounge.description}</p>
                  <p className="text-sm text-yellow-400">Location: {lounge.location}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No airport lounges available.</p>
            )}
          </div>
        </section>

        {/* Airport Shops */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Airport Shops</h3>
          <div className="space-y-4">
            {airportShops.length > 0 ? (
              airportShops.map((shop) => (
                <div key={shop._id} className="bg-gray-700 p-4 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold">{shop.name}</h4>
                  <p className="text-sm text-gray-400">{shop.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No airport shops available.</p>
            )}
          </div>
        </section>

        {/* Airport Amenities */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Airport Amenities</h3>
          <div className="space-y-4">
            {airportAmenities.length > 0 ? (
              airportAmenities.map((amenity) => (
                <div key={amenity._id} className="bg-gray-700 p-4 rounded-lg shadow-md">
                  <h4 className="text-xl font-semibold">{amenity.name}</h4>
                  <p className="text-sm text-gray-400">{amenity.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No airport amenities available.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AirportOverview;
