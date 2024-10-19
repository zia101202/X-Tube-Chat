import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import Upload from "../../front/src/components/upload/upload.jsx";
import Home from "./pages/home.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
export default function App() {
  return (
<>

           <Router>
            <Routes>
                <Route path="/" element={<Home/> } />
                {/* Add other routes as needed */}
            </Routes>
        </Router>
        <Upload/>

</>
  );
}