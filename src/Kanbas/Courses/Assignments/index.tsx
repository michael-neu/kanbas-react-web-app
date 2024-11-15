import { AssignmentsControlButtons } from "./AssignmentsControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { deleteAssignment, setAssignments } from "./reducer";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AssignmentControl from "./AssignmentControl";
import AssignmentIcons from "./AssignmentIcons"
import * as assignmentsClient from "./client"

interface Assignment {
    _id: string;
    title: string;
    availabilityDate: string;
    dueDate: string;
    points: number;
    link: string;
}

const AssignmentItem: React.FC<Assignment> = ({ _id, title, availabilityDate, dueDate, points, link }) => {
    const dispatch = useDispatch();

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleDateString('en-US', options);
    }

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
                                    | <strong style={{ marginLeft: '10px' }}>Not available until</strong> {formatDate(availabilityDate)}
                                </div>
                                <div style={{ marginLeft: '10px' }}>
                                    |
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div>
                                    <strong>Due</strong> {formatDate(dueDate)}
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
                        <AssignmentIcons onDelete={async () => {
                            await assignmentsClient.deleteAssignment(_id);
                            dispatch(deleteAssignment(_id))
                        }} />
                    </div>
                </div>
            </a>
        </li>
    );
};

export default function Assignments() {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);

    const dispatch = useDispatch();
    const fetchAssignments = async () => {
        dispatch(setAssignments(await assignmentsClient.fetchAssignmentsForCourse(cid as string)));
    };
    useEffect(() => {
        fetchAssignments();
    }, []);

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
                    {assignments.map((assignment: any) => (
                        currentUser.role === 'FACULTY' ?
                            <AssignmentItem _id={assignment._id} title={assignment.title} availabilityDate={assignment.availabilityDate} dueDate={assignment.dueDate} points={assignment.points} link={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`} />
                            :
                            <AssignmentItem _id={assignment._id} title={assignment.title} availabilityDate={assignment.availabilityDate} dueDate={assignment.dueDate} points={assignment.points} link={`#/Kanbas/Courses/${cid}/Assignments`} />
                    ))}
                </li>
            </ul>
        </div>
    );
}
