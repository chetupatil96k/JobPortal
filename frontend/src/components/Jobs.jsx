
import React from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";

const jobArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Find Your Dream Job
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Explore opportunities that match your skills and career goals.
          </p>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col md:flex-row gap-6">

          {/* Filter Sidebar */}
          <aside className="w-full md:w-[260px] shrink-0">
            <FilterCard />
          </aside>

          {/* Job Listings */}
          <main className="flex-1 min-w-0">

            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold text-gray-800">
                Available Jobs
              </h2>

              <p className="text-sm text-gray-500">
                Showing {jobArray.length} jobs
              </p>
            </div>

            {jobArray.length === 0 ? (
              <div className="bg-white rounded-xl p-10 text-center border">
                <h2 className="text-xl font-semibold text-gray-700">
                  No Jobs Found
                </h2>
                <p className="text-gray-500 mt-2">
                  Try changing your filters to find more opportunities.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {jobArray.map((item) => (
                  <Job key={item} />
                ))}
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
