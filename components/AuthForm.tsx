"use client";

import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import InputCompnent from "./InputCompnent";
import ButtonComponent from "./ButtonComponent";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Varient = "Login" | "Register";

export default function AuthForm() {
  const [varient, setVarient] = useState<Varient>("Login");
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const { push } = useRouter();

  console.log(status);

  useEffect(() => {
    if (status === "authenticated") {
      console.log("Authenticated");
      push("/users");
    }
  }, [push, status]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    if (varient === "Register") {
      //   Axios Register
      try {
        const { data: user } = await axios.post(`/api/register`, data);
        signIn("credentials", data);
        return user;
      } catch (err: any) {
        toast.error(err?.message);
      } finally {
        setLoading(false);
      }
    } else {
      //Next Auth Login Login
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error(`Invalid credentials`);
          }

          if (callback?.ok && !callback.error) {
            toast.success(`login successful`);
            push("/users");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const socialAction = (action: string) => {
    setLoading(true);
    // NEXT AUTH SOCIAL Sign in
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error(`Invalid credentials`);
        }

        if (callback?.ok && !callback.error) {
          toast.success(`login successful`);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const toggleVarient = useCallback(() => {
    setVarient((prev) => (prev === "Register" ? "Login" : "Register"));
  }, [varient]);

  return (
    <div className="space-y-6 max-w-lg mx-auto dark:bg-gray-800 bg-gray-300 rounded-md p-6">
      <form
        className="max-w-lg mx-auto dark:bg-gray-800 bg-gray-300 rounded-md py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full text-center p-4">
          <h2>Sign in to your account</h2>
        </div>

        <div className="flex flex-col gap-y-3">
          {varient === "Register" && (
            <InputCompnent
              id="name"
              label="Name"
              type="text"
              register={register}
              errors={errors}
              disabled={loading}
            />
          )}
          <InputCompnent
            id="email"
            label="Email Address"
            type="email"
            register={register}
            errors={errors}
            disabled={loading}
          />
          <InputCompnent
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={loading}
          />
        </div>
        <div className="mt-6">
          <ButtonComponent disabled={loading} fullWidth type="submit">
            {varient === "Register" ? "Register" : "Sign in"}
          </ButtonComponent>
        </div>
      </form>
      <div className="mt-0">
        <div className="relative">
          {/* border */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white text-gray-500 px-2">
              Or continue with
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6 flex gap-2">
        <AuthSocialButton
          icon={BsGithub}
          onClick={() => socialAction("github")}
        />
        <AuthSocialButton
          icon={BsGoogle}
          onClick={() => socialAction("google")}
        />
      </div>
      <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
        <div>
          {varient === "Login"
            ? "New to Messenger?"
            : "Already have an account?"}
        </div>
        <div onClick={toggleVarient} className="underline cursor-pointer">
          {varient === "Login" ? "Create an account" : "Login"}
        </div>
      </div>
    </div>
  );
}
