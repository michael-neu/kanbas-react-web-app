import "./styles.css";
import { Provider, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router";
import { useEffect, useState } from "react";
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
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2024-09-10",
        endDate: "2024-12-15",
        description: "New Description",
        imageurl: "https://logos-world.net/wp-content/uploads/2023/08/React-Logo.png",
    }

    const [courses, setCourses] = useState<any[]>([]);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const addNewCourse = async (courseId: string) => {
        const newCourse = course
        newCourse._id = courseId

        await userClient.createCourse(newCourse);

        setCourses([...courses, { ...course, ...newCourse }]);
        setCourse(defaultCourse)
    };

    const findAllCourses = async () => {
        let courses = [];
        try {
            courses = await courseClient.fetchAllCourses();
        } catch (error) {
            console.error(error);
        }
        setCourses(courses);
    };
    useEffect(() => {
        findAllCourses();
    }, [currentUser]);

    const [course, setCourse] = useState<any>({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2024-09-10",
        endDate: "2024-12-15",
        description: "New Description",
        imageurl: "https://logos-world.net/wp-content/uploads/2023/08/React-Logo.png",
    });

    const deleteCourse = async (courseId: string) => {
        await courseClient.deleteCourse(courseId);

        setCourses(courses.filter((course) => course._id !== courseId));
    };

    const updateCourse = async () => {
        if (course._id === "0") {
            // None selected
            return;
        }

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
