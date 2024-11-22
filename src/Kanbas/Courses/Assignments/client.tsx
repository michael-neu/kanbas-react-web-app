import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignment`;

export const fetchAssignmentsForCourse = async (courseId: string) => {
    const response = await axios.get(`${ASSIGNMENTS_API}/course/${courseId}`);

    return response.data;
}

export const retrieveAssignment = async (assignmentId: string) => {
    const response = await axios.get(`${ASSIGNMENTS_API}/${assignmentId}`);

    return response.data;
}

export const deleteAssignment = async (assignmentId: string) => {
    const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);

    return response.data;
};

export const upsertAssignment = async (assignment: any) => {
    const a = await retrieveAssignment(assignment._id);

    if (a === "") {
        return await createAssignment(assignment);
    } else {
        return await updateAssignment(assignment)
    }
};

export const createAssignment = async (assignment: any) => {
    const response = await axios.post(`${ASSIGNMENTS_API}`, assignment);

    return response.data;
};

export const updateAssignment = async (assignment: any) => {
    const { data } = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);

    return data;
};
