import { Link } from "react-router-dom";
import { setEnrollments } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as dashboardClient from "./client"

export default function Dashboard(
    { courses, course, setCourse, addNewCourse, deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment, setUpdatingCourse }: {
        courses: any[];
        course: any;
        setCourse: (course: any) => void;
        addNewCourse: () => void;
        deleteCourse: (course: any) => void;
        updateCourse: () => void;
        enrolling: boolean;
        setEnrolling: (enrolling: boolean) => void;
        updateEnrollment: (courseId: string, enrolled: boolean) => void
        setUpdatingCourse: (updating: boolean) => void;
    }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

    const [coursesToShow, setCoursesToShow]: any = useState([])
    const [showAllCourses, setShowAllCourses] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMyEnrollments = async () => {
            dispatch(setEnrollments(await dashboardClient.fetchMyEnrollments(currentUser._id)));
        };
        fetchMyEnrollments();
    }, []);
    useEffect(() => {
        setCoursesToShow(showAllCourses ? courses : courses.filter(course => {
            console.log(enrollments)
            if (enrollments.find((enrollment: any) => enrollment.course === course._id)) {
                return course;
            }
        }))
    }, [courses, enrollments, showAllCourses]);

    function truncateText(text: string, maxLength: number) {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }

        return text;
    }

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">
                Dashboard
                <button onClick={() => { setEnrolling(!enrolling); setShowAllCourses(!showAllCourses); }} className="float-end btn btn-primary" >
                    {enrolling ? "My Courses" : "All Courses"}
                </button>
            </h1 >
            <hr />
            <h2 id="wd-dashboard-published">
                {showAllCourses ? "Published Courses" : "Enrolled Courses"} ({showAllCourses ? courses.length : enrollments.length})
            </h2>
            <hr />
            {(currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN') && (
                <>
                    <div className="d-flex justify-content-between ">
                        <h3 className="m-0">
                            New Course
                        </h3>
                        <div>
                            <button
                                className="btn btn-warning me-2"
                                onClick={updateCourse} id="wd-update-course-click">
                                Update
                            </button>
                            <button
                                id="wd-add-new-course-click"
                                className="btn btn-primary float-end"
                                onClick={async (event) => {
                                    event.preventDefault();

                                    addNewCourse();
                                }}>
                                Add
                            </button>
                        </div>
                    </div>
                    <br />
                    <input
                        id="wd-course-name"
                        className="form-control mb-2"
                        value={course.name}
                        onChange={(event) => setCourse({ ...course, name: event.target.value })} />
                    <textarea
                        id="wd-course-description"
                        className="form-control"
                        value={course.description}
                        onChange={(event) => setCourse({ ...course, description: event.target.value })} />
                    <hr />
                </>)
            }
            <div id="wd-dashboard-courses" className="row g-4">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {coursesToShow.map((course: any) => {
                        return (
                            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                                <div className="card rounded-3 overflow-hidden shadow" style={{ height: "100%", display: 'flex', flexDirection: 'column' }}>
                                    <Link className="wd-dashboard-course-link" to={course.enrolled || !enrolling ? `/Kanbas/Courses/${course._id}/Home` : `/Kanbas/Dashboard`} style={{ flex: '1', textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                        <img
                                            style={{ height: '160px', objectFit: 'cover', textDecoration: "none", color: "navy", fontWeight: "bold" }}
                                            width="100%"
                                            alt={course.name}
                                            src='https://d15gkqt2d16c1n.cloudfront.net/images/universities/logos/Northeastern_University,_Portland_Logo'
                                        />
                                        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                            <h5 className="wd-dashboard-course-title card-title" style={{ color: 'darkblue' }}>
                                                {truncateText(course.name, 22)}
                                            </h5>
                                            <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ flexGrow: 1, color: 'gray', fontSize: '0.85rem', marginTop: '-0.5rem', maxHeight: 100 }}>
                                                {course.description}
                                            </p>
                                            <br />
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <button className="btn btn-primary">
                                                    Go
                                                </button>
                                                {enrolling && (
                                                    <button onClick={(event) => {
                                                        event.preventDefault();
                                                        const enrolled = !course.enrolled;

                                                        updateEnrollment(course._id, enrolled);
                                                    }}
                                                        className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`} >
                                                        {course.enrolled ? "Unenroll" : "Enroll"}
                                                    </button>
                                                )}
                                                {(currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN') && (
                                                    <>
                                                        <button id="wd-edit-course-click"
                                                            onClick={(event) => {
                                                                event.preventDefault();

                                                                setCourse(course);
                                                                setUpdatingCourse(true);
                                                            }}
                                                            className="btn btn-warning me-0" style={{ marginLeft: 'auto' }} >
                                                            Edit
                                                        </button>
                                                        <button onClick={async (event) => {
                                                            event.preventDefault();

                                                            deleteCourse(course._id);
                                                        }} className="btn btn-danger" id="wd-delete-course-click">
                                                            Delete
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div >
        </div >
    );
}
