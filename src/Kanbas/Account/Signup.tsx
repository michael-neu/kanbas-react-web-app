import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Signup() {
    const [user, setUser] = useState<any>({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signup = async () => {
        const currentUser = await client.signup(user);

        dispatch(setCurrentUser(currentUser));
        navigate("/Kanbas/Account/Profile");
    };

    return (
        <div id="wd-signup-screen">
            <h3>Sign up</h3>
            <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="wd-username form-control mb-2" placeholder="username" />
            <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password"
                className="wd-password form-control mb-2" placeholder="password" />
            <Link onClick={signup} id="wd-signin-btn" to="/Kanbas/Account/Profile" className="btn btn-primary w-100">
                Sign up
            </Link>
            <Link id="wd-signup-link" to="/Kanbas/Account/Signin">
                Sign in
            </Link>
        </div>
    );
}
