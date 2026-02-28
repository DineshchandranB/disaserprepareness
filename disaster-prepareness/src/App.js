import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard-NEW";
import EmergencyContacts from "./pages/EmergencyContacts";
import DisasterChecklist from "./pages/DisasterChecklist";
import AlertsCenter from "./pages/AlertsCenter";
import VolunteerCoordination from "./pages/VolunteerCoordination";
import RiskProfile from "./pages/RiskProfile";

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/emergency-contacts" element={<EmergencyContacts/>}/>
        <Route path="/checklist" element={<DisasterChecklist/>}/>
        <Route path="/alerts" element={<AlertsCenter/>}/>
        <Route path="/volunteer" element={<VolunteerCoordination/>}/>
        <Route path="/risk-profile" element={<RiskProfile/>}/>
      </Routes>
    </BrowserRouter>
  )
}
