import { Link, useLocation } from "react-router-dom";

export default function AccountNavigation() {
    const location = useLocation()

    const isActive = (path: string) => {
        return location.pathname.includes(path)
    }

    return (
        <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
            <Link to={`/Kanbas/Account/Signin`}
                className={`list-group-item border border-0 ${isActive('/Signin') ? 'active' : 'text-danger'}`}>
                Sign in
            </Link>
            <Link to={`/Kanbas/Account/Signup`}
                className={`list-group-item border border-0 ${isActive('/Signup') ? 'active' : 'text-danger'}`}>
                Sign up
            </Link>
            <Link to={`/Kanbas/Account/Profile`}
                className={`list-group-item border border-0 ${isActive('/Profile') ? 'active' : 'text-danger'}`}>
                Profile</Link>
            <br />
        </div>
    );
}
