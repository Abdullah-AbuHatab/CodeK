// src/components/PrivateRoute.js
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children, roles }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  if (!user) {
    // لو مش مسجل دخول، نروح لل login ونحفظ الصفحة الحالية
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // لو الدور غير مسموح له
    return <Navigate to="/" replace />;
  }

  return children;
}
