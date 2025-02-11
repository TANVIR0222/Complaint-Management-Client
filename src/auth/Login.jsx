import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useUserLoginMutation } from "../app/feature/userApi/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../app/feature/userApi/userSlices";
import toast from 'react-hot-toast';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  // react hook form 
  const { register,handleSubmit,formState: { errors } , reset} = useForm();
  // error message
  const [error, setError] = useState('');
  // navigate
  const navigate = useNavigate();  
  
  // api call
  const dispatch = useDispatch();

  const [userLogin , {isLoading} ] = useUserLoginMutation();
  

  //  handle submit user register
  const onSubmit = async (data) =>{

    // user all data 
    const user ={
      email: data.email,
      password: data.password,
    }

    
    
    try {
      // user register success 
     const {message , data}  = await  userLogin(user).unwrap();
     const {accessToken, refreshToken ,id , role} = data;  
        
     
     // save token in local storage
     if(message){
      toast.success(message)
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);  
      dispatch(setUser(id));
      // navigate to home page
      {role === 'ADMIN' ? navigate('/admin') : navigate('/');}
      // rest page 
      reset();
  
     }     
     
    } catch (error) {
      console.log(error);
      
      setError(error?.data?.message);
    }

  };

  return (
    <div className=" flex items-center justify-center my-16 ">
      <div className=" grid grid-cols-1 gap-4  ">
        <h1 className="text-[22px] font-medium ">Log in to your account</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-96  gap-4 my-3  ">
          <TextField
            fullWidth
            label="Your Email"
            variant="outlined"
            name="email"
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
          {errors.password && <span className="text-red-500  text-[14px] font-light">This field is required</span>}

        </div>
        <div className="w-96  flex items-center ">
          <div className="w-96">
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              label="Your Password"
              variant="outlined"
              name="password"
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
        <div className=" my-2">
          
          
          <p className="text-[14px] font-light text-textPrimary texthover">
        No account? <Link to={'/register'}>Create one here</Link>
         </p>
        </div>
        <button className="bg-primary p-[12px] rounded font-medium w-24 border uppercase text-white text-[13px] rounded-r hover:bg-textPrimary ">
          {" "}
           {isLoading ? "Loading.." : "Login"} {" "}
        </button>
        </form>
      </div>
    </div>
  );
};

export default Login;