// SCHEDULE

// Sessions
export function getSessionFields(lang) {
  languageDetect(lang);
  return [
    ["id", lang.code],
    ["session_name", lang.name],
    ["streaming_platform", lang.streaming],
    ["resources_platform", lang.resources],
    ["session_chat_id", lang.chatLink],
    ["subject_name", lang.subjects],
  ];
}

export function parseSessionFields(s, field) {
  switch (field) {
    case "subject_name":
      return s.subject.name;
    default:
      return s[field];
  }
}

// Events
export function getEventFields(lang) {
  languageDetect(lang);
  return [
    ["id", lang.code],
    ["annotation_title", lang.title],
    ["annotation_description", lang.description],
    ["event_author", lang.author],
    ["subject_name", lang.subjects],
  ];
}

export function parseEventFields(e, field) {
  switch (field) {
    case "event_author":
      return e.user.email;
    case "subject_name":
      return e.subject.name;
    default:
      return e[field];
  }
}

// USERS

// Users
export function getUserFields(lang) {
  languageDetect(lang);
  return [
    ["user_id", lang.userId],
    ["user_name", lang.name],
    ["email", lang.email],
    ["role", lang.userRole],
  ];
}

export function parseUserFields(u, field) {
  switch (field) {
    case "user_id":
      return u.user.id;
    case "email":
      return u.user.email;
    case "role":
      return u.user_role.name;
    default:
      return u[field];
  }
}

// Enrollment
export function getEnrollmentFields(lang) {
  languageDetect(lang);
  return [
    ["user_email", lang.email],
    ["course_id", lang.course],
  ];
}

export function parseEnrollmentFields(er, field) {
  switch (field) {
    case "user_email":
      return er.user.email;
    case "course_id":
      return er.course.name;
    default:
      return er[field];
  }
}

// Teachers
export function getTeacherFields(lang) {
  languageDetect(lang);
  return [
    ["teacher_name", lang.teacherName],
    ["subject_name", lang.subjectName],
  ];
}

export function parseTeacherFields(t, field) {
  switch (field) {
    case "teacher_name":
      return t.user.user_name;
    case "subject_name":
      return t.subject.name;
    default:
      return t[field];
  }
}

// MANAGEMENT

// Courses
export function getCourseFields(lang) {
  languageDetect(lang);
  return [
    ["id", lang.code],
    ["name", lang.name],
  ];
}

// Subjects
export function getSubjectFields(lang) {
  languageDetect(lang);
  return [
    ["id", lang.code],
    ["subject_code", lang.subjectCode],
    ["name", lang.name],
    ["course_name", lang.linkedCourse],
  ];
}

export function parseSubjectFields(s, field) {
  switch (field) {
    case "course_name":
      return s.course.name;
    default:
      return s[field];
  }
}

// Resources
export function getResourceFields(lang) {
  languageDetect(lang);
  return [
    ["id", lang.code],
    ["name", lang.name],
    ["author", lang.author],
    ["subject_name", lang.subjects],
  ];
}

export function parseResourceFields(r, field) {
  switch (field) {
    case "author":
      return r.user.email;
    case "subject_name":
      return r.subject.name;
    default:
      return r[field];
  }
}

// HELPER METHODS
function languageDetect(language) {
  if (!language) throw new Error("No language passed to fields.");
}

export function genericParser(x, field) {
  return x[field];
}
