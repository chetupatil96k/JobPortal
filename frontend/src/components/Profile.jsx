
import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import {
  User,
  Mail,
  Phone,
  Briefcase,
  FileText,
  Pencil,
  X,
  Save,
  Loader2,
  Camera,
} from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { setUser, setLoading } from "../redux/authSlice";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { toast } from "sonner";

const Profile = () => {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((store) => store.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle profile image
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    setProfileImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const data = new FormData();

      data.append("fullname", formData.fullname);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("bio", formData.bio);

      // Convert comma-separated skills into an array representation
      data.append(
        "skills",
        JSON.stringify(
          formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
        )
      );

      if (profileImage) {
        data.append("profile", profileImage);
      }

      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        data,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));

        toast.success(res.data.message || "Profile updated successfully!");

        setIsEditing(false);
        setProfileImage(null);
        setPreview("");
      }
    } catch (error) {
      console.error("Profile Update Error:", error);

      toast.error(
        error.response?.data?.message || "Unable to update profile."
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCancel = () => {
    setFormData({
      fullname: user?.fullname || "",
      phoneNumber: user?.phoneNumber || "",
      bio: user?.profile?.bio || "",
      skills: user?.profile?.skills?.join(", ") || "",
    });

    setProfileImage(null);
    setPreview("");
    setIsEditing(false);
  };

  const image =
    preview || user?.profile?.profileImage || "";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Profile Header */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

            <div className="flex items-center gap-5">

              <Avatar className="h-24 w-24 border">
                <AvatarImage src={image} />

                <AvatarFallback className="text-2xl bg-blue-100 text-blue-700">
                  {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {user?.fullname || "Your Name"}
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                  {user?.email}
                </p>

                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold capitalize">
                  {user?.role || "User"}
                </span>
              </div>

            </div>

            {!isEditing && (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}

          </div>
        </div>

        {/* Edit Profile Form */}
        {isEditing ? (

          <form
            onSubmit={handleSubmit}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 mt-6"
          >

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Edit Your Profile
              </h2>

              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
              >
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
            </div>

            {/* Profile Image */}
            <div className="mb-6">
              <Label className="mb-3 block">Profile Photo</Label>

              <div className="flex items-center gap-4">

                <Avatar className="h-20 w-20">
                  <AvatarImage src={image} />
                  <AvatarFallback>
                    {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <Label
                    htmlFor="profileImage"
                    className="cursor-pointer inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md text-sm"
                  >
                    <Camera className="w-4 h-4" />
                    Change Photo
                  </Label>

                  <Input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

              </div>
            </div>

            {/* Full Name */}
            <div className="mb-5">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="mt-2"
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <Label>Email Address</Label>
              <Input
                value={user?.email || ""}
                disabled
                className="mt-2 bg-gray-100"
              />
            </div>

            {/* Phone */}
            <div className="mb-5">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-2"
              />
            </div>

            {/* Bio */}
            <div className="mb-5">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                placeholder="Write something about yourself..."
                className="w-full border border-gray-300 rounded-md p-3 mt-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Skills */}
            <div className="mb-6">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, JavaScript, Node.js, MongoDB"
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate each skill with a comma.
              </p>
            </div>

            {/* Save Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>

          </form>

        ) : (

          /* Profile Details */
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 mt-6">

            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              <div className="flex items-center gap-3">
                <User className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-400">Full Name</p>
                  <p className="font-medium">
                    {user?.fullname || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="font-medium">
                    {user?.email || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-400">Phone Number</p>
                  <p className="font-medium">
                    {user?.phoneNumber || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Briefcase className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-400">Role</p>
                  <p className="font-medium capitalize">
                    {user?.role || "Not provided"}
                  </p>
                </div>
              </div>

            </div>

            <div className="border-t my-7" />

            {/* About */}
            <h2 className="text-lg font-bold mb-3">About Me</h2>
            <p className="text-gray-600 text-sm leading-6">
              {user?.profile?.bio || "No bio added yet."}
            </p>

            <div className="border-t my-7" />

            {/* Skills */}
            <h2 className="text-lg font-bold mb-4">Skills</h2>

            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-400">
                  No skills added yet.
                </p>
              )}
            </div>

            <div className="border-t my-7" />

            {/* Resume */}
            <h2 className="text-lg font-bold mb-3">Resume</h2>

            {user?.profile?.resume ? (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm"
              >
                <FileText className="w-4 h-4" />
                {user?.profile?.resumeOriginalName || "View Resume"}
              </a>
            ) : (
              <p className="text-sm text-gray-400">
                No resume uploaded yet.
              </p>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;
