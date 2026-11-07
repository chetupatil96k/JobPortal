
import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    options: ["Pune", "Mumbai", "Bangalore", "Hyderabad", "Remote"],
  },
  {
    filterType: "Industry",
    options: [
      "Software Development",
      "Information Technology",
      "Banking",
      "Healthcare",
      "Education",
    ],
  },
  {
    filterType: "Salary",
    options: ["0-3 LPA", "3-6 LPA", "6-10 LPA", "10-15 LPA", "15+ LPA"],
  },
];

const FilterCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">
          Filters
        </h2>

        <button className="text-sm text-blue-600 hover:underline">
          Clear All
        </button>
      </div>

      <div className="border-t border-gray-200 mb-5"></div>

      {/* Filter Options */}
      {filterData.map((data, index) => (
        <div key={data.filterType} className="mb-5">

          <h3 className="font-semibold text-sm text-gray-800 mb-3">
            {data.filterType}
          </h3>

          <RadioGroup className="space-y-3">
            {data.options.map((option, idx) => (
              <div key={option} className="flex items-center gap-2">
                <RadioGroupItem
                  value={option}
                  id={`${index}-${idx}`}
                />

                <Label
                  htmlFor={`${index}-${idx}`}
                  className="text-sm text-gray-600 cursor-pointer font-normal"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {index !== filterData.length - 1 && (
            <div className="border-t border-gray-200 mt-5"></div>
          )}

        </div>
      ))}
    </div>
  );
};

export default FilterCard;
