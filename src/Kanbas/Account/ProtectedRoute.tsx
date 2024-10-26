import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: any }) {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

    // Attempting to access courses without being logged in
    if (!currentUser) {
        return <Navigate to="/Kanbas/Account/Signin" />;
    }

    const isEnrolled = enrollments.some(
        (enrollment: any) => enrollment.course === cid && enrollment.user === currentUser._id
    );

    // Attempting to access a course that they are not enrolled in
    if (cid && !isEnrolled) {
        return <Navigate to="/Kanbas/Dashboard" />;
    }

    return children;
}
