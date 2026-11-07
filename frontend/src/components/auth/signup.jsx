
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import store from "../../redux/store";
import { setLoading } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";
function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
  });

  const [profile, setProfile] = useState(null);
  const [preview, setPreview] = useState("");
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {loading} = useSelector(store=>store.auth);
  const dispatch= useDispatch();


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle role selection
  const handleRoleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  // Handle profile image
  const handleProfileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image.");
        return;
      }

      setProfile(file);
      setPreview(URL.createObjectURL(file));
      setError("");
    }
  };

  // Clean up preview URL
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      
      dispatch(setLoading(true))

      // Create FormData
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      // Append profile image
      if (profile) {
        data.append("profile", profile);
      }

      // API request
      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        data,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Registration successful!");

        // Clear form
        setFormData({
          fullname: "",
          email: "",
          phoneNumber: "",
          password: "",
          role: "student",
        });

        setProfile(null);
        setPreview("");

        // Redirect to login
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.error("Signup Error:", error);

      setError(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      dispatch(setLoading(false))
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex justify-center items-center px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-xl p-6 sm:p-8"
        >
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Create Account
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Join JobPortal and find your next opportunity.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm mb-4">
              {success}
            </div>
          )}

          {/* Full Name */}
          <div className="mb-4">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullname}
              onChange={handleChange}
              required
              autoComplete="name"
              className="mt-2"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="mt-2"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              autoComplete="tel"
              className="mt-2"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="mt-2"
            />
          </div>

          {/* Role and Profile */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 my-5">
            <div>
              <Label className="mb-3 block">Register As</Label>

              <RadioGroup
                value={formData.role}
                onValueChange={handleRoleChange}
                className="flex items-center gap-5"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student">Student</Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem value="recruiter" id="recruiter" />
                  <Label htmlFor="recruiter">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Profile Image */}
            <div>
              <Label htmlFor="profile" className="block mb-2">
                Profile Photo
              </Label>

              <div className="flex items-center gap-3">
                {preview && (
                  <img
                    src={preview}
                    alt="Profile preview"
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                )}

                <Input
                  id="profile"
                  type="file"
                  accept="image/*"
                  onChange={handleProfileChange}
                  className="max-w-48 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          {
           loading ?<Button  className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold"><Loader2 className="w-4 h-4 mr-2 animate-spin" />please wait..</Button> :
            <Button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            SignUp
          </Button>
         }

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
