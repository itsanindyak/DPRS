import api from "./axios";

export const signup = async (data: {
  email: string;
  password: string;
  schoolName: string;
}) => {
  const res = await api.post("/auth/studentSignup", data);
  return res.data;
};

export const login = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};


export const me = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const logoutAPI = async () => {
  const res = await api.get("/auth/logout");
  return res.data;
};


export const addRegionalAdmin = async (data: {
  email: string;
  regionName: string;
}) => {
  const res = await api.post("/admin/addRegionalAdmin", data);
  return res.data;
};

export const addSchoolAdmin = async (data: {
  email: string;
  schoolName: string;
}) => {
  const res = await api.post("/admin/addSchoolAdmin", data);
  return res.data;
};

