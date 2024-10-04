import { Link } from "react-router-dom";
import * as db from "../Database";

export default function Dashboard() {
    const courses = db.courses;

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
            </h1>
            <hr />
            <h2 id="wd-dashboard-published">
                Published Courses ({courses.length})
            </h2>
            <hr />
            <div id="wd-dashboard-courses" className="row g-4">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course) => (
                        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                            <div className="card rounded-3 overflow-hidden shadow" style={{ height: "100%", display: 'flex', flexDirection: 'column' }}>
                                <Link className="wd-dashboard-course-link" to={`/Kanbas/Courses/${course._id}/Home`} style={{ flex: '1', textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                    <img
                                        style={{ height: '160px', objectFit: 'cover', textDecoration: "none", color: "navy", fontWeight: "bold" }}
                                        width="100%"
                                        alt={course.name}
                                        src={course.imageurl}
                                    />
                                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                        <h5 className="wd-dashboard-course-title card-title" style={{ color: 'darkblue' }}>
                                            {truncateText(course.name, 22)}
                                        </h5>
                                        <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ flexGrow: 1, color: 'gray', fontSize: '0.85rem', marginTop: '-0.5rem', maxHeight: 100 }}>
                                            {course.description}
                                        </p>
                                        <br />
                                        <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Go</Link>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </div >
    );
}
