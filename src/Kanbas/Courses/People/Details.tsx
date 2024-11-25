import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as client from "../../Account/client";

export default function PeopleDetails() {
    const { uid } = useParams();
    const [user, setUser] = useState<any>({});
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [editing, setEditing] = useState(false);

    const saveUser = async () => {
        const [firstName, lastName] = name.split(" ");

        if (firstName === "" || firstName === undefined) {
            setEditing(false);

            return;
        }

        const updatedUser = { ...user, firstName, lastName };

        await client.updateUser(updatedUser);

        setUser(updatedUser);
        setEditing(false);
    };

    const saveEmail = async () => {
        const updatedUser = { ...user, email };

        await client.updateUser(updatedUser);

        setUser(updatedUser);
        setEditing(false);
    }

    const saveRole = async () => {
        const updatedUser = { ...user, role };

        await client.updateUser(updatedUser);

        setRole(updatedUser);
        setEditing(false);
    }

    const saveAll = async () => {
        saveUser();
        saveEmail();
    }

    const deleteUser = async (uid: string) => {
        await client.deleteUser(uid);
    };

    const fetchUser = async () => {
        if (!uid) {
            return;
        }

        const user = await client.findUserById(uid);

        setUser(user);
    };
    useEffect(() => {
        if (uid) fetchUser();
    }, [uid]);

    if (!uid) {
        return null;
    }

    return (
        <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
            <hr />
            <button onClick={() => { setEditing(false); deleteUser(uid); navigate(-1); }} className="btn btn-danger float-end wd-delete" >
                Delete
            </button>
            <button onClick={() => { setEditing(false); navigate(-1); }} className="btn btn-secondary float-start float-end me-2 wd-cancel" >
                Cancel
            </button>
            <button onClick={() => navigate(-1)} className="btn position-fixed end-0 top-0 wd-close-details"><IoCloseSharp className="fs-1" />
            </button>
            <div
                className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" />
            </div>
            <hr />
            <b>Name:</b>{" "}
            {!editing && (
                <FaPencil onClick={() => setEditing(true)} className="float-end fs-5 mt-2 wd-edit" />)
            }
            {editing && (
                <FaCheck onClick={() => { saveAll(); navigate(-1); }} className="float-end fs-5 mt-2 me-2 wd-save" />)
            }
            {!editing && (
                <>
                    <span className="wd-name" onClick={() => setEditing(true)}>
                        {user.firstName}{" "}{user.lastName}
                    </span>
                    <br />
                </>
            )}
            {user && editing && (
                <input className="form-control w-100 wd-edit-name"
                    defaultValue={`${user.firstName} ${user.lastName}`}
                    onChange={(event) => setName(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key !== "Enter") {
                            return;
                        }

                        setEditing(false);
                        saveUser();

                        navigate(-1);
                    }}
                />
            )}
            <b>E-Mail:</b>{" "}
            {!editing && (
                <>
                    <span className="wd-email" onClick={() => setEditing(true)}>{user.email}</span>
                    <br />
                </>
            )}
            {user && editing && (
                <input className="form-control w-100 wd-edit-email"
                    defaultValue={`${user.email}`}
                    onChange={(event) => setEmail(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key !== "Enter") {
                            return;
                        }

                        setEditing(false);
                        saveEmail();

                        navigate(-1);
                    }}
                />
            )}
            <b>Role:</b>{" "}
            {!editing && (
                <>
                    <span className="wd-roles" onClick={() => setEditing(true)}>{user.role}</span>
                    <br />
                </>
            )}
            {user && editing && (
                <select
                    className="form-control w-100 wd-edit-role"
                    defaultValue={`${user.role}`}
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key !== "Enter") {
                            return;
                        }

                        setEditing(false);
                        saveRole();

                        navigate(-1);
                    }}
                >
                    <option value="STUDENT">STUDENT</option>
                    <option value="TA">TA</option>
                    <option value="FACULTY">FACULTY</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
            )}
            <b>Login ID:</b>{" "}
            <span className="wd-login-id">{user.loginId}</span>
            <br />
            <b>Section:</b>{" "}
            <span className="wd-section">{user.section}</span>
            <br />
            <b>Total Activity:</b>{" "}
            <span className="wd-total-activity">{user.totalActivity}</span>
        </div >
    );
}
