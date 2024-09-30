import { BsGripVertical } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { AssignmentsControlButtons } from "./AssignmentsControlButtons";
import AssignmentControl from "./AssignmentControl";
import AssignmentIcons from "./AssignmentIcons"

interface Assignment {
    title: string;
    availabilityDate: string;
    dueDate: string;
    points: number;
    link: string;
}

const assignments: Assignment[] = [
    { title: 'A1', availabilityDate: 'May 6 at 12:00am', dueDate: 'May 13 at 11:59pm', points: 100, link: "#/Kanbas/Courses/CS1234/Assignments/A1" },
    { title: 'A2', availabilityDate: 'May 13 at 12:00am', dueDate: 'May 20 at 11:59pm', points: 100, link: "#/Kanbas/Courses/CS1234/Assignments/A2" },
    { title: 'A3', availabilityDate: 'May 20 at 12:00am', dueDate: 'May 27 at 11:59pm', points: 100, link: "#/Kanbas/Courses/CS1234/Assignments/A3" },
];

const AssignmentItem: React.FC<Assignment> = ({ title, availabilityDate, dueDate, points, link }) => {
    return (
        <li className="wd-lesson list-group-item p-3 ps-1" style={{ borderLeft: '4px solid green' }}>
            <a
                className="d-flex align-items-center flex-grow-1 text-decoration-none"
                href={link}
                style={{ color: 'inherit' }}
            >
                <div className="d-flex align-items-center flex-grow-1">
                    <BsGripVertical className="me-2 fs-3" />
                    <BsPencilSquare className="me-3" />
                    <span className="d-inline-block">
                        <b>{title}</b>
                        <div style={{ marginLeft: '0', fontSize: '0.8em' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ color: 'red' }}>
                                    <strong>Multiple Modules</strong>
                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                    | <strong>Not available until</strong> {availabilityDate}
                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                    |
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div>
                                    <strong>Due</strong> {dueDate}
                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                    |
                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                    {points} pts
                                </div>
                            </div>
                        </div>
                    </span>
                    <div style={{ marginLeft: "auto" }}>
                        <AssignmentIcons />
                    </div>
                </div>
            </a>
        </li>
    );
};

export default function Assignments() {
    return (
        <div id="wd-assignments">
            <AssignmentControl />
            <br />
            <br />
            <ul id="wd-modules" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary" style={{ display: "flex" }}>
                        <BsGripVertical className="me-2 fs-3" />
                        <FaCaretDown className="me-1 fs-3" />
                        ASSIGNMENTS
                        <AssignmentsControlButtons />
                    </div>
                    {assignments.map((assignment, index) => (
                        <AssignmentItem key={index} {...assignment} />
                    ))}
                </li>
            </ul>
        </div>
    );
}
