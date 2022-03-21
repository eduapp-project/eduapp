import { useState } from "react";
import MenuHeader from "../menuHeader/MenuHeader";
import { FetchUserInfo } from "../../../hooks/FetchUserInfo";
import { GetCourses } from "../../../hooks/GetCourses";
import API from "../../../API";
import Loader from "../../../components/loader/Loader";
import "./ProfileSettings.css";
import GoogleLoginButton from "../../../components/googleLogin/googleLoginButton";
import MediaFix from "../../../utils/MediaFixer";
import NameCapitalizer from "../../../utils/NameCapitalizer";
import { updateUserImageOffline } from "../../../utils/OfflineManager";

export default function ProfileSettings() {
  let userInfo = FetchUserInfo(localStorage.userId);
  let courses = GetCourses();

  const [userName, setUserName] = useState(null);
  const [changeImage, setChangeImage] = useState(null);
  const [displayImageWarning, setWarnDisplay] = useState("none");
  const [imageWarningText, setWarningText] = useState(
    "Image size is larger than 2MB"
  );

  const closeProfileSettings = () => {
    document
      .getElementsByClassName("profileSettings_container")[0]
      .classList.add("profileSettings__hidden");
  };

  const changeImagePreview = (newPreview) => {
    const imageRegex = new RegExp("^.*(jpg|JPG|gif|GIF|png|PNG|jpeg|jfif)$");
    if (imageRegex.test(newPreview.target.files[0].name)) {
      setWarnDisplay("none");
      if (newPreview.target.files && newPreview.target.files[0]) {
        if (newPreview.target.files[0].size / 1000 / 1000 < 2) {
          document
            .getElementById("profileImage_preview")
            .setAttribute(
              "src",
              window.URL.createObjectURL(newPreview.target.files[0])
            );
          setWarnDisplay("none");
          setChangeImage(newPreview.target.files[0]);
        } else displayWarning("Image size is larger than 2MB");
      } else displayWarning("No provided image");
    } else displayWarning("File is not an image");
  };

  const displayWarning = (text) => {
    setWarningText(text);
    setWarnDisplay("block");
    setTimeout(() => {
      setWarnDisplay("none");
    }, 2000);
  };

  const getPosition = (string, subString, index) => {
    return string.split(subString, index).join(subString).length;
  };

  const commitChanges = (e) => {
    e.preventDefault();

    const newUserInfo = new FormData();
    if (changeImage != null) {
      newUserInfo.append("profile_image", changeImage);
    }

    if (userName != null) {
      newUserInfo.append("user_name", userName);
    }

    API.updateInfo(localStorage.userId, newUserInfo).then((res) => {
      let oldimg = MediaFix(userInfo.profile_image.url);
      let newimg = MediaFix(res.data.profile_image.url);

      if (
        oldimg.substring(getPosition(oldimg, "/", 8)) !==
        newimg.substring(getPosition(newimg, "/", 8))
      ) {
        updateUserImageOffline(newimg).then(() => {
          window.location.href = "/home";
        });
      } else window.location.href = "/home";
    });
  };

  return courses !== undefined ? (
    <div className="profileSettings_container profileSettings__hidden">
      <MenuHeader
        backTo={() => {
          closeProfileSettings();
        }}
        location={"PROFILE"}
      />
      <div className="profileSettings_wrapper">
        {userInfo && (
          <div className="userProfileImg">
            <img
              src={
                userInfo.profile_image != null
                  ? MediaFix(userInfo.profile_image.url)
                  : "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
              }
              alt={"user"}
              className="profileImage_preview"
              id="profileImage_preview"
              onClick={() => {
                document.getElementById("profileImage_upload").click();
              }}
            />
            <input
              type="file"
              name="profile_image"
              id="profileImage_upload"
              onChange={changeImagePreview}
            />
          </div>
        )}
        <div
          className="userName_input"
          style={{
            marginBottom: displayImageWarning === "none" ? "30px" : "0",
          }}
        >
          <input
            type="text"
            value={
              userName === null
                ? NameCapitalizer(
                    userInfo.user_name === undefined ? "" : userInfo.user_name
                  )
                : userName
            }
            onChange={(e) => {
              setUserName(
                e.target.value.includes(" ")
                  ? NameCapitalizer(e.target.value)
                  : e.target.value
              );
            }}
          />
        </div>
        <div
          className="file-size-warning"
          style={{ display: displayImageWarning }}
        >
          <p>{imageWarningText}</p>
        </div>
        <div className="commitChanges" onClick={commitChanges}>
          <span>SAVE CHANGES</span>
        </div>
        <GoogleLoginButton useType={"merge"} />
        {userInfo.isAdmin && (
          <div className="youareadmin">
            <p>ADMIN</p> <img src="/assets/admin.svg" alt="teacher" />
          </div>
        )}
        <div className="coursesContainer">
          <img className="coursesLogo" src="/assets/book.svg" alt="book" />
          <ul className="coursesList">
            {courses.map((course) => {
              return (
                <li key={course.course.id} className="courseItem">
                  <p>{course.course.name}</p>
                  {course.isTeacher ? (
                    <img src="/assets/teacher.svg" alt="teacher" />
                  ) : (
                    <img src="/assets/student.svg" alt="student" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}
