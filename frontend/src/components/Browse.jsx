
import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { Search, MapPin, BriefcaseBusiness } from "lucide-react";

const Browse = () => {
  const [search, setSearch] = useState("");

  const categories = [
    "Frontend Developer",
    "Backend Developer",
    "MERN Stack Developer",
    "Java Developer",
    "Software Tester",
    "Data Analyst",
  ];

  const jobArray = [1, 2, 3, 4, 5, 6];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", search);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Hero Section */}
        <div className="text-center mb-10">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            Explore Opportunities
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Find Your <span className="text-blue-600">Dream Job</span>
          </h1>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Discover exciting career opportunities from top companies.
            Find the perfect job that matches your skills.
          </p>
        </div>

        {/* Search Section */}
        <form
          onSubmit={handleSearch}
          className="max-w-3xl mx-auto bg-white p-3 rounded-xl shadow-md border border-gray-200 flex flex-col sm:flex-row gap-3"
        >
          <div className="flex items-center gap-3 flex-1 px-3">
            <Search className="text-blue-500" size={20} />

            <input
              type="text"
              placeholder="Job title, skills or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none text-sm py-2"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-lg font-semibold transition"
          >
            Search Jobs
          </button>
        </form>

        {/* Categories */}
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-5">
            <h2 className="text-xl font-bold text-gray-800">
              Popular Job Categories
            </h2>

            <span className="text-sm text-gray-500">
              Explore your career options
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSearch(category)}
                className="bg-white border border-gray-200 rounded-xl p-4 text-sm font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition"
              >
                <BriefcaseBusiness
                  className="mx-auto mb-3 text-blue-500"
                  size={24}
                />
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Jobs */}
        <div className="mt-14">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Featured Jobs
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Latest opportunities for you
              </p>
            </div>

            <span className="text-sm text-blue-600 font-medium">
              {jobArray.length} Jobs Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobArray.map((job) => (
              <Job key={job} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold">
            Ready to Take the Next Step?
          </h2>

          <p className="mt-3 text-blue-100">
            Create your profile and start applying for your dream job today.
          </p>

          <button
            onClick={() => window.location.href = "/signup"}
            className="mt-6 bg-white text-blue-600 px-7 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Create Your Account
          </button>
        </div>

      </div>
    </div>
  );
};

export default Browse;
