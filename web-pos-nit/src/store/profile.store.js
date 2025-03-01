export const setAcccessToken = (value) => {
  localStorage.setItem("access_token", value);
};

export const getAcccessToken = () => {
  return localStorage.getItem("access_token");
};

export const setProfile = (value) => {
  localStorage.setItem("profile", value);
};

export const getProfile = () => {
  // convert string json to object
  try {
    var profile = localStorage.getItem("profile");
    if (profile !== "" && profile !== null && profile !== undefined) {
      return JSON.parse(profile);
    }
    return null;
  } catch (err) {
    return null;
  }
};

export const setPermission = (array) => {
  localStorage.setItem("permision", array);
};

export const getPermission = () => {
  // convert string json to object
  try {
    var permission = localStorage.getItem("permision");
    if (permission !== "" && permission !== null && permission !== undefined) {
      return JSON.parse(permission);
    }
    return null;
  } catch (err) {
    return null;
  }
};


export const setUserId = (id) => {
  localStorage.setItem("user_id", id);
};

export const getUserId = () => {
  const userId = localStorage.getItem("user_id");
  return userId ? Number(userId) : null;
};

// After successful login
// export const login = async (values) => {
//   const res = await request("auth/login", "post", values);
//   if (res && res.success) {
//     setAuth({
//       userId: res.data.userId, // Store the user_id
//       token: res.data.token,
//     });
//     localStorage.setItem("auth", JSON.stringify({ userId: res.data.userId, token: res.data.token }));
//     message.success("Login successful");
//   } else {
//     message.error(res?.message || "Login failed");
//   }
// };
