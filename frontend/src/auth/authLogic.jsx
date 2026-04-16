// src/auth/authLogic.js

/* ---------- LOAD USERS ---------- */
export const loadUsers = () => {
  const savedUsers = localStorage.getItem("users");

  if (savedUsers) {
    return JSON.parse(savedUsers);
  }

  return [
    {
      id: 1,
      name: "Demo User",
      email: "demo@example.com",
      password: "demo123",
      phone: "+91 98765 43210",
      memberSince: "2024",
      bookings: [],
      preferences: {
        roomType: "Deluxe",
        specialRequests: "Non-smoking",
      },
      loyaltyPoints: 0,
      tier: "Bronze",
    },
  ];
};

/* ---------- LOAD CURRENT USER ---------- */
export const loadCurrentUser = () => {
  const savedUser = localStorage.getItem("currentUser");
  return savedUser ? JSON.parse(savedUser) : null;
};

/* ---------- SAVE USERS ---------- */
export const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

/* ---------- LOGIN ---------- */
export const loginUser = ({
  users,
  loginData,
  setUser,
  setLoginData,
  setShowLoginModal,
  setSuccessMessage,
  setLoginError,
}) => {
  const foundUser = users.find(
    (u) =>
      u.email.toLowerCase() === loginData.email.toLowerCase() &&
      u.password === loginData.password
  );

  if (foundUser) {
    const { password, ...userWithoutPassword } = foundUser;

    setUser(userWithoutPassword);

    localStorage.setItem(
      "currentUser",
      JSON.stringify(userWithoutPassword)
    );

    setLoginData({
      email: "",
      password: "",
      rememberMe: false,
    });

    setShowLoginModal(false);

    setSuccessMessage(`Welcome back, ${foundUser.name}!`);
    setLoginError("");

    setTimeout(() => setSuccessMessage(""), 3000);
  } else {
    setLoginError("Invalid email or password");
  }
};

/* ---------- SIGNUP ---------- */
export const signupUser = ({
  users,
  signupData,
  setUsers,
  setUser,
  setSignupError,
  setSignupData,
  setShowSignupModal,
  setSuccessMessage,
}) => {
  if (signupData.password !== signupData.confirmPassword) {
    setSignupError("Passwords do not match");
    return;
  }

  if (signupData.password.length < 6) {
    setSignupError("Password must be at least 6 characters");
    return;
  }

  if (
    users.some(
      (u) =>
        u.email.toLowerCase() === signupData.email.toLowerCase()
    )
  ) {
    setSignupError("Email already registered");
    return;
  }

  const newUser = {
    id: users.length + 1,
    name: signupData.name,
    email: signupData.email,
    password: signupData.password,
    phone: signupData.phone,
    memberSince: new Date().getFullYear(),
    bookings: [],
    preferences: {
      roomType: "Standard",
      specialRequests: "",
    },
    loyaltyPoints: 0,
    tier: "Bronze",
  };

  const updatedUsers = [...users, newUser];
  setUsers(updatedUsers);
  saveUsers(updatedUsers);

  const { password, ...userWithoutPassword } = newUser;

  setUser(userWithoutPassword);

  localStorage.setItem(
    "currentUser",
    JSON.stringify(userWithoutPassword)
  );

  setSignupData({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    acceptTerms: false,
  });

  setShowSignupModal(false);

  setSuccessMessage(`Welcome to Le Méridien, ${newUser.name}!`);
  setSignupError("");

  setTimeout(() => setSuccessMessage(""), 3000);
};

/* ---------- FORGOT PASSWORD ---------- */
export const forgotPassword = ({
  users,
  forgotEmail,
  setForgotError,
  setResetSent,
}) => {
  const userExists = users.some(
    (u) =>
      u.email.toLowerCase() === forgotEmail.toLowerCase()
  );

  if (userExists) {
    setResetSent(true);
    setForgotError("");
  } else {
    setForgotError("Email not found in our records");
  }
};

/* ---------- LOGOUT ---------- */
export const logoutUser = ({
  setUser,
  setShowProfileMenu,
  setSuccessMessage,
}) => {
  localStorage.removeItem("currentUser");

  setUser(null);
  setShowProfileMenu(false);

  setSuccessMessage("You have been logged out successfully");

  setTimeout(() => setSuccessMessage(""), 3000);
};