import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import { FaAlignJustify } from "react-icons/fa6";
import { upsertAssignment } from "./Assignments/reducer";
import { useDispatch } from "react-redux";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import CoursesNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import PeopleTable from "./People/Table";
import * as assignmentsClient from "../Courses/Assignments/client"

export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const course = courses.find((course) => course._id === cid);
    const dispatch = useDispatch();

    const handleUpsertAssignment = async (assignment: any) => {
        await assignmentsClient.upsertAssignment(assignment)
        dispatch(upsertAssignment(assignment));
    };

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]}
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
                        <Route path="Assignments/:aid" element={<AssignmentEditor
                            upsertAssignment={handleUpsertAssignment}
                        />}
                        />
                        <Route path="People" element={<PeopleTable />} />
                    </Routes>
                </div>
            </div>
        </div >
    );
}
