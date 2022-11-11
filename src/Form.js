import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; 
import * as yup from "yup";
export default function Form() {
    const schema = yup.object().shape({
        fullName: yup.string().required("Your Full Name is Required!"),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().min(18).required(),
    password: yup.string().min(4).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null],"Passwords Don't Match")
      .required(),
      accountType: yup
      .string("account type should be a string")
      .oneOf(["personal", "commercial"])
      .required("account type is required"),
    });
    const { register, handleSubmit,formState:{errors} } = useForm({
      resolver: yupResolver(schema),
    });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
         {/* {errors.email ? (
            <span className="text-red-900">{errors.email.message}</span>
          ) : (
            <></>
          )} */}
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Full Name..."
          {...register("fullName")}
        />
        <span>{errors.fullName?.message}</span>

        <input type="text" placeholder="Email..." {...register("email")} />
        <span>{errors.email?.message}</span>
        <input type="number" placeholder="Age..." {...register("age")} />
        <span>{errors.age?.message}</span>
        <input
          type="password"
          placeholder="Password..."
          {...register("password")}
        />
        <span>{errors.password?.message}</span>
        <input
          type="password"
          placeholder="confirmPassword..."
          {...register("confirmPassword")}
        />
        <span>{errors.confirmPassword?.message}</span>
        <input type="submit"/>
      </form>
    </>
  );
}
