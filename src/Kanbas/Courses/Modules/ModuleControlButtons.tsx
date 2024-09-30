import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlusLg } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons() {
    return (
        <div className="float-end">
            <GreenCheckmark  />
            {" "}
            <BsPlusLg className="fs-4" />
            {" "}
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}
