import axios from "axios";

const API = axios.create({ baseURL: "https://careerpilot-api.onrender.com/api", });

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const getJobs = (token) =>
  API.get("/jobs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const createJob = (data, token) => API.post("/jobs/create", data, { headers: { Authorization: `Bearer ${token}`, }, });

export const deleteJob = (id, token) =>
  API.delete(`/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

//   export const updateJob = (
//   id,
//   data,
//   token
// ) =>
//   API.put(`/jobs/${id}`, data, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
export const updateJob =
  async (
    id,
    jobData
  ) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await axios.put(
        `https://careerpilot-api.onrender.com/api/jobs/${id}`,
        jobData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const uploadResume = (
  formData,
  token
) =>
  API.post(
    "/auth/upload-resume",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

export const getProfile = (token) =>
  API.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const analyzeResume = (
  formData,
  token
) =>
  API.post(
    "/resume/analyze",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":
          "multipart/form-data",
      },
    }
  );


export const searchLiveJobs =
  (keyword) =>

    API.get(
      `/job-search/search?keyword=${keyword}`
    );



export const saveJob =
  (data, token) =>

    API.post(
      "/saved-jobs",
      data,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

export const getSavedJobs =
  (token) =>

    API.get(
      "/saved-jobs",
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

export const deleteSavedJob =
  (id, token) =>

    API.delete(
      `/saved-jobs/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );


