import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function Register() {
  const schema = yup.object().shape({
    fullName: yup.string().required("Your Full Name is Required!"),
    age: yup
      .number()
      .transform((value) => (isNaN(value) ? 0 : value))
      .positive()
      .integer()
      .min(18)
      .required("Your Age is Required!"),
    phone: yup
      .number()
      .transform((value) => (isNaN(value) ? 0 : value))
      .positive()
      .integer()
      .required("Your Phone is Required!"),
    email: yup
      .string("email should be a string")
      .email("please provide a valid email address")
      .required("email address is required"),
    password: yup
      .string("password should be a string")
      .min(5, "password should have a minimum length of 5")
      .max(12, "password should have a maximum length of 12")
      .required("password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Don't Match")
      .required(),
    radio: yup.mixed().required("Gender is Required..."),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="container">
        <div className="title">Registration</div>
        <div className="content">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Full Name</span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  {...register("fullName")}
                />
                <p className="text-red">{errors.fullName?.message}</p>
              </div>
              <div className="input-box">
                <span className="details">Age</span>
                <input
                  type="number"
                  placeholder="Enter your Age"
                  {...register("age")}
                />
           
                  <p className="text-red">{errors.age?.message}</p>
               
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  placeholder="Enter your email"
                  {...register("email")}
                />
         
                  <p className="text-red">{errors.email?.message}</p>
               
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  type="number"
                  placeholder="Enter your number"
                  {...register("phone")}
                />
            
                  <p className="text-red">{errors.phone?.message}</p>
              
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="text"
                  placeholder="Enter your password"
                  {...register("password")}
                />
            
                  <p className="text-red">{errors.password?.message}</p>
               
              </div>
              <div className="input-box">
                <span className="details">Confirm Password</span>
                <input
                  type="text"
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                />
            
                  <p className="text-red">
                    {errors.confirmPassword?.message}
                  </p>
            
              </div>
            </div>
            <div className="gender-details">
              <input
                type="radio"
                id="dot-1"
                {...register("radio")}
                value="male"
              />
              <input
                type="radio"
                id="dot-2"
                {...register("radio")}
                value="female"
              />
              <input
                type="radio"
                id="dot-3"
                {...register("radio")}
                value="other"
              />
              <span className="gender-title">Gender</span>
              <div className="category">
                <label htmlFor="dot-1">
                  <span className="dot one"></span>
                  <span className="gender">Male</span>
                </label>
                <label htmlFor="dot-2">
                  <span className="dot two"></span>
                  <span className="gender">Female</span>
                </label>
                <label htmlFor="dot-3">
                  <span className="dot three"></span>
                  <span className="gender">Prefer not to say</span>
                </label>
              </div>
         
                <p className="text-red">{errors.radio?.message}</p>
           
            </div>

            <div className="button">
              <input type="submit" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
