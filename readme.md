<div align ='center'><img src="https://camo.githubusercontent.com/88ebb3d3a22eaccf6758b9eee02d1ef1ce49230642f86da244f4270773d59004/687474703a2f2f6564756170702d70726f6a6563742e65752f77702d636f6e74656e742f75706c6f6164732f323032312f30332f4c6f676f2d4564754170702d312d313530783135302e706e67" alt="logo">
</div>

- [About the project](#about-the-project)
- [Backend](#backend-information)
- [Frontend](#frontend-information)
- [Built with](#built-with)
- [User Requirements](#user-requirements)
- [API Documention](#api-documention)
- [Use Cases](#use-cases)
- [Usability](#usability)


</div>
<h1 align='center'>About the project</h1>
<div >
     Eduapp emerges after the covid 19 pandemic ,as the answer to the challenges that this entails.
     <br/>
     It's an european project , co-funded by erasmus+ programme
     <br/>
          <h1>Partners</h1>
          <p>Fundatia Ecologica Green , Romania , Instituto Politécnico de Santarém , Portugal , Stichting Landstede , Netherlands , SOSU OSTJYLLAND , Denmark and IES El Rincón , Spain</p>
          <h1>Objectives</h1>
          <p>Faciliate and increase the communication between school, students and teachers by developing an application , EduApp , free and open source , customised for each partner school.</p>
   </div>
  
<h1 align='center'>Backend information</h1>
<p>Eduapp has used pgAdmin as a database with postgreSQL and ruby on rails was used from the software.</p>
<h3>Diagram E/R</h3>
<div ><img src="./Documentation/Diagram/DiagramER.png" alt="diagramER">
</div>
<h3>Diagram UML</h3>
<div ><img src="./Documentation/Diagram/DiagramUML.png" alt="diagramUML">
</div>
<h3>Relational diagram:</h3>
<div>
    <h4>User and Annotations</h4>
    <p>Annotation(annotation_id, annotation_description, annotation_start, annotation_end )</p>
    <p>USER(user_id,name, image,rol,email,password)</p>
    <p>HAVE(user_id*, annotation_id*)</p>
    <h4>User and session</h4>
    <p>USER(user_id,name, image,rol,email,password)</p>
    <p>SESSION(session_id, session_name, date, streaming_platform, resoruces_platform, session_chat_id)</p>
    <p>PARTICIPATES(user_id*, session_id*)</p>
    <h4>User and Course</h4>
    <p>COURSER(couse_id, course_name, couse_participants)</p>
    <p>USER(user_id,name, image,rol,email,password)</p>
    <p>HAVE(couser_id*, user_id*)</p>
     <h4>Course and Resources</h4>
    <p>COURSE(course_id, course_name, course_participants)</p>
     <p>RESOURCES(resources_id, resources_name, resources_description, id_course*)</p>
     <h4>Resources and files</h4>
     <p>RESOURCES(resources_id, resources_name, resources_description, id_course*)</p>
     <p>FILES(files_id, files_content, id_resources*)</p>
     <h4>Course, messages and course chat</h4>
     <p>COURSER(course_id, course_name, course_participants)</p>
     <p>MESSAGES(messages_id, writer_at, message_text, user_id)</p>
     <p>COURSE_CHAT(course_chat_id, message_id*,chat_image,course_name,course_id*)</p>    
</div>

<h3>Explanation of the diagrams contents:</h3>
<p>-User table is used to register.</p>
<p>-Annotations table is used as a calendar for events to be stored.</p>
<p>-Session table is used to know when you have classes and thei information.</p>
<p>-Courser table is used to know the students of a courser.</p>
<p>-Courser chat table is used to create a chat for each courser or subject.</p>
<p>-Messages table is used to save who send the messages and the contents.</p>
<p>-Resources table are the documents or information about sessions.</p>
<p>-Files table is used to save the documents.</p>
<h3>ORM</h3>
<p></p>
<h3>How to install and run</h3>
<p> First, you must install the programs. Now you have to clone the project and used this commands.</p>
<p>To clone, use:</p>

```bash
git clone https://github.com/eduappdevs/eduapp
cd eduapp/backend/eduapp_db/
bundle install
```

<p>After using these commands, you need to look for the folder config and find database.yml, you need to change the password to the password of the pgAdmin</p>

<p>To have values in the database enter the following command:</p>

```bash
rails db:migrate
rails db:seed
```

<p>After you have followed these steps, you can start the server with:</p>

```bash
rails s
```

<p>To stop the server you have to use CTRL + C.</p>
<h1 align='center'>Frontend information:</h1>
<p>This is how eduapp started but some visual changes were made.</p>
<details >
<summary>Prototype</summary>
<div ><img src="./prototipo/eduapp-1.png" alt="prototipo">
</div>
<div ><img src="./prototipo/Eduapp-2.png" alt="prototipo">
</div>
<div ><img src="./prototipo/Eduapp-3.png" alt="prototipo">
</div>
</details>
<h3>How to install and run</h3>
<p> First, you must install the programs. Now you have to clone the project and used this commands.</p>
<p>To clone, use:</p>

```bash
git clone https://github.com/eduappdevs/eduapp
cd eduapp/frontend
npm start
```

<p>To stop the server you have to use CTRL + C.</p>

<h1 >Tech stack</h1>
<div>
    <a href="https://rubyonrails.org">
        <img src="https://img.shields.io/badge/rails-%23CC0000.svg?style=for-the-badge&logo=ruby-on-rails&logoColor=white" alt="Rails"/></a>
   </div>
  
<div >        
     <a href="https://reactjs.org">
            <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React"/></a>
   </div>
     
<div >
       <a href="#">
            <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="Javascript"/>
     </a>
   </div>
     
<div >
     <a href="#">
            <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="Html"/>
     </a>
   </div>
     
<div >
     <a href="#">
            <img src="https://img.shields.io/badge/Adobe%20XD-470137?style=for-the-badge&logo=Adobe%20XD&logoColor=#FF61F6" alt="AdobeXD"/>
     </a>
   </div>
     
<div >
     <a href="#">
            <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="Github"/>
     </a>
   </div>
     
     
<div>
     <a href="#">
            <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS"/>
     </a>
   </div>

<h1>User Requirements</h1>
<p>Eduapp has three type of user, it depends on the type your user has more functions or not.</p>
<h3>1. Students user are able to:</h3>
<p>View your account's calendar, resources, upcoming sessions, and chats.</p>
<h3>2. Teacher user are able to: </h3>
<p>They have the same functionality as students, but they can edit, delete, and create events in calendars, resources, and remove students from their classes.</p>
<h3>3. Secretary user are able to: </h3>
<p>They have control over the users of their school.</p>
<h3>4. Administrator user are able to:</h3>
<p>They have the same functionality as secretary, but they has full control over the user of the secretary  of the educational center. </p>

<h1>API Documention<img  width="80" height="35" src="https://miro.medium.com/max/802/1*dLWPk_rziSpWhPx1UWONbQ@2x.png"/> </h1>

<a align="left" href="https://documenter.getpostman.com/view/17853818/UVR5qUPn">Resources Database Table</a>
<br/>
<a align="left" href="https://documenter.getpostman.com/view/17853818/UVR5qUPr">User Info Database Table</a>
<br/>
<a align="left" href="https://documenter.getpostman.com/view/17931022/UVR5qUU8">Session Database Table</a>
<br/>
<a align="left" href="https://documenter.getpostman.com/view/17853818/UVR5qUUB"> User Auth Database Table</a>

<h1>Use Cases</h1>
<img src="./Documentation/UseCases.png" />

<h1>Usability</h1>
<p>We have used orange and blue as principal colors , then we use a different gray scales and white</p>
<p>As text font we select 'Consolas' font , and usually using the bolder font weight</p>
<img height='400' src='./Documentation/Usability/colorsExample.png'>
<p>In the sign up form , we add a advisor in the passwords fields , which gives you feedback if the password it's empty or the confirmation password does not match with the previously written password.</p>
<img height='400' src='./Documentation/Usability/signUpForm.png'>
<img height='400' src='./Documentation/Usability/signUpForm2.png'>
<p>Before the password its written and the confirmation password matches , you aren't able to sign up the account and the submit button were disabled , after the confirmation matches it will be enabled and you can submit and sign up the account.</p>
<img height='400' src='./Documentation/Usability/signUpForm3.png'>
<p>In desktop , this is how it looks</p>
<img height='400' src='./Documentation/Usability/signUpFormDesktop.png'>
<p>Mobile view - here you can see how the navbar looks , with icon buttons in the bottom of the page</p>
<img height='400' src='./Documentation/Usability/mobilePreview.png'>
<p>Desktop view - here you can see how the navbar looks , with text buttons in the top of the page</p>
<img height='400' src='./Documentation/Usability/desktopPreview.png'>
<p>Eduapp have a dark mode</p>
<img height='400' src='./Documentation/Usability/darkModeBefore.png'>
<img height='400' src='./Documentation/Usability/darkModeAfter.png'>
<p>Then the page looks like this</p>
<img height='400' src='./Documentation/Usability/darkModeResources.png'>
<p>When page were loading , an animation will be on screen</p>
<p>This it's a frame of it , this hole animation was created in pure css.</p>
<img height='400' src='./Documentation/Usability/loadingAnimationFrame.png'>
