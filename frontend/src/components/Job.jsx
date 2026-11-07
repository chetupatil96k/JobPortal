
import React from "react";
import { Button } from "./ui/button";
import { Bookmark, MapPin, Clock3, Briefcase, Users } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";

const Job = () => {
  return (
    <div className="group p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300">

      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Clock3 size={15} />
          <span>2 Days Ago</span>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full hover:bg-blue-50 hover:text-blue-600"
          aria-label="Save job"
        >
          <Bookmark size={18} />
        </Button>
      </div>

      {/* Company Details */}
      <div className="flex items-center gap-3 mt-5">
        <Avatar className="h-12 w-12 rounded-lg border">
          <AvatarImage
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100"
            alt="Company logo"
          />
          <AvatarFallback>TC</AvatarFallback>
        </Avatar>

        <div>
          <h2 className="font-bold text-gray-800 text-base">
            Tech Company
          </h2>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <MapPin size={14} />
            India
          </p>
        </div>
      </div>

      {/* Job Information */}
      <div className="mt-5">
        <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          MERN Stack Developer
        </h1>

        <p className="text-sm text-gray-500 mt-2 leading-6 line-clamp-2">
          We are looking for a passionate MERN Stack Developer to build
          scalable web applications using MongoDB, Express, React and Node.js.
        </p>
      </div>

      {/* Job Highlights */}
      <div className="flex flex-wrap gap-2 mt-5">
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Users size={13} className="mr-1" />
          5 Positions
        </Badge>

        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
          <Briefcase size={13} className="mr-1" />
          Full Time
        </Badge>

        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          6-12 LPA
        </Badge>
      </div>

      {/* Bottom Buttons */}
      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
        <Link to="/description" className="flex-1">
          <Button variant="outline" className="w-full hover:bg-blue-50 hover:text-blue-600">
            View Details
          </Button>
        </Link>

        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
          Apply Now
        </Button>
      </div>

    </div>
  );
};

export default Job;
