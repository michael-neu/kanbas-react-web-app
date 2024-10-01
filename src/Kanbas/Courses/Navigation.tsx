import { Link, useLocation } from "react-router-dom";

export default function CoursesNavigation() {
    const location = useLocation()

    const isActive = (path: string) => {
        return location.pathname.includes(path)
    }

    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            <Link
                id="wd-course-home-link"
                to="/Kanbas/Courses/CS1234/Home"
                className={`list-group-item border border-0 ${isActive('/Home') ? 'active' : 'text-danger'}`}
            >
                Home
            </Link>
            <Link
                id="wd-course-modules-link"
                to="/Kanbas/Courses/CS1234/Modules"
                className={`list-group-item border border-0 ${isActive('/Modules') ? 'active' : 'text-danger'}`}
            >
                Modules
            </Link>
            <Link
                id="wd-course-piazza-link"
                to="/Kanbas/Courses/CS1234/Piazza"
                className={`list-group-item border border-0 ${isActive('/Piazza') ? 'active' : 'text-danger'}`}
            >
                Piazza
            </Link>
            <Link
                id="wd-course-zoom-link"
                to="/Kanbas/Courses/CS1234/Zoom"
                className={`list-group-item border border-0 ${isActive('/Zoom') ? 'active' : 'text-danger'}`}
            >
                Zoom
            </Link>
            <Link
                id="wd-course-assignments-link"
                to="/Kanbas/Courses/CS1234/Assignments"
                className={`list-group-item border border-0 ${isActive('/Assignments') ? 'active' : 'text-danger'}`}
            >
                Assignments
            </Link>
            <Link
                id="wd-course-quizzes-link"
                to="/Kanbas/Courses/CS1234/Quizzes"
                className={`list-group-item border border-0 ${isActive('/Quizzes') ? 'active' : 'text-danger'}`}
            >
                Quizzes
            </Link>
            <Link
                id="wd-course-grades-link"
                to="/Kanbas/Courses/CS1234/Grades"
                className={`list-group-item border border-0 ${isActive('/Grades') ? 'active' : 'text-danger'}`}
            >
                Grades
            </Link>
            <Link
                id="wd-course-people-link"
                to="/Kanbas/Courses/CS1234/People"
                className={`list-group-item border border-0 ${isActive('/People') ? 'active' : 'text-danger'}`}
            >
                People
            </Link>
            <br />
        </div>
    );
}
