import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
    const location = useLocation();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const links = currentUser ? [{ name: "Profile", path: "/Kanbas/Account/Profile" }]
        : [
            { name: "Sign in", path: "/Kanbas/Account/Signin" },
            { name: "Sign up", path: "/Kanbas/Account/Signup" }
        ];

    const isActive = (path: string) => location.pathname.includes(path);

    return (
        <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
            {links.map(link => (
                <Link
                    key={link.path}
                    to={link.path}
                    className={`list-group-item border border-0 ${isActive(link.path) ? 'active' : 'text-danger'}`}>
                    {link.name}
                </Link>
            ))}
            <br />
        </div>
    );
}
