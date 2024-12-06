import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const fetchEnrollments = async () => {
    const { data } = await axios.get(`${ENROLLMENTS_API}/all`);

    return data;
}

export const fetchMyEnrollments = async (userId: string) => {
    const { data } = await axios.get(`${ENROLLMENTS_API}/my/${userId}`);

    return data;
}

export const addEnrollment = async (userId: string, courseId: string) => {
    const { data } = await axios.post(`${ENROLLMENTS_API}/add/${userId}/${courseId}`);

    return data;
}

export const removeEnrollment = async (userId: string, courseId: string) => {
    const { data } = await axios.post(`${ENROLLMENTS_API}/remove/${userId}/${courseId}`);

    return data;
};

export const removeCourseEnrollments = async (courseId: string) => {
    const { data } = await axios.post(`${ENROLLMENTS_API}/remove/${courseId}`);

    return data;
};
