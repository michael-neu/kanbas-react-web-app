import { IoEllipsisVertical, } from 'react-icons/io5';
import { FaTrash } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import SpacedGreenCheckmark from './GreenCheckmark';

export default function AssignmentIcons({ onDelete }: { onDelete: () => void; }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const handleDeleteClick = (event: any) => {
        event.preventDefault()

        const confirmDelete = window.confirm("Are you sure that you want to delete this assignment?");

        if (confirmDelete) {
            onDelete();
        }
    };

    return (

        <div className="d-flex align-items-center checkmark-container">
            <SpacedGreenCheckmark />
            {currentUser.role === 'FACULTY' && <FaTrash
                className="fs-4 me-3 text-danger"
                onClick={handleDeleteClick}
                style={{ cursor: 'pointer' }}
            />}
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}
