import api from "./api";

export const register = async (email: string, password: string) => {
  return api.post("/profile/register", { email, password });
};

export const verifyOTP = async (email: string, otp: string) => {
  return api.post("/profile/verify-otp", { email, otp });
};

export const login = async (email: string, password: string) => {
  return api.post("/profile/login", { email, password });
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  return api.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = async (profileData: any) => {
  const token = localStorage.getItem("token");
  return api.put("/profile", profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const submitProfile = async () => {
  const token = localStorage.getItem("token");
  return api.post(
    "/profile/submit",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
