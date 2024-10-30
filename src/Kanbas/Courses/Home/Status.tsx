import { FaBell, FaCheckCircle, FaHome } from "react-icons/fa";
import { FaBan, FaBullhorn, FaDownload, FaRightToBracket } from "react-icons/fa6";
import { FaChartSimple } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function CourseStatus() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    return (
        <div id="wd-course-status" style={{ width: "300px", marginLeft: "20px" }}>
            {currentUser.role === 'FACULTY' && (
                <>
                    <h2>Course Status</h2>
                    <div className="d-flex">
                        <div className="w-50 pe-1">
                            <button className="btn btn-lg btn-secondary w-100 text-nowrap">
                                <FaBan className="me-2 fs-5" />
                                Unpublish
                            </button>
                        </div>
                        <div className="w-50 pe-1">
                            <button className="btn btn-lg btn-success w-100">
                                <FaCheckCircle className="me-2 fs-5" />
                                Publish
                            </button>
                        </div>
                    </div>
                    <br />
                </>
            )}
            <div>
                <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                    <FaDownload className="me-2 fs-5" />
                    Import Existing Content
                </button>
            </div>
            <div>
                <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                    <FaRightToBracket className="me-2 fs-5 fa-rotate-90" />
                    Import from Commons
                </button>
            </div>
            <div>
                <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                    <FaHome className="me-2 fs-5" />
                    Choose Home Page
                </button>
            </div>
            <div>
                <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                    <FaChartSimple className="me-2 fs-5" />
                    View Course Stream
                </button>
            </div>
            <div>
                <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                    <FaBullhorn className="me-2 fs-5" />
                    New Announcement
                </button>
            </div>
            <div>
                <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                    <FaChartSimple className="me-2 fs-5" />
                    New Analytics
                </button>
            </div>
            <div>
                <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                    <FaBell className="me-2 fs-5" />
                    View Course Notifications
                </button>
            </div>
        </div >
    );
}
