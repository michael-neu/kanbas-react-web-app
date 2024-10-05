import { FaXmark } from "react-icons/fa6";
import { useParams } from "react-router";
import { assignments } from "../../Database";
import { Link } from "react-router-dom";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();

    const assignmentArray = assignments.filter((assignment) => assignment.course === cid);
    const assignment = assignmentArray.find((assignment) => assignment._id === aid);
    if (!assignment) {
        return (
            <div id="wd-assignments-editor">
                <div className="container">
                    <h1>
                        The specified assignment does not exist.
                    </h1>
                </div>
            </div>
        )
    }

    return (
        <div id="wd-assignments-editor">
            <div className="container">
                <div className="row mb-4">
                    <div className="col-13">
                        <label className="form-label">Assignment Name</label>
                        <input id="wd-name" className="form-control" value={assignment._id} />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-12">
                        <textarea id="wd-description" className="form-control" style={{ whiteSpace: 'pre-line' }} rows={12} cols={60}>
                            {`The assignment is available online.

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:

 •  Your full name and section.
 •  Links to each of the lab assignments.
 •  Link to the Kanbas application.
 •  Links to all relevant source code repositories.

The Kanbas application should include a link to navigate back to the landing page.`}
                        </textarea>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-3">
                        <label htmlFor="wd-points" className="col-form-label float-end">Points</label>
                    </div>
                    <div className="col">
                        <input id="wd-points" type="number" className="form-control" value={assignment.points} />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-3">
                        <label htmlFor="wd-group" className="col-form-label float-end">Assignment Group</label>
                    </div>
                    <div className="col">
                        <select id="wd-group" className="form-select">
                            <option selected value="assignments">
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
                                        <input id="wd-due-date" type="date" className="form-control" value={assignment.dueDate} />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <label htmlFor="wd-available-from">
                                            <b>Available from</b>
                                        </label>
                                        <input id="wd-available-from" type="date" className="form-control"
                                            value={assignment.availabilityDate} />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="wd-available-until">
                                            <b>Until</b>
                                        </label>
                                        <input id="wd-available-until" type="date" className="form-control"
                                            value={assignment.dueDate} />
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
                    <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-danger float-end ms-2">
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
