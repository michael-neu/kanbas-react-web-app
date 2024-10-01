import { IoEllipsisVertical } from 'react-icons/io5';
import SpacedGreenCheckmark from './GreenCheckmark';

export default function AssignmentIcons() {
    return (
        <div className="d-flex align-items-center checkmark-container">
            <SpacedGreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}