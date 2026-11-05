
import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link} from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader, Loader2 } from "lucide-react";

function Login() {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dispatch= useDispatch();
  const {loading}= useSelector(store=>store.auth)

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Login Data:", formData);

    // Connect your login API here.

    try {
      dispatch(setLoading(true))
      const res= await axios.post(`${USER_API_END_POINT}/login`, formData, {
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true,
      })
      if(res.data.success){
        navigate("/")
        toast.success(res.data.message)
      }
      
    } catch (error) {
      console.log(error)
      
    }finally{
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
          {/* Heading */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Login to continue your JobPortal journey.
            </p>
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

          {/* Password */}
          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="mt-2"
            />
          </div>

          {/* Role Selection */}
          <div className="mb-5">
            <Label htmlFor="role" className="block mb-2">
              Login As
            </Label>

            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="student">Student</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          {/* Submit Button */}
         {
           loading ?<Button  className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold"><Loader2 className="w-4 h-4 mr-2 animate-spin" />please wait..</Button> :
            <Button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Login
          </Button>
         }
         

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-500 mt-5">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
