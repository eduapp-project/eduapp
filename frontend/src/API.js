import axios from "axios";
import {
  RESOURCES,
  USERS,
  USERS_INFO,
  INSTITUTIONS,
  COURSES,
  GLOGIN,
  TUITIONS,
  PING,
  SUBJECT,
} from "./config";

export const API_URL = process.env.REACT_APP_BACKEND_ENDPOINT;
export const TOKEN = localStorage.getItem("userToken");

const saveInLocalStorage = (userDetails) => {
  console.log(userDetails)

  if (userDetails.data.message.id == null) {
    throw new Error("error");
  }

  localStorage.setItem("userId", userDetails.data.message.id);
  localStorage.setItem("userToken", userDetails.headers.authorization);
};

const apiSettings = {
  //Resources
  fetchResources: async () => {
    const endpoint = `${RESOURCES}`;
    return await (await fetch(endpoint)).json();
  },

  postResource: async (body) => {
    const endpoint = `${RESOURCES}/`;
    return await axios.post(endpoint, body, {
      headers: { Authorization: localStorage.userToken },
    });
  },

  deleteResource: async (resource_id) => {
    const endpoint = `${RESOURCES} /${resource_id}`;
    return await axios.delete(endpoint, {
      headers: { Authorization: localStorage.userToken },
    });
  },

  //User
  createUser: async (body) => {
    const endpoint = `${USERS}`;
    return await axios.post(endpoint, body);
  },
  login: async (body) => {
    const endpoint = `${USERS}/sign_in`;
    return await axios.post(endpoint, body).then((res) => {
      saveInLocalStorage(res);
    });
  },
  loginWithGoogle: async (data) => {
    console.log(data);
    const endpoint = `${GLOGIN}`;
    return await axios.post(endpoint, data).then((res) => {
      console.log(res);
    });
  },

  chechToken: async (token) => {
    const endpoint = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`;
    return await (await fetch(endpoint)).json();
  },

  // User Info
  fetchInfo: async (userId) => {
    const endpoint = `${USERS_INFO}?user_id=${userId}`;
    return (await fetch(endpoint)).json();
  },
  createInfo: async (body) => {
    const endpoint = `${USERS_INFO}`;
    return await await axios.post(endpoint, body);
  },
  logout: async () => {
    const endpoint = `${USERS}/sign_out`;
    return await axios
      .delete(endpoint, {
        headers: { Authorization: localStorage.userToken },
      })
      .then(() => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userToken");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("offline_user");

        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("userId");
        localStorage.removeItem("userToken");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("offline_user");

        window.location.href = "/login";
      });
  },

  deleteInfo: async (infoId) => {
    const endpoint = `${USERS_INFO}/${infoId}`;
    return await axios.delete(endpoint);
  },
  updateInfo: async (infoId, body) => {
    const endpoint = `${USERS_INFO}/${infoId}`;
    return await axios.put(endpoint, body);
  },

  addGoogleId: async (userId, body) => {
    const endpoint = `${USERS_INFO}/${userId}`;
    let finaldata = new FormData();
    return await axios.put(endpoint, body).then(() => {
      finaldata.append("isLoggedWithGoogle", true);
      axios.put(endpoint, finaldata).then(() => {
        window.location.reload();
      });
    });
  },
  unlinkGoogleId: async (userId, body) => {
    const endpoint = `${USERS_INFO}/${userId}`;
    let finaldata = new FormData();
    return await axios.put(endpoint, body).then(() => {
      finaldata.append("isLoggedWithGoogle", false);
      axios.put(endpoint, finaldata).then(() => {
        window.location.reload();
      });
    });
  },

  //User courses
  getCourses: async () => {
    const endpoint = `${TUITIONS}`;
    let courses = [];

    await axios.get(endpoint).then((res) => {
      res.data.map((course) => {
        if (course.user_id.toString() === localStorage.userId) {
          if (course.course.name !== "Noticias") {
            return courses.push(course);
          }
        }
      });
    });
    return courses;
  },

  createCourse: async (body) => {
    const endpoint = `${COURSES}`;
    return await axios.post(endpoint, body);
  },
  //Subjects
  getSubjects: async (id) => {
    let subjects = await axios
      .get(`${SUBJECT}?user=${parseInt(id)}`)
      .then((res) => {
        return res.data;
      });
    return subjects;
  },

  //Institutions
  fetchInstitutions: async () => {
    const endpoint = `${INSTITUTIONS}`;
    return await axios.get(endpoint);
  },
  createInstitution: async (body) => {
    const endpoint = `${INSTITUTIONS}`;
    return await axios.post(endpoint, body);
  },

  //Users
  fetchCourses: async () => {
    const endpoint = `${COURSES}`;
    return await axios.get(endpoint);
  },

  //User infos
  fetchUserInfos: async () => {
    const endpoint = `${USERS_INFO}`;
    return await axios.get(endpoint);
  },
  //Users tuition
  enrollUser: async (body) => {
    const endpoint = `${TUITIONS}`;
    return await axios.post(endpoint, body);
  },
};

export default apiSettings;

export const asynchronizeRequest = async (requestFunction) => {
  let tries = 0;
  const maxTries = 5;

  while (tries < maxTries) {
    try {
      await axios({
        method: "get",
        url: PING,
        timeout: 5000,
      });

      return requestFunction.call();
    } catch (err) {
      if (err.toString().includes("Network Error"))
        await new Promise((res) => setTimeout(res, 2000));
      tries++;
      continue;
    }
  }

  return true;
};
