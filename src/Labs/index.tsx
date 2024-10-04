import { Route, Routes, Navigate } from "react-router";
import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import TOC from "./TOC";

export default function Labs() {
    return (
        <div>
            Michael Lappas
            <br />
            CS5610 Web Development Section 01 Fall 2024
            <br />
            Click <a href="https://github.com/mikejlappas/kanbas-react-web-app">here</a> to view the code repository.
            <br />
            <h1>Labs</h1>
            <TOC />
            <Routes>
                <Route path="/" element={<Navigate to="Lab1" />} />
                <Route path="Lab1" element={<Lab1 />} />
                <Route path="Lab2" element={<Lab2 />} />
                <Route path="Lab3/*" element={<Lab3 />} />
            </Routes>
        </div>
    );
}
