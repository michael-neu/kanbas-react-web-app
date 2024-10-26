import { useState } from "react";

export default function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);
    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };
    const deleteElement = (index: number) => {
        setArray(array.filter((item, i) => i !== index));
    };

    return (
        <div id="wd-array-state-variables">
            <h2>Array State Variable</h2>
            <button className="btn btn-success" onClick={addElement}>Add Element</button>
            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {array.map((item, index) => (
                        <div>
                            <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                                <b>{item}</b>
                                <button onClick={() => deleteElement(index)}
                                    className="btn btn-danger"
                                    id="wd-delete-element-click">
                                    Delete
                                </button>
                            </li>
                            <hr />
                        </div>
                    ))}
                </ul>
            </div>
            <hr />
        </div>
    );
}
