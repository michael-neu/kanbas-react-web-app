import { Link, useLocation, useParams } from "react-router-dom";

export default function CoursesNavigation() {
    const { cid } = useParams();
    const location = useLocation();
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

    const isActive = (path: string) => location.pathname.includes(path);

    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link
                    key={link}
                    id={`wd-course-${link.toLowerCase()}-link`}
                    to={`/Kanbas/Courses/${cid}/${link}`}
                    className={`list-group-item border border-0 ${isActive(`/${link}`) ? 'active' : 'text-danger'}`}
                >
                    {link}
                </Link>
            ))}
            <br />
        </div>
    );
}