import { Link } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
import { retrieveAssignment } from "./client";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function AssignmentEditor({ upsertAssignment }: { upsertAssignment: (assignment: any) => void; }) {
    const { cid, aid } = useParams();

    const [assignment, setAssignment] = useState<any>(undefined);
    const fetchAssignment = async () => {
        const fetchedAssignment = await retrieveAssignment(aid as string);
        setAssignment(fetchedAssignment);
    };
    useEffect(() => {
        fetchAssignment();
    }, []);

    if (assignment === undefined) {
        return (
            <div id="wd-assignments-editor-loading">
                Fetching assignment...
            </div>
        )
    }

    return (
        <div id="wd-assignments-editor">
            <div className="container">
                <div className="row mb-4">
                    <div className="col-13">
                        <label className="form-label">{assignment.title}</label>
                        <input id="wd-name" className="form-control" defaultValue={assignment.title}
                            onChange={(event) => {
                                setAssignment((previousAssignment: any) => ({
                                    ...previousAssignment,
                                    title: event.target.value
                                }))
                            }} />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-12">
                        <textarea id="wd-description" className="form-control" defaultValue={assignment.description} style={{ whiteSpace: 'pre-line' }}
                            rows={12} cols={60} onChange={(event) => {
                                setAssignment((previousAssignment: any) => ({
                                    ...previousAssignment,
                                    description: event.target.value
                                }))
                            }}>
                        </textarea>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-3">
                        <label htmlFor="wd-points" className="col-form-label float-end">Points</label>
                    </div>
                    <div className="col">
                        <input id="wd-points" type="number" className="form-control" defaultValue={assignment.points}
                            onChange={(event) => {
                                setAssignment((previousAssignment: any) => ({
                                    ...previousAssignment,
                                    points: event.target.value
                                }))
                            }} />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-3">
                        <label htmlFor="wd-group" className="col-form-label float-end">Assignment Group</label>
                    </div>
                    <div className="col">
                        <select id="wd-group" className="form-select">
                            <option defaultValue="assignments" selected>
                                ASSIGNMENTS
                            </option>
                            <option value="quizzes">
                                QUIZZES
                            </option>
                            <option value="exams">
                                EXAMS
                            </option>
                            <option value="project">
                                PROJECT
                            </option>
                        </select>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-3">
                        <label htmlFor="wd-display-grade-as" className="col-form-label float-end">
                            Display Grade as
                        </label>
                    </div>
                    <div className="col">
                        <select id="wd-display-grade-as" className="form-select">
                            <option value="">
                                Percentage
                            </option>
                        </select>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-3">
                        <label htmlFor="wd-submission-type" className="col-form-label float-end">
                            Submission Type
                        </label>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <div className="row ms-1">
                                    <select id="wd-submission-type" style={{ width: '98%' }} className="form-select">
                                        <option selected value="online">
                                            Online
                                        </option>
                                    </select>
                                </div>
                                <div className="row mt-4">
                                    <label>
                                        <b>Online Entry Options: </b>
                                    </label>
                                </div>
                                <div className="row my-2 ms-1">
                                    <div className="form-check my-2 ">
                                        <input type="checkbox" name="text-entry" id="wd-text-entry"
                                            className="form-check-input" />
                                        <label htmlFor="wd-text-entry" className="form-check-label">
                                            Text Entry
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input type="checkbox" name="website-url" id="wd-website-url"
                                            className="form-check-input" checked />
                                        <label htmlFor="wd-website-url" className="form-check-label">
                                            Website URL
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input type="checkbox" name="media-recordings" id="wd-media-recordings"
                                            className="form-check-input" />
                                        <label htmlFor="wd-media-recordings" className="form-check-label">
                                            Media Recordings
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input type="checkbox" name="student-annotation" id="wd-student-annotation"
                                            className="form-check-input" />
                                        <label htmlFor="wd-student-annotation" className="form-check-label">
                                            Student Annotation
                                        </label>
                                    </div>
                                    <div className="form-check my-2">
                                        <input type="checkbox" name="file-upload" id="wd-file-upload"
                                            className="form-check-input" />
                                        <label htmlFor="wd-file-upload" className="form-check-label">
                                            File Uploads
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-3">
                        <label htmlFor="wd-assign" className="col-form-label float-end">
                            Assign
                        </label>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <label htmlFor="wd-assign-to" className="form-label">
                                        <b>Assign to</b>
                                    </label>
                                    <div className="input-group">
                                        <button className="btn btn-light">
                                            Everyone<FaXmark style={{ marginTop: '-2px', marginLeft: '10px' }}></FaXmark>
                                        </button>
                                        <input id="wd-assign-to" type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <label htmlFor="wd-due-date">
                                            <b>Due</b>
                                        </label>
                                        <input id="wd-due-date" type="date" className="form-control" defaultValue={assignment.dueDate}
                                            onChange={(event) => {
                                                setAssignment((previousAssignment: any) => ({
                                                    ...previousAssignment,
                                                    dueDate: event.target.value
                                                }))
                                            }} />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <label htmlFor="wd-available-from">
                                            <b>Available from</b>
                                        </label>
                                        <input id="wd-available-from" type="date" className="form-control" defaultValue={assignment.availabilityDate}
                                            onChange={(event) => {
                                                setAssignment((previousAssignment: any) => ({
                                                    ...previousAssignment,
                                                    availabilityDate: event.target.value
                                                }))
                                            }} />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="wd-available-until">
                                            <b>Until</b>
                                        </label>
                                        <input id="wd-available-until" type="date" className="form-control" defaultValue={assignment.dueDate}
                                            onChange={(event) => {
                                                setAssignment((previousAssignment: any) => ({
                                                    ...previousAssignment,
                                                    dueDate: event.target.value
                                                }))
                                            }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <hr />
                </div>
                <div className="mb-2">
                    <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-danger float-end ms-2"
                        onClick={() => {
                            upsertAssignment(assignment)
                        }}>
                        Save
                    </Link>
                    <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary float-end">
                        Cancel
                    </Link>
                </div>
            </div>
        </div >
    )
}
