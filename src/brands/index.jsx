import { useMemo, useState } from "react";
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import carsData from "../../data.json";
import MostSearchedCar from "@/components/MostSearchedCar";
import { Link } from "react-router-dom";

function AllBrands() {
  const [search, setSearch] = useState("");

  const popularBrands = [
    "Toyota",
    "Honda",
    "Nissan",
    "Hyundai",
    "Kia",
    "Mercedes-Benz",
    "BMW",
    "Volkswagen",
    "Ford",
    "BYD",
    "Foton", 
    "Cadillac",
    "Lexus",
    "Renault Samsung",
    "Land Rover"
  ];

  const blockedBrands = [
    "Lada",
    "Sisu",
    "DeSoto"
  ];

  const filteredCars = useMemo(() => {
    if (search.trim() !== "") {
      return carsData.filter(car =>
        car.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    const allowedCars = carsData.filter(
      car => !blockedBrands.includes(car.name)
    );

    //  Get popular cars
    const popular = allowedCars.filter(car =>
      popularBrands.includes(car.name)
    ).slice(0, 15);

    // Get remaining cars
    const remaining = allowedCars.filter(
      car => !popularBrands.includes(car.name)
    );

    // Shuffle remaining cars
    const shuffled = [...remaining].sort(() => 0.5 - Math.random());

    const random15 = shuffled.slice(0, 10);

    return [...popular, ...random15];
  }, [search]);

  return (
    <div>
      <Header />

      <div className="w-full flex flex-col items-center px-6 py-8">

        {/* Filter UI */}
        <div className="w-full max-w-xl mb-8 flex gap-3">
          <input
            type="text"
            placeholder="Search any car brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />
          <button
            onClick={() => setSearch("")}
            className="px-5 py-3 bg-primary text-white rounded-xl hover:bg-gray-700 transition"
          >
            Clear
          </button>
        </div>

        {/* 🚗 Cars Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full max-w-6xl">
          {filteredCars.map((brands, index) => (
            <Link
              key={index}
              to={brands.slug}
              className="p-4 rounded-2xl border bg-white shadow-sm hover:shadow-md transition flex flex-col items-center justify-center"
            >
              <img
                src={brands.image.localThumb}
                width={80}
                height={80}
                alt={brands.name}
                className="object-contain mb-3"
              />
              <span className="text-sm font-semibold text-gray-700 text-center">
                {brands.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
          <MostSearchedCar/>

      <Footer />
    </div>
  );
}

export default AllBrands;