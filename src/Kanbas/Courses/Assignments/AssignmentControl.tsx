import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { createAssignment } from "./client";

export default function AssignmentControl() {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const navigate = useNavigate();

    return (
        <div id="wd-assignment-controls" style={{ display: "flex" }}>
            <div className="wd-search-assignment input-group me-1" style={{ width: "60%" }}>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Search..."
                    style={{
                        backgroundColor: "transparent",
                        paddingLeft: "50px"
                    }}
                />
                <span className="input-group-text" style={{
                    position: "absolute",
                    left: "5px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "transparent",
                    border: "none",
                }}>
                    <FaMagnifyingGlass />
                </span>
            </div>
            {(currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN') && (
                <>
                    <div className="d-line me-1" style={{ marginLeft: "auto" }}>
                        <button id="wd-collepse-all" className="btn btn-lg btn-secondary">
                            <FaPlus className="position-relative me-1" style={{ bottom: "1px" }} />
                            Group
                        </button>
                    </div>
                    <div className="d-line me-1">
                        <button id="wd-view-progress" className="btn btn-lg btn-danger" onClick={async () => {
                            const newAssignment = {
                                title: "New Assignment",
                                course: cid,
                                description: "New Assignment Description",
                                availabilityDate: "2024-01-01",
                                dueDate: "2024-12-31",
                                points: 100
                            };

                            const assignment = await createAssignment(newAssignment);
                            navigate(`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`);
                        }}>
                            <FaPlus className="position-relative me-1" style={{ bottom: "1px" }} />
                            Assignment
                        </button>
                    </div>
                </>
            )
            }
        </div >
    );
}
