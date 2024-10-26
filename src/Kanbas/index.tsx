import "./styles.css";
import { Provider } from "react-redux";
import { Routes, Route, Navigate } from "react-router";
import { useState } from "react";
import Account from "./Account";
import Courses from "./Courses";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import ProtectedRoute from "./Account/ProtectedRoute";
import store from "./store";
import * as db from "./Database";

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

    const [courses, setCourses] = useState<any[]>(db.courses);
    const [course, setCourse] = useState<any>({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2024-09-10",
        endDate: "2024-12-15",
        description: "New Description",
        imageurl: "https://logos-world.net/wp-content/uploads/2023/08/React-Logo.png",
    });

    const addNewCourse = () => {
        const newCourse = {
            ...course,
            _id: new Date().getTime().toString(),
        };
        setCourses([...courses, { ...course, ...newCourse }]);
        setCourse(defaultCourse)
    };

    const deleteCourse = (courseId: string) => {
        setCourses(courses.filter((course) => course._id !== courseId));
    };

    const updateCourse = () => {
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
        </Provider >
    );
}
