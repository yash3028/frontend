import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css'
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import CreateSoftware from "./components/CreateSoftware";
import RequestAccess from "./components/RequestAccess";
import PendingRequest from "./components/PendingRequest";
import Layout from "./components/Layout";
import Home from "./components/Home";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}  />
            <Route path="/login" element={<Login/>}  />
            <Route path="/signup" element={<SignUp/>} />
            <Route element={<Layout />}>
              <Route path="/create-software" element={<CreateSoftware/>} />
              <Route path="/request-access" element={<RequestAccess />} />
              <Route path="/pending-requests" element={<PendingRequest />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
