import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { loginUser, registerUser } from "./services/apiService";
/* Components */
import Header from "./components/Header";
import Footer from "./components/Footer";

/* Modals */
import LoginModal from "./modals/LoginModal";
import SignupModal from "./modals/SignupModal";
import ForgotPasswordModal from "./modals/ForgotPasswordModal";

/* Pages */
import HomePage from "./pages/HomePage";
import RoomsPage from "./pages/RoomsPage";
import DiningPage from "./pages/DiningPage";
import SpaPage from "./pages/SpaPage";
import EventsPage from "./pages/EventsPage";
import GalleryPage from "./pages/GalleryPage";
import OffersPage from "./pages/OffersPage";
import BookNowPage from "./pages/BookNowPage";
/* Admin Pages */
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import RoomManagement from "./pages/admin/RoomManagement";
import DiningManagement from "./pages/admin/DiningManagement";
import SpaManagement from "./pages/admin/SpaManagement";
import EventManagement from "./pages/admin/EventManagement";
import GalleryManagement from "./pages/admin/GalleryManagement";
import OffersManagement from "./pages/admin/OffersManagement";
import BookingManagement from "./pages/admin/BookingManagement";

function App() {
  /* ---------- GLOBAL AUTH STATE ---------- */
  const [user, setUser] = useState(null);

  /* ---------- MODAL STATES ---------- */
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  /* ---------- LOGIN FORM STATE ---------- */
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  /* ---------- SIGNUP FORM STATE ---------- */
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    acceptTerms: false,
  });

  /* ---------- FORGOT PASSWORD ---------- */
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  /* ---------- ERRORS ---------- */
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [forgotError, setForgotError] = useState("");

  /* ---------- LOAD USER SESSION & AXIOS TOKEN ---------- */
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUser(user);
      // Set axios token
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    }
  }, []); 

  // Update axios token when user changes
  useEffect(() => {
    if (user) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [user]);

  /* ---------- LOGIN FUNCTION ---------- */
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({
        email: loginData.email,
        password: loginData.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setUser(res.data.user);
      setShowLoginModal(false);
      setLoginError("");

      alert("Login successful 🚀");

      if (res.data.user.role === 'admin') {
        window.location.href = '/admin';
      }
    } catch (error) {
      console.error(error);
      setLoginError(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  /* ---------- REGISTER FUNCTION (STEP 7) ---------- */
  const handleRegister = async (e) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }

    try {
      const res = await registerUser({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        phoneNumber: signupData.phone,
      });

      // Auto-login
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);

      alert("Registration successful & logged in! 🎉");

      setShowSignupModal(false);
      setSignupError("");

      // Reset form
      setSignupData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        acceptTerms: false,
      });

    } catch (error) {
      console.error(error);
      setSignupError(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  /* ---------- FORGOT PASSWORD ---------- */
  const handleForgotPassword = (e) => {
    e.preventDefault();
    setForgotError("");

    setResetSent(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      {/* HEADER (Hidden on admin paths) */}
      {!isAdminPath && (
        <Header
          user={user}
          setShowLoginModal={setShowLoginModal}
          setShowSignupModal={setShowSignupModal}
          logout={logout}
        />
      )}

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/dining" element={<DiningPage />} />
        <Route path="/spa" element={<SpaPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/book" element={<BookNowPage />} />
        {/* Admin Routes */}
        <Route path="/admin" element={
          user?.role === 'admin' ? <AdminLayout logout={logout} /> : <Navigate to="/" replace />
        } >
          <Route path="rooms" element={<RoomManagement />} />
          <Route path="dining" element={<DiningManagement />} />
          <Route path="spa" element={<SpaManagement />} />
          <Route path="events" element={<EventManagement />} />
          <Route path="offers" element={<OffersManagement />} />
          <Route path="gallery" element={<GalleryManagement />} />
          <Route path="bookings" element={<BookingManagement />} />
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>

      {/* MODALS */}
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        loginData={loginData}
        setLoginData={setLoginData}
        handleLogin={handleLogin}
        loginError={loginError}
        setShowSignupModal={setShowSignupModal}
        setShowForgotPassword={setShowForgotPassword}
      />

      <SignupModal
        showSignupModal={showSignupModal}
        setShowSignupModal={setShowSignupModal}
        signupData={signupData}
        setSignupData={setSignupData}
        handleRegister={handleRegister}   
        signupError={signupError}
        setShowLoginModal={setShowLoginModal}
      />

      <ForgotPasswordModal
        showForgotPassword={showForgotPassword}
        setShowForgotPassword={setShowForgotPassword}
        forgotEmail={forgotEmail}
        setForgotEmail={setForgotEmail}
        handleForgotPassword={handleForgotPassword}
        forgotError={forgotError}
        resetSent={resetSent}
        setResetSent={setResetSent}
        setShowLoginModal={setShowLoginModal}
      />

      {/* FOOTER (Hidden on admin paths) */}
      {!isAdminPath && <Footer />}
    </>
  );
}

export default App;

