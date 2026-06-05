import { useState } from "react";
// import { useNavigate } from "react-router-dom";

function SignUp() {
  const [initialFormData] = useState({
    name:"",
    email: "",
    password: "",
    confirm_password:""
  })

  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (!formData.confirm_password.trim()) {
      newErrors.confirm_password = "Confirm Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const isEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validateEmail = (value) => {
    const newErrors = {};
    if (!isEmail(value)) {
      newErrors.email = "Email should be correct format!!"
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const passwordMath = (password, confirm_password) => {
    const newErrors = {};

    if(password !== confirm_password){
        newErrors.confirm_password = "Password does not match"
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleReset = (e) => {
    setFormData(initialFormData);
    setErrors({})
  }

  const handleSignUp = (e) => {
    e.preventDefault();

    if (!validate()) {
        return
    }

    if(!validateEmail(formData?.email)){
        return
    }

    if (!passwordMath(formData?.password, formData?.confirm_password)) {
        return;
    }

    // storage
    localStorage.setItem("name", formData?.name)
    localStorage.setItem("email", formData?.email)
    localStorage.setItem("password", formData?.password)
    alert("SignUp Successfully")
    setFormData(initialFormData)
  };

  console.log("formData: ", formData)
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[360px] bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="text-blue-900 text-2xl mb-2">
            ↔
          </div>
          <h1 className="text-3xl font-bold text-blue-900">
            Jio Discover
          </h1>
          <p className="text-sm text-gray-500">
            Network topology platform
          </p>
        </div>

        {/* Form */}
        <form>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="name"
              name="name"
              onChange={handleChange}
              placeholder="adf"
              className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="netops@jio.com"
              className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full h-11 px-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirm_password}
              </p>
            )}
          </div>

          {/* Button */}
          <div className="w-full flex">
          <button
            type="submit"
            className="w-30 h-11 flex-1 mx-1 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-lg transition"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <button
            type="reset"
            className="w-30 h-11 flex-1 bg-orange-900 hover:bg-blue-800 text-white font-semibold rounded-lg transition"
            onClick={handleReset}
          >
            Reset
          </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default SignUp