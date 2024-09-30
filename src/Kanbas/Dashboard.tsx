export default function Dashboard() {
    const courses = [
        {
            id: "1234",
            title: "CS1234 React JS",
            description: "Full Stack software developer",
            image: "/images/CS1234.jpg",
        },
        {
            id: "CS5010",
            title: "CS5010 Programming Design Paradigm",
            description: "Introduces modern program design paradigms. Starts with functional program design, introducing the notion of a design recipe",
            image: "/images/CS5010.png",
        },
        {
            id: "5400",
            title: "CS5400 Principles of Programming Language",
            description: "Studies the basic components of programming languages, specification of syntax and semantics, and description and implementation of programming language features",
            image: "/images/CS5400.png",
        },
        {
            id: "5500",
            title: "CS5500 Foundations of Software Engineering",
            description: "Covers the foundations of software engineering, including software development life cycle models",
            image: "/images/CS5500.png",
        },
        {
            id: "5610",
            title: "CS5610 Web Development",
            description: "Discusses Web development for sites that are dynamic, data driven, and interactive",
            image: "/images/CS5610.png",
        },
        {
            id: "5800",
            title: "CS5800 Algorithms",
            description: "Presents the mathematical techniques used for the design and analysis of computer algorithms",
            image: "/images/CS5800.jpg",
        },
        {
            id: "6410",
            title: "CS6410 Compilers",
            description: "Expects each student to write a small compiler",
            image: "/images/CS6410.jpg",
        },
    ];

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr />
            <div id="wd-dashboard-courses">
                {courses.map((course) => (
                    <div>
                        <img src={course.image} width={200} alt={course.title} />
                        <div>
                            <a className="wd-dashboard-course-link" href={`#/Kanbas/Courses/1234/Home`}>{course.title}</a>
                            <p className="wd-dashboard-course-title">
                                {course.description}
                            </p>
                            <a href={`#/Kanbas/Courses/1234/Home`}>Go</a>
                        </div>
                        <br />
                    </div>
                ))}
            </div>
        </div>
    );
}
