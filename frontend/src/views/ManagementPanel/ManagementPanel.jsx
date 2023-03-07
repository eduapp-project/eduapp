import React, { useEffect, useState } from "react";
import * as API from "../../API";
import * as COURSE_SERVICE from "../../services/course.service";
import * as USER_SERVICE from "../../services/user.service";
import * as INSTITUTION_SERVICE from "../../services/institution.service";
import * as SCHEDULE_SERVICE from "../../services/schedule.service";
import * as ENROLL_SERVICE from "../../services/enrollment.service";
import * as ROLE_SERVICE from "../../services/role.service";
import * as SUBJECTSERVICE from "../../services/subject.service";
import * as CHATSERVICE from "../../services/chat.service";
import { interceptExpiredToken } from "../../utils/OfflineManager";
import AppHeader from "../../components/appHeader/AppHeader";
import useLanguage from "../../hooks/useLanguage";
import "./ManagementPanel.css";

var institutions, courses, users;

export default function ManagementPanel() {
  const [isMobile, setIsMobile] = useState(false);
  const [institutionsLoading, setInstitutionsLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [allowNewInstitution, setAllowInstitution] = useState(true);
  const [userRoles, setUserRoles] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chats, setChats] = useState([]);

  const language = useLanguage();

  const postSession = async (e) => {
    e.preventDefault();

    const context = [
      "session_name",
      "session_start_date",
      "session_end_date",
      "streaming_platform",
      "resources_platform",
      "session_chat_id",
      "subject_id",
      "subject_code",
    ];

    let json = [];
    let name = document.getElementById("s_name").value;
    let start_date = document.getElementById("s_start_date").value;
    let end_date = document.getElementById("s_end_date").value;
    let resources = document.getElementById("s_resources").value;
    let streaming = document.getElementById("s_streaming").value;
    let subject = document.getElementById("s_subjectId").value;
    let subject_id = subject.split("_")[1];
    let subject_code = subject.split("_")[0];
    let chat = await SUBJECTSERVICE.fetchSubject(subject_id);

    if (
      (name !== "" &&
        start_date !== "" &&
        end_date !== "" &&
        resources !== "" &&
        streaming !== "" &&
        subject_id !== `${language.chooseSubject}` &&
        subject_id !== "",
      subject_code !== `${language.chooseSubject}` && subject_code !== "")
    ) {
      json.push(
        name,
        start_date,
        end_date,
        streaming,
        resources,
        chat.data[0].chat_link,
        subject_id,
        subject_code
      );
    } else {
      window.alert("Missing information");
      return;
    }

    let SessionJson = {};
    for (let i = 0; i <= context.length - 1; i++) {
      SessionJson[context[i]] = json[i];
    }
    await SCHEDULE_SERVICE.createSession(SessionJson);
    window.location.reload();
  };

  const createSubject = async (e) => {
    e.preventDefault();

    let subject_code = document.getElementById("sj_subjectCode").value;
    let name = document.getElementById("sj_name").value;
    let desc = document.getElementById("sj_desc").value;
    let color = document.getElementById("sj_color").value;
    let sel_course = document.getElementById("course_chooser").value;
    let chat_link = document.getElementById("chat_chooser").value;

    let info = [subject_code, name, desc, color, sel_course, chat_link];

    let valid = true;
    for (let i of info) {
      if (i.length < 2 && i === "-" && i === "") {
        valid = false;
        break;
      }
    }

    await SUBJECTSERVICE.createSubject({
      subject_code: subject_code,
      name: name,
      description: desc,
      color: color,
      course_id: sel_course,
      chat_link: chat_link === "-" ? null : chat_link,
    });
    window.location.reload();
  }

  const fetchInstitutions = () => {
    try {
      INSTITUTION_SERVICE.fetchInstitutions().then((res) => {
        institutions = res.data;
        setInstitutionsLoading(false);
        if (res.data.length > 0) setAllowInstitution(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getInstitution = (id) => {
    let res;
    institutions.map((i) => {
      if (i.id === id) res = i.name;
      return 0;
    });
    return res;
  };

  const fetchUsers = () => {
    try {
      USER_SERVICE.fetchUserInfos().then((res) => {
        users = res.data;
        setUsersLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRoles = () => {
    try {
      ROLE_SERVICE.fetchRoles().then((res) => {
        setUserRoles(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCourses = () => {
    try {
      COURSE_SERVICE.fetchCourses().then((res) => {
        courses = res.data;
        setCoursesLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubjects = () => {
    API.asynchronizeRequest(function () {
      SUBJECTSERVICE.fetchSubjects().then((cs) => setSubjects(cs.data));
    }).then(async (e) => {
      if (e) {
        await interceptExpiredToken(e);
      }
    });
  };

  const fetchChats = () => {
    API.asynchronizeRequest(function () {
      CHATSERVICE.fetchChat().then((chats) => {
        setChats(chats.data);
      });
    }).then(async (e) => {
      if (e) {
        await interceptExpiredToken(e);
      }
    });
  };

  const postInstitution = (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("name", e.target.institution_name.value);
    // API.createInstitution(payload);
    // window.location.reload();
  };

  const postCourse = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("name", e.target.name.value);
    payload.append("institution_id", e.target.institution_id.value);

    await COURSE_SERVICE.createCourse(payload);
    window.location.reload();
  };

  const deleteInstitution = (event) => {
    event.preventDefault();
    // API.deleteInstitution(event.target.institutions.value);
    // window.location.reload();
  };

  const deleteCourse = async (id) => {
    await COURSE_SERVICE.deleteCourse(id);
  };

  const createUser = async (event) => {
    event.preventDefault();
    const payload = {
      email: event.target.email.value,
      password: event.target.password.value,
      user_role: event.target.new_u_role.value,
    };
    await USER_SERVICE.createUser(payload).catch((err) => console.log(err));
  };

  const userEnroll = (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append(
      "course_id",
      e.target.tuition_course.value.split(":")[1].split("/")[0]
    );
    payload.append(
      "institution_id",
      e.target.tuition_course.value.split(":")[1].split("/")[1]
    );
    payload.append("user_id", e.target.tuition_user.value);
    payload.append("course_name", e.target.tuition_course.value.split(":")[0]);
    payload.append(
      "institution_name",
      getInstitution(e.target.tuition_course.value.split(":")[1].split("/")[1])
    );

    ENROLL_SERVICE.createTuition(payload).then(() => {
      window.location.reload();
    });
  };

  const checkMediaQueries = () => {
    setInterval(() => {
      if (window.innerWidth < 1100) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }, 1000);
  };

  const openThisItem = (input) => {
    let item = document.getElementById(input);
    item.classList.remove("hidden");
    Array.from(document.getElementsByClassName("buttonManagementPanel")).map(
      (button) => {
        button.classList.add("hidden");
        return true;
      }
    );
    document.getElementsByTagName("header")[0].style.display = "none";
  };

  const closeThisItem = (input) => {
    let item = document.getElementById(input);
    item.classList.add("hidden");
    Array.from(document.getElementsByClassName("buttonManagementPanel")).map(
      (button) => {
        button.classList.remove("hidden");
        return true;
      }
    );
    document.getElementsByTagName("header")[0].style.display = "flex";
  };

  useEffect(() => {
    fetchRoles();
    fetchInstitutions();
    fetchCourses();
    fetchSubjects();
    fetchChats();
    fetchUsers();
    checkMediaQueries();

    //First check
    if (window.innerWidth < 1100) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return !institutionsLoading &&
    institutions !== undefined &&
    !coursesLoading &&
    courses !== undefined &&
    !usersLoading &&
    users !== undefined ? (
    <div className="managementpanel__main">
      <div className="managementpanel__container">
        {/* <div
          id="buttonManagementPanel__intitutions"
          className="buttonManagementPanel"
          onClick={() => {
            openThisItem("institutions");
          }}
        >
          <span>{language.institutions}</span>
        </div> */}
        <div
          className="buttonManagementPanel"
          onClick={() => {
            openThisItem("courses");
          }}
        >
          <span>{language.courses}</span>
        </div>
        <div
          className="buttonManagementPanel"
          onClick={() => {
            openThisItem("users");
          }}
        >
          <span>{language.users}</span>
        </div>
        <div
          className="buttonManagementPanel"
          onClick={() => {
            openThisItem("enrollments");
          }}
        >
          <span>{language.enrollments}</span>
        </div>
        <div
          className="buttonManagementPanel"
          onClick={() => {
            openThisItem("sessions");
          }}
        >
          <span>{language.sessions}</span>
        </div>
        <div
          className="buttonManagementPanel"
          onClick={() => {
            openThisItem("subjects");
          }}
        >
          <span>{language.subjects}</span>
        </div>
        <div
          id="institutions"
          className="managementpanel__institutions managementpanel__item hidden"
        >
          <AppHeader
            closeHandler={() => {
              closeThisItem("institutions");
            }}
            tabName={language.institutions}
          />

          <div className="managementpanel__item__header">
            <div id="cp-institutions" className="institutions">
              <div className="institutions__post management__form-container">
                <form action="submit" onSubmit={postInstitution}>
                  <label htmlFor="institution_name">Institution name</label>
                  <input
                    autoComplete="off"
                    type="text"
                    name="institution_name"
                    required
                  />
                  <p
                    style={{
                      color: "red",
                      display: allowNewInstitution ? "none" : "block",
                    }}
                  >
                    {language.mgmt_institution_cap}
                  </p>
                  <button type="submit" disabled={allowNewInstitution}>
                    {language.submit}
                  </button>
                </form>
              </div>
              <div className="institutions__delete management__form-container">
                <h3>{language.mgmt_delete_institution}</h3>
                <form action="submit" onSubmit={deleteInstitution}>
                  <select name="institutions" id="institutions_delete">
                    {institutions.map((i) => {
                      return (
                        <option key={i.id} value={i.id}>
                          {i.name}
                        </option>
                      );
                    })}
                  </select>
                  <button type="submit">{language.delete}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          id="courses"
          className="managementpanel__courses managementpanel__item hidden"
        >
          <AppHeader
            closeHandler={() => {
              closeThisItem("courses");
            }}
            tabName={language.courses}
          />
          <div className="managementpanel__item__header">
            <div id="cp-courses" className="courses">
              <div className="courses__post management__form-container">
                <form action="submit" onSubmit={postCourse}>
                  <input type="text" name="name" />
                  <select name="institution_id" id="institution_id">
                    {institutions.map((i) => {
                      return (
                        <option key={i.id} value={i.id}>
                          {i.name}
                        </option>
                      );
                    })}
                  </select>
                  <button type="submit">{language.submit}</button>
                </form>
              </div>
              <div className="courses__delete management__form-container">
                <h3>{language.mgmt_delete_course}</h3>
                <form action="submit" onSubmit={deleteCourse}>
                  <select name="courses" id="courses_delete">
                    {courses.map((i) => {
                      return (
                        <option key={i.id} value={i.id}>
                          {i.name}
                        </option>
                      );
                    })}
                  </select>
                  <button type="submit">{language.delete}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          id="users"
          className="managementpanel__users managementpanel__item hidden"
        >
          <AppHeader
            closeHandler={() => {
              closeThisItem("users");
            }}
            tabName={language.users}
          />
          <div className="managementpanel__item__header">
            <div id="cp-users" className="users">
              <div className="users__post management__form-container">
                <form action="submit" onSubmit={createUser}>
                  <label htmlFor="email">{language.email}</label>
                  <input autoComplete="off" type="text" name="email" />
                  <label htmlFor="password">{language.password}</label>
                  <input autoComplete="off" type="password" name="password" />
                  <label htmlFor="new_u_role">Admin</label>
                  <select name="new_u_role" id="new_u_role">
                    {userRoles !== undefined
                      ? userRoles.map((r) => {
                          return (
                            <option key={r.id} value={r.name}>
                              {r.name}
                            </option>
                          );
                        })
                      : null}
                  </select>
                  <button type="submit">{language.mgmt_register_user}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          id="enrollments"
          className="managementpanel__enrollments managementpanel__item hidden"
        >
          <AppHeader
            closeHandler={() => {
              closeThisItem("enrollments");
            }}
            tabName={language.enrollments}
          />
          <div
            className="managementpanel__item__header"
            style={{ marginLeft: "9%" }}
          >
            <div className="user_tuition management__form-container">
              <form action="submit" onSubmit={userEnroll}>
                <label htmlFor="tuition_course">
                  {language.courses.substring(0, language.courses.length - 1)}
                </label>
                <select name="tuition_course" id="tuition_course">
                  {courses.map((i) => {
                    return (
                      <option
                        key={i.id}
                        value={i.name + ":" + i.id + "/" + i.institution_id}
                      >
                        {i.name} - {getInstitution(i.institution_id)}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="tuition_user">
                  {language.users.substring(0, language.users.length - 1)}
                </label>
                <select name="tuition_user" id="tuition_user">
                  {users.map((i) => {
                    return (
                      <option key={i.id} value={i.id}>
                        {i.user_name}
                      </option>
                    );
                  })}
                </select>
                <button type="submit">{language.enroll}</button>
              </form>
            </div>
          </div>
        </div>
        <div
          id="sessions"
          className="managementpanel__sessions managementpanel__item hidden"
        >
          <AppHeader
            closeHandler={() => {
              closeThisItem("sessions");
            }}
            tabName={language.sessions}
          />
          <div
            className="managementpanel__item__header"
            style={{ height: "80vh", overflow: "hidden" }}
          >
            <div id="cp-sessions" className="sessions">
              <div className="sessions__post management__form-container">
                <form action="submit" onSubmit={postSession}>
                  <label htmlFor="institution_name">{language.name}:</label>
                  <input
                    id="s_name"
                    autoComplete="off"
                    type="text"
                    name="session_name"
                    required
                  />
                  <label htmlFor="institution_name">{language.date}:</label>
                  <div className="timeInputs">
                    <input
                      id="s_start_date"
                      name="start"
                      type="datetime-local"
                      required
                    ></input>
                    <input
                      id="s_end_date"
                      name="end"
                      type="datetime-local"
                      required
                    ></input>
                  </div>
                  <label htmlFor="institution_name">
                    {language.mgmt_streaming_link}:
                  </label>
                  <input
                    id="s_streaming"
                    autoComplete="off"
                    type="text"
                    name="streaming"
                  />
                  <label htmlFor="session_resources">
                    {language.mgmt_resources_link}:
                  </label>
                  <input id="s_resources" name="resources" type="text"></input>
                  <label htmlFor="s_subjectId">
                    {language.courses.substring(0, language.courses.length - 1)}
                    :
                  </label>
                  <select name="s_subjectId" id="s_subjectId" required>
                    {subjects.map((s) => {
                      return (
                        <option key={s.id} value={`${s.subject_code}_${s.id}`}>
                          {s.name}
                        </option>
                      );
                    })}
                  </select>
                  <button type="submit">{language.submit}</button>
                </form>
              </div>
              {/* <div className="sessions__delete management__form-container">
                                    <h3>DELETE A SESSION</h3>
                                    <form action="submit" onSubmit={deleteSession}>
                                        <select name="sessions" id="sessions_delete">
                                            {sessions.map((i) => {
                                                return <option value={i.id}>{i.name}</option>;
                                            })}
                                        </select>
                                        <button type="submit">DELETE</button>
                                    </form>
                                </div> */}
            </div>
          </div>
        </div>
        <div
          id="subjects"
          className="managementpanel__sessions managementpanel__item hidden"
        >
          <AppHeader
            closeHandler={() => {
              closeThisItem("subjects");
            }}
            tabName={language.subjects}
          />
          <div
            className="managementpanel__item__header"
            style={{ height: "80vh", overflow: "hidden" }}
          >
            <div id="cp-subjects" className="sessions">
              <div className="sessions__post management__form-container">
                <form action="submit" onSubmit={createSubject}>
                  <label htmlFor="sj_subjectCode">
                    {language.subjectCode}:
                  </label>
                  <input
                    id="sj_subjectCode"
                    autoComplete="off"
                    type="text"
                    name="sj_subjectCode"
                    required
                  />
                  <label htmlFor="sj_name">{language.name}:</label>
                  <input id="sj_name" type="text" name="sj_name" required />
                  <label htmlFor="sj_desc">{language.description}:</label>
                  <input
                    id="sj_desc"
                    autoComplete="off"
                    type="text"
                    name="sj_desc"
                  />
                  <label htmlFor="sj_color">{language.color}:</label>
                  <input id="sj_color" name="sj_color" type="color" />
                  <label htmlFor="course_chooser">
                    {language.chooseCourse}:
                  </label>
                  <select
                    defaultValue={"-"}
                    name="course_chooser"
                    id="course_chooser"
                    required
                  >
                    <option value="-">{language.chooseCourse}</option>
                    {courses
                      ? courses.map((c) => {
                          return (
                            <option key={c.id} value={c.id}>
                              {c.name}
                            </option>
                          );
                        })
                      : null}
                  </select>
                  <label htmlFor="chat_chooser">{language.chooseChat}:</label>
                  <select
                    defaultValue={"-"}
                    name="chat_chooser"
                    id="chat_chooser"
                  >
                    <option value="-">{language.chooseChat}</option>
                    {chats
                      ? chats.map((ch) => {
                          console.log(ch);
                          if (ch.isGroup && !ch.is_being_used) {
                            return (
                              <option key={ch.id} value={ch.id}>
                                {ch.chat_name}
                              </option>
                            );
                          }
                        })
                      : null}
                  </select>
                  <button type="submit">{language.submit}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
