import axios from "axios";
import { API_URL, TOKEN } from "../API";
export const SUBJECTS = `${API_URL}/subjects`;
const requestHeader = { eduauth: TOKEN };

//subject
export const fetchSubjects = async () => {
  return await axios.get(`${SUBJECTS}`, { headers: requestHeader });
};

export const fetchSubject = async (id) => {
  return await axios.get(`${SUBJECTS}?subject_id=${id}`, {
    headers: requestHeader,
  });
};

export const getGeneralSubject = async () => {
  return await axios.get(`${SUBJECTS}/?name=General`, {
    headers: requestHeader,
  });
};

export const createSubject = async (body) => {
  return await axios.post(`${SUBJECTS}`, body, { headers: requestHeader });
};

export const deleteSubject = async (id) => {
  return await axios.delete(`${SUBJECTS}/${id}`, { headers: requestHeader });
};

export const editSubject = async (body) => {
  return await axios.put(`${SUBJECTS}/${body.id}`, body, {
    headers: requestHeader,
  });
};

export const pagedSubjects = async (page) => {
  return await axios.get(`${SUBJECTS}?page=${page}`, {
    headers: requestHeader,
  });
}