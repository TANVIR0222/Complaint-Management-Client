import { TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useUserRegisterMutation } from "../app/feature/userApi/userApi";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  // react hook form 
  const { register,handleSubmit,formState: { errors } , reset} = useForm();
  // error message
  const [error, setError] = useState('');
  // navigate
  const navigate = useNavigate();  

  // api call
  const [userRegister , {isLoading}] =useUserRegisterMutation();

  //  handle submit user register
  const onSubmit = async (data) =>{

    // user all data 
    const user ={
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
    }

    try {
      // user register success 
     const {message} = await  userRegister(user).unwrap();
     if(message){
      
      reset();
      navigate('/login');
     }

    } catch (error) {
      // error message
      setError(error?.originalStatus)
    }

  };


  return (
    <div className=" container flex items-center justify-center   ">
      <div className=" grid grid-cols-1 gap-4  ">
        <h1 className="text-[22px] font-medium  mt-24">Log in to your account</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-96  gap-4 my-3  ">
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              type={"text"}
              name="firstname"
              {...register("firstname", { required: true })} 
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E51A17",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#E51A17",
                },
              }}
            />
           {errors.firstname && <span className="text-red-500 my-1 text-[14px] font-light">This field is required</span>}
          </div>
          <div className="w-96  gap-4  ">
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              type={"text"}
              name="lastname"
              {...register("lastname", { required: true })} 
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E51A17",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#E51A17",
                },
              }}
            />
            {errors.lastname && <span className="text-red-500 my-1 text-[14px] font-light">This field is required</span>}
          </div>
          {/* email  */}
          <div className="w-96  gap-4 my-3 ">
            <TextField
              fullWidth
              label="Your Email"
              variant="outlined"
              type={"email"}
              {...register("email", { required: true })} 
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E51A17",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#E51A17",
                },
              }}
            />
            {errors.email && <span className="text-red-500 my-1 text-[14px] font-light">This field is required</span>}
          </div>
          {/* password */}
          <div className="w-96  flex items-center ">
            <div className="w-96">
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                label="Your Passwor"
                variant="outlined"
                {...register("password", { required: true })}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#E51A17",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#E51A17",
                  },
                }}
              />
              {errors.password && <span className="text-red-500  text-[14px] font-light">This field is required</span>}
            </div>
            <div className={`${errors.password ? "mb-6" : ''}`}>
              <p
                onClick={() => setShowPassword(!showPassword)}
                className="bg-primary p-[18px]  -ml-0.5 border uppercase text-white text-[13px] rounded-r hover:bg-textPrimary "
              >
                {" "}
                {showPassword ? "Hide" : "Show"}{" "}
              </p>
            </div>
          </div>

          {/*  */}
          <div className="flex justify-between my-3">
            <p className="text-[14px] font-light text-textPrimary texthover">
              You have a account? <Link to={"/login"}>Log in one here</Link>
            </p>
            {/* view user register error  */}
            <span className="text-red-500  text-[14px] font-light">{error === 400 ? "user already exist" : ""}</span>
          </div>
          {/*  */}
          <button className="bg-primary p-[12px] rounded font-medium w-24 border uppercase text-white text-[13px] rounded-r hover:bg-textPrimary ">
            {" "}
            {isLoading ? 'Loading' : 'Register'}
            {" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;