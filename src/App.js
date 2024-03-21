import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AuthContext from "./context/AuthProvider";
import { Layout } from "./components/layout/Layout";
import { RequireAuth, RequireReset } from "./components/requireAuth/RequireAuth";
import { Home } from "./components/home/Home";
import { Login } from "./components/login/Login";
import { ForgotPassword } from "./components/forgotPassword/ForgotPassword";
import { SetPassword } from "./components/setPassword/SetPassword";

import "./App.css";

function App() {
  const { auth } = useContext(AuthContext);
  console.log(auth);
  return (
    <Routes>
      <Route element={<Layout />} path="/">
        <Route index element={<RequireAuth><Home /></RequireAuth>}/>
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="password-set/:secret?/:token?" element={<RequireReset><SetPassword /></RequireReset>} />
      </Route>
    </Routes>
  );
}

export default App;
