import "./styles.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router";
import { fetchMyEnrollments, removeCourseEnrollments } from "./Dashboard/client";
import { useEffect, useState } from "react";
import { addEnrollment, removeEnrollment } from "./Dashboard/reducer";
import Account from "./Account";
import Courses from "./Courses";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import store from "./store";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";

export default function Kanbas() {
    const defaultCourse = {
        name: "New Course",
        number: "New Number",
        startDate: "2024-09-10",
        endDate: "2024-12-15",
        department: "New Department",
        description: "New Description",
        imageurl: "https://logos-world.net/wp-content/uploads/2023/08/React-Logo.png",
        credits: 4,
    }

    const [courses, setCourses] = useState<any[]>([]);
    const [enrolling, setEnrolling] = useState<boolean>(false);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const dispatch = useDispatch();

    const addNewCourse = async () => {
        const newCourse = await courseClient.createCourse(course);

        dispatch(addEnrollment({ courseId: newCourse._id, userId: currentUser._id }));
        setCourses([...courses, { ...course, ...newCourse }]);
        setCourse(defaultCourse);
    };

    useEffect(() => {
        if (enrolling) {
            fetchCourses();
        } else {
            findCoursesForUser();
        }
    }, [currentUser, enrolling]);
    const findCoursesForUser = async () => {
        try {
            const courses = await userClient.findCoursesForUser(currentUser._id);

            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };
    const updateEnrollment = async (courseId: string, enrolled: boolean) => {
        if (enrolled) {
            dispatch(addEnrollment({ courseId: courseId, userId: currentUser._id }));
            await userClient.enrollIntoCourse(currentUser._id, courseId);
        } else {
            dispatch(removeEnrollment({ courseId: courseId, userId: currentUser._id }));
            await userClient.unenrollFromCourse(currentUser._id, courseId);
        }
        setCourses(
            courses.map((course) => {
                if (course._id === courseId) {
                    return { ...course, enrolled: enrolled };
                } else {
                    return course;
                }
            })
        );
    };
    const fetchCourses = async () => {
        try {
            const allCourses = await courseClient.fetchAllCourses();
            const enrolledCourses = await fetchMyEnrollments(currentUser._id);
            const courses = allCourses.map((course: any) => {
                if (enrolledCourses.find((c: any) => c.course === course._id)) {
                    return { ...course, enrolled: true };
                } else {
                    return { ...course, enrolled: false };
                }
            });

            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };

    const [course, setCourse] = useState<any>({
        name: "New Course",
        number: "New Number",
        startDate: "2024-09-10",
        endDate: "2024-12-15",
        department: "New Department",
        description: "New Description",
        credits: 4,
    });
    const [editing, setEditing] = useState<boolean>(false);

    const setUpdatingCourse = (updating: boolean) => {
        setEditing(updating);
    }

    const deleteCourse = async (courseId: string) => {
        dispatch(removeEnrollment({ courseId: courseId, userId: currentUser._id }))

        await removeCourseEnrollments(courseId);
        await courseClient.deleteCourse(courseId);

        setCourses(courses.filter((course) => course._id !== courseId));
    };

    const updateCourse = async () => {
        if (!editing) {
            return;
        }
        setEditing(false);

        await courseClient.updateCourse(course);

        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                } else {
                    return c;
                }
            })
        );
        setCourse(defaultCourse)
    };

    return (
        <Provider store={store}>
            <Session>
                <div id="wd-kanbas">
                    <KanbasNavigation />
                    <div className="wd-main-content-offset p-3">
                        <Routes>
                            <Route path="/" element={<Navigate to="/Kanbas/Dashboard" />} />
                            <Route path="/Account/*" element={<Account />} />
                            <Route path="/Dashboard" element={<ProtectedRoute>
                                <Dashboard
                                    courses={courses}
                                    course={course}
                                    setCourse={setCourse}
                                    addNewCourse={addNewCourse}
                                    deleteCourse={deleteCourse}
                                    updateCourse={updateCourse}
                                    enrolling={enrolling}
                                    setEnrolling={setEnrolling}
                                    updateEnrollment={updateEnrollment}
                                    setUpdatingCourse={setUpdatingCourse}
                                />
                            </ProtectedRoute>
                            } />
                            <Route path="/Courses/:cid/*" element={<ProtectedRoute>
                                <Courses courses={courses} />
                            </ProtectedRoute>
                            } />
                            <Route path="/Calendar" element={<h1>Calendar</h1>} />
                            <Route path="/Inbox" element={<h1>Inbox</h1>} />
                        </Routes>
                    </div>
                </div>
            </Session>
        </Provider>
    );
}
