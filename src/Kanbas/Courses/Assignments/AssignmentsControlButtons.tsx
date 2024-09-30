import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlusLg } from "react-icons/bs";

export function AssignmentsControlButtons() {
    return (
        <div className="d-flex align-items-center justify-content-end" style={{ marginLeft: 'auto' }}>
            <span className="wd-rounded-corners-all-around wd-border-solid wd-border-very-thin px-3 me-1" >
                <div>
                    40% of Total
                </div>
            </span>
            <BsPlusLg className="fs-4 me-4" />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}