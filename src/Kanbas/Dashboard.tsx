import { Link } from "react-router-dom";

export default function Dashboard() {
    const courses = [
        {
            id: "CS1234",
            title: "CS1234 React JS",
            description: "CS1234 Fall 2024 Full Term.",
            image: "/images/CS1234.jpg",
        },
        {
            id: "CS5010",
            title: "CS5010 Programming Design Paradigm",
            description: "CS5010 Fall 2024 Full Term.",
            image: "/images/CS5010.png",
        },
        {
            id: "CS5400",
            title: "CS5400 Principles of Programming Language",
            description: "CS5400 Fall 2024 Full Term.",
            image: "/images/CS5400.png",
        },
        {
            id: "CS5500",
            title: "CS5500 Foundations of Software Engineering",
            description: "CS5500 Fall 2024 Full Term.",
            image: "/images/CS5500.png",
        },
        {
            id: "CS5610",
            title: "CS5610 Web Development",
            description: "CS5610 Fall 2024 Full Term.",
            image: "/images/CS5610.png",
        },
        {
            id: "CS5800",
            title: "CS5800 Algorithms",
            description: "CS5800 Fall 2024 Full Term.",
            image: "/images/CS5800.jpg",
        },
        {
            id: "CS6410",
            title: "CS6410 Compilers",
            description: "CS6410 Fall 2024 Full Term.",
            image: "/images/CS6410.jpg",
        },
    ];

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
                        <div key={course.id} className="wd-dashboard-course" style={{ width: "300px" }}>
                            <div className="card rounded-3 overflow-hidden shadow" style={{ height: "100%", display: 'flex', flexDirection: 'column' }}>
                                <Link className="wd-dashboard-course-link text-decoration-none text-dark" to={`/Kanbas/Courses/${course.id}/Home`} style={{ flex: '1' }}>
                                    <img
                                        src={course.image}
                                        className="card-img-top"
                                        style={{ height: '200px', objectFit: 'cover' }}
                                        width="100%"
                                        alt={course.title}
                                    />
                                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                        <h5 className="wd-dashboard-course-title card-title" style={{ color: 'darkblue' }}>
                                            {truncateText(course.title, 20)}
                                        </h5>
                                        <p className="card-text" style={{ flexGrow: 1, color: 'gray', fontSize: '0.85rem', marginTop: '-0.5rem' }}>
                                            {course.description}
                                        </p>
                                        <br />
                                        <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Go</button>
                                    </div>
                                    <div className="position-absolute" style={{ top: '10px', right: '20px', display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '12px', color: 'white', marginBottom: '-6px' }}>●</span>
                                        <span style={{ fontSize: '12px', color: 'white', marginBottom: '-6px' }}>●</span>
                                        <span style={{ fontSize: '12px', color: 'white', marginBottom: '-6px' }}>●</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
