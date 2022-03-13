import React, { useState, useEffect } from "react";
import axios from "axios";
import MainChat from "./mainChat/MainChat";
import ACManager from "../../components/websockets/actioncable/ACManager";
import Loader from "../../components/loader/Loader";
import { CHAT_MESSAGES, CHAT_PARTICIPANTS } from "../../config";
import "./ChatMenu.css";

let acManager = new ACManager();
export default function ChatMenu() {
  const [isMobile, setIsMobile] = useState(false);
  const [chatTitle, setChatTitle] = useState(true);
  const [privateChats, setPrivateChats] = useState([]);
  const [groupChats, setGroupChats] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  const checkMediaQueries = () => {
    setInterval(() => {
      if (window.innerWidth < 1000) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }, 4000);
  };

  const openChat = (event) => {
    const chatBox = document.getElementById("chat-box");
    const chatMenu = document.getElementsByClassName("chat-menu-container")[0];
    const loader = document.getElementById("chat-loader");
    const navbar = document.getElementsByTagName("header")[0];
    const bottombtns = document.getElementById("bottom-navigator");

    chatMenu.style.display = "none";
    navbar.style.display = "none";
    bottombtns.style.display = "none";
    loader.style.display = "block";
    loader.style.opacity = "1";

    if (event.target.nodeName.toLowerCase() !== "li") {
      let temp = event.target;
      while (temp.nodeName.toLowerCase() !== "li") temp = temp.parentElement;
      event.target = temp;
    }

    setChatTitle(event.target.childNodes[1].childNodes[0].innerHTML);
    acManager.chatCode = event.target.id;
    acManager.generateChannelConnection(acManager.chatCode).then(() => {
      axios
        .get(
          CHAT_MESSAGES +
            "?chat_base_id=" +
            event.target.id[event.target.id.length - 1]
        )
        .then((msgs) => {
          setChatMessages(msgs.data);
          setTimeout(() => {
            setTimeout(() => {
              let messageBox = document.getElementsByClassName(
                "main-chat-messages-container"
              )[0];
              if (messageBox.childNodes.length !== 0) {
                messageBox.childNodes[
                  messageBox.childNodes.length - 1
                ].scrollIntoView(true);
              }
              setTimeout(() => {
                loader.style.opacity = "0";
                setTimeout(() => {
                  chatBox.style.display = "block";
                  loader.style.display = "none";
                }, 200);
              }, 300);
            }, 200);
          }, 100);
        });
    });
  };

  const closeChat = () => {
    acManager.closeConnection();
    const chatBox = document.getElementById("chat-box");
    const chatMenu = document.getElementsByClassName("chat-menu-container")[0];
    const loader = document.getElementById("chat-loader");
    const navbar = document.getElementsByTagName("header")[0];
    const bottombtns = document.getElementById("bottom-navigator");

    loader.style.display = "block";
    loader.style.opacity = "1";

    setTimeout(() => {
      setTimeout(() => {
        chatBox.style.display = "none";
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.display = "none";
          navbar.style.display = "block";
          bottombtns.style.display = "block";
          chatMenu.style.display = "block";
        }, 300);
      }, 200);
    }, 200);
  };

  const getUserChats = async () => {
    let tempPrivate = [];
    let tempGroups = [];
    axios
      .get(CHAT_PARTICIPANTS + "?user_id=" + localStorage.userId)
      .then((r) => {
        if (Array.isArray(r.data)) {
          for (let chat of r.data) {
            if (chat.chat_base.isGroup) tempGroups.push(chat);
            else tempPrivate.push(chat);
          }
        } else {
          if (r.data.chat_base.isGroup) tempGroups.push(r.data);
          else tempPrivate.push(r.data);
        }
        setPrivateChats(tempPrivate);
        setGroupChats(tempGroups);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  useEffect(() => {
    acManager.closeConnection();
    checkMediaQueries();

    getUserChats().then(() => {});

    if (window.innerWidth < 1000) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return (
    <>
      <div id="chat-loader">
        <Loader />
      </div>
      <div id="chat-box">
        <MainChat
          chatName={chatTitle}
          closeHandler={() => {
            closeChat();
          }}
          ActionCableManager={acManager}
          messages={chatMessages}
        />
      </div>
      <div className="chat-menu-container">
        <div className="chat-search-container">
          <form action="">
            <input type="text" />
            <div className="chat-search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"></path>
              </svg>
            </div>
          </form>
        </div>

        <div className="chats-container">
          {groupChats.length !== 0 ? (
            <div className="chat-group-container">
              <h2>Groups</h2>
              <ul data-testid="group-chat-list">
                {groupChats.map((gChats) => {
                  return (
                    <li
                      onClick={openChat}
                      id={`group-chat-${gChats.chat_base.id}`}
                    >
                      <img
                        className="chat-icon"
                        src="https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
                        alt="Chat User Icon"
                      />
                      <div className="chat-info chat-idle-state">
                        <h2 className="chat-name">
                          {gChats.chat_base.chat_name}
                        </h2>
                        {/* <p className="chat-writing">Equisde is writing...</p> */}
                      </div>
                      {/* <p className="chat-pending-messages">
                        <span>20</span>
                      </p> */}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
          {privateChats.length !== 0 ? (
            <div className="chat-user-container">
              <h2>Users</h2>
              <ul data-testid="private-chat-list">
                {privateChats.map((pChats) => {
                  return (
                    <li
                      onClick={openChat}
                      id={`private-chat-${pChats.chat_base.id}`}
                    >
                      <img
                        className="chat-icon"
                        src="https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
                        alt="Chat User Icon"
                      />
                      <div className="chat-info chat-idle-state">
                        <h2 className="chat-name">
                          {pChats.chat_base.chat_name}
                        </h2>
                        {/* <p className="chat-writing">Writing...</p> */}
                      </div>
                      {/* <p className="chat-pending-messages">
                        <span>20</span>
                      </p> */}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
          <div className="chat-add-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              className="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
