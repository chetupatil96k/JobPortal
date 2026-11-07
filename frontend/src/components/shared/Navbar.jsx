
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";

import { Button } from "../ui/button";
import { User2, LogOut } from "lucide-react";
import { useSelector } from "react-redux";

export default function Navbar() {
  // Temporary user data
  // Later, replace this with Redux or Context API user data.

  const {user}= useSelector(store=>store.auth);
  

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-8 py-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          Job<span className="text-[#F83002]">Portal</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-3 sm:gap-6">

          <ul className="flex items-center gap-3 sm:gap-6 font-medium text-gray-700 text-sm sm:text-base">
            <li>
              <Link
                to="/"
                className="hover:text-[#F83002] transition-colors"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/Jobs"
                className="hover:text-[#F83002] transition-colors"
              >
                Jobs
              </Link>
            </li>

            <li>
              <Link
                to="/Browse"
                className="hover:text-[#F83002] transition-colors"
              >
                Browse
              </Link>
            </li>
          </ul>

          {/* Conditional Rendering */}
          {!user ? (
            // When user is not logged in
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button
                  size="sm"
                  className="bg-[#F83002] hover:bg-[#d62905] text-white"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            // When user is logged in
            <Popover>
              <PopoverTrigger
                render={
                  <button type="button" className="rounded-full">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CP</AvatarFallback>
                    </Avatar>
                  </button>
                }
              />

              <PopoverContent className="w-72 mr-4">

                {/* User Information */}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CP</AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-semibold">
                      Chetan Pawar
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      user@example.com
                    </p>
                  </div>
                </div>

                <hr className="my-3" />

                {/* Profile and Logout */}
                <div className="flex flex-col gap-2">

                  <Link
                    to="/profile"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100"
                  >
                    <User2 size={18} />
                    <span className="text-sm font-medium">
                      View Profile
                    </span>
                  </Link>

                  <button
                    type="button"
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 text-red-600"
                    onClick={() => console.log("Logout clicked")}
                  >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">
                      Logout
                    </span>
                  </button>

                </div>
              </PopoverContent>
            </Popover>
          )}

        </div>
      </div>
    </nav>
  );
}
