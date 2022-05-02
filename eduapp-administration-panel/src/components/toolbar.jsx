import React from "react";
import "../styles/scheduletoolbar.css";
import Batcher from "./Batcher";
export default function Toolbar(props) {
  const handleChangeFilterSession = (event) => {
    document.dispatchEvent(
      new CustomEvent("filter_subject", {
        detail: event.target.value,
      })
    );
  };

    const usersSearchFilter = (event) => {
        let value = event.target.value;
        props.search(value)
    }

    const userRoleFilter = (event) => {
        let value = event.target.value;
        props.userRole(value)
        console.log(value)

    }


    return (
        <div className="scheduletoolbar-container">
            {
            props.location === "sessions" ? (
                <>
                    <ul className="scheduletoolbar-ul sessions-toolbar">
                        <li>
                            <Batcher type='sessions'/>
                        </li>
                        <li>
              <select
                onChange={(e) => {
                  handleChangeFilterSession(e);
                }}
                name="subject"
                id="subject_id"
              >
                <option defaultValue={"--"}>Choose subject</option>
                {props.subjects.map((subject) => (
                  <option
                    key={subject.id}
                    value={subject.id + "_" + subject.name}
                  >
                    {subject.name}
                  </option>
                ))}
              </select>
            </li>
                        <li className="searchbar-container">
                            <span className="searchicon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </span>


                            <input type="text" placeholder="Search..." className="searchbar_toolbar" autoComplete="off"/>
                        </li>
                    </ul>
                </>
            ) : props.location === "events" ? (
                <>
                    <ul className="scheduletoolbar-ul events-toolbar">
                        <li>
                            <Batcher type='events'/>
                        </li>
                        <li onChange={usersSearchFilter} className="searchbar-container">
                            <span className="searchicon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </span>


                            <input type="text" placeholder="Search..." className="searchbar_toolbar" autoComplete="off"/>
                        </li>

                    </ul>
                </>
            ) : props.location === "users" ? (
                <>
                    <ul className="scheduletoolbar-ul users-toolbar">
                        <li>
                            <Batcher type='users'/>
                        </li>

                        <li>
                            <select onChange={userRoleFilter}
                                name="subjects"
                                id="subjects-select">
                                <option value="ALL">View all roles</option>
                                <option value="ADMIN">Admin</option>
                                <option value="STUDENT">Student</option>
                            </select>
                        </li>
                        <li onChange={usersSearchFilter} className="searchbar-container">
                            <span className="searchicon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </span>


                            <input type="text" placeholder="Search..." className="searchbar_toolbar" autoComplete="off"/>
                        </li>
                        
                    </ul>
                </>
            ) : props.location === "resources" ? (
                <>
                <ul className="scheduletoolbar-ul resources-toolbar">
                        <li onChange={usersSearchFilter} className="searchbar-container">
                            <span className="searchicon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </span>


                            <input type="text" placeholder="Search..." className="searchbar_toolbar" autoComplete="off"/>
                        </li>
                        
                    </ul></>
            ) : props.location === "institutions" ? (
                <>
                <ul className="scheduletoolbar-ul institutions-toolbar">
                        <li onChange={usersSearchFilter} className="searchbar-container">
                            <span className="searchicon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </span>


                            <input type="text" placeholder="Search..." className="searchbar_toolbar" autoComplete="off"/>
                        </li>
                        
                    </ul></>
            ) : props.location === "courses" ? (
                <>
                <ul className="scheduletoolbar-ul courses-toolbar">
                        <li onChange={usersSearchFilter} className="searchbar-container">
                            <span className="searchicon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </span>


                            <input type="text" placeholder="Search..." className="searchbar_toolbar" autoComplete="off"/>
                        </li>
                        
                    </ul></>
            ) : props.location === "subjects" ? (
                <>
                <ul className="scheduletoolbar-ul subjects-toolbar">
                        <li onChange={usersSearchFilter} className="searchbar-container">
                            <span className="searchicon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </span>


                            <input type="text" placeholder="Search..." className="searchbar_toolbar" autoComplete="off"/>
                        </li>
                        
                    </ul></>
            ) : props.location === "enroll" ? (
                <>
                <ul className="scheduletoolbar-ul enroll-toolbar">
                        <li onChange={usersSearchFilter} className="searchbar-container">
                            <span className="searchicon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </span>


                            <input type="text" placeholder="Search..." className="searchbar_toolbar" autoComplete="off"/>
                        </li>
                        
                    </ul></>
            ) : (
                <></>
            )
        } </div>
    );
}
