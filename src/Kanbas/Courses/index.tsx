import { Navigate, Route, Routes, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { FaAlignJustify, FaAngleRight } from "react-icons/fa6";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import CoursesNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import PeopleTable from "./People/Table";

export default function Courses() {
    const location = useLocation()

    const [courseTitle, setCourseTitle] = useState(
        <span>Course CS1234</span>)

    useEffect(() => {
        const course = location.pathname.split("/")

        const breadcrumbs = [];
        for (let i = 3; i < course.length; i++) {
            const isLast = i === course.length - 1

            breadcrumbs.push(<span
                id={`wd-crumb-${i}`}
                className={`${isLast ? 'text-black' : 'text-danger'}`}
                style={{ fontSize: '1.6rem' }}
            > {course[i]} </span>);

            if (!isLast) {
                breadcrumbs.push(<FaAngleRight id={`wd-angle-right-${i}`} className="fs-5" style={{ color: 'grey' }} />);
            }
        }
        setCourseTitle(
            <span>{breadcrumbs}</span>
        );
    }, [location])

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {courseTitle}
            </h2>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CoursesNavigation />
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="People" element={<PeopleTable />} />
                    </Routes>
                </div>
            </div>
        </div >
    );
}
