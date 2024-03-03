import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({ children, authentication = true }) {
	const navigate = useNavigate();
	const [loader, setLoader] = useState(true);
	const authStatus = useSelector((state) => state.auth.status);

	//Here, authStatus is the actual auth state of the user
	//authentication flag is the protection flag for the children component
	//i.e. whether they should be rendered only when the user is authenticated or not
	//if authStatus and authentication both are true then render the children
	//else redirect to the login page or show unauthorized error page

	useEffect(() => {
		if (!authStatus && authentication) navigate("/login");
		else if (!authentication && authStatus) navigate("/");
		setLoader(false);
	}, [authStatus, navigate, authentication]);

	return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default Protected;
