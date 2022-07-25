import {FC} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Calendar from "../../component/Calendar";
import {Home} from "./Home";

export const Content: FC = () => {

    return (
        <div className={"content-container flex-container w-100"}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/calendar" element={<Calendar />} />
            </Routes>
        </div>
    );
}