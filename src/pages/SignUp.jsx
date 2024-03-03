import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/features/authSlice";
import { Button, Input, Logo } from "../components";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function SignUp() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();
	const [error, setError] = useState("");

	const handleSignUp = async (data) => {
		setError("");
		try {
			const session = await authService.createAccount(data);
			if (session) {
				const userData = await authService.getCurrentUser();
				if (userData) dispatch(login(userData));
				navigate("/");
			}
		} catch (error) {
			console.log(error);
			setError(error.message);
		}
	};

	return (
		<div className="flex items-center justify-center w-full">
			<div
				className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
			>
				<div className="mb-2 flex justify-center">
					<span className="inline-block w-full max-w-[100px]">
						<Logo width="100%" />
					</span>
				</div>
				<h2 className="text-center text-2xl font-bold leading-tight">
					Create your account
				</h2>
				<p className="mt-2 text-center text-base text-black/60">
					Already have an account?&nbsp;
					<Link
						to="/signin"
						className="font-medium text-primary transition-all duration-200 hover:underline"
					>
						Sign In
					</Link>
				</p>
				{error && <p className="text-red-600 mt-8 text-center">{error}</p>}
				<form onSubmit={handleSubmit(handleSignUp)} className="mt-8">
					<div className="space-y-5">
						<Input
							label="Name"
							placeholder="Enter your name"
							type="text"
							{...register("name", {
								required: true,
							})}
						/>
						<Input
							label="Email"
							placeholder="Enter your email"
							type="email"
							{...register("email", {
								required: true,
								validate: {
									matchPatern: (value) =>
										/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
										"Email address must be a valid address",
								},
							})}
						/>
						<Input
							label="Password"
							placeholder="Enter your password"
							type="password"
							{...register("password", {
								required: true,
							})}
						/>
						<Button type="submit" className="w-full">
							Sign up
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
