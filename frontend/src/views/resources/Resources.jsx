import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import BottomButtons from "../../components/bottomButtons/bottomButtons";
import ResourcesModal from "../../components/modals/ResourcesModal";
import OpenedResource from "./openedResource/OpenedResource";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { GetCourses } from '../../hooks/GetCourses'
import DarkModeChanger from '../../components/DarkModeChanger'
import CourseSelector from "../../components/courseSelector/CourseSelector";
import { FetchUserInfo } from "../../hooks/FetchUserInfo";
import "./Resources.css";

export default function Resources(props) {
	const [ItsMobileDevice, setItsMobileDevice] = useState(false);
	const [resourcesFilter, setResourcesFilter] = useState("");
	const [resources, setResources] = useState([]);
	const [courseSelected, setCourseSelected] = useState('');

	let userInfo = FetchUserInfo(localStorage.userId);
	let courses = GetCourses();

	const checkMediaQueries = () => {
		setInterval(() => {
			if (window.matchMedia("(max-width: 1100px)").matches) {
				setItsMobileDevice(true);
			} else {
				setItsMobileDevice(false);
			}
		}, 4000);
	};

	const getResources = async (id) => {
		console.log(id, 'resources')

		const resources__url = `http://localhost:3000/resources?id=${id}`;
		await axios.get(resources__url).then((res) => {
			res.data.map((x) => {
				if (x.firstfile != null) {
					x.firstfile = x.firstfile.url;
				}
				if (x.secondfile != null) {
					x.secondfile = x.secondfile.url;
				}
				if (x.thirdfile != null) {
					x.thirdfile = x.thirdfile.url;
				}
			});
			setResources(res.data)

			console.log(resources)
		})
	};

	useEffect(() => {
		checkMediaQueries();
		DarkModeChanger(localStorage.getItem('darkMode'))
		//First check
		if (window.matchMedia("(max-width: 1100px)").matches) {
			setItsMobileDevice(true);
		} else {
			setItsMobileDevice(false);
		}
	}, []);

	const openResource = (e) => {
		e.preventDefault();
		console.log(e.target.id);
		document
			.getElementById(`resource__${e.target.id}__opened`)
			.classList.remove("openedResource__hidden");
		setTimeout(() => {
			document.getElementsByTagName("header")[0].style.display = "none";
		}, 75);
	};

	const createResource = () => {
		document.getElementsByClassName(
			"resources__createResourceModal"
		)[0].style.display = "flex";
	};

	const handleSearchResources = (e) => {
		setResourcesFilter(e.target.value);
	};

	const handleChangeSelector = (id) => {
		console.log(id)
		setCourseSelected(id)
		getResources(id)
	};

	return courses && userInfo ? (
		<>
			<div className="resources-main-container">
				<Navbar mobile={ItsMobileDevice} location={"resources"} />
				<section
					className={ItsMobileDevice ? "mobileSection" : "desktopSection"}
				>
					<CourseSelector handleChangeCourse={handleChangeSelector} />
					<div className="resources-toolbar">
						<div className="resourcesSearchBar">
							<form action="">
								<input type="text" onChange={handleSearchResources} />
								<div className="searchInputIcon">
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
						{courseSelected && (courses.filter(course => course.course_id === courseSelected)[0].isTeacher
							|| userInfo.isAdmin)
							?
							<div className="resources__addNewResource" onClick={createResource}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
									<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
								</svg>
							</div>
							: ''}
					</div>
					<div className="resources-container">
						{resources.length > 0 ? (
							<ul>
								{resources.map((data) => {
									if (
										data.name
											.toLowerCase()
											.includes(resourcesFilter.toLowerCase()) ||
										resourcesFilter === ""
									) {
										return (
											<>
												<OpenedResource data={data} courseSelected={courseSelected} />
												<li
													id={"res" + data.name + courseSelected}
													className="resources resourceitem"
													onClick={openResource}
												>
													<div
														id={"res" + data.name + courseSelected}
														className="resource-name-container"
													>
														<span
															id={"res" + data.name + courseSelected}
															className="resource-name"
														>
															{data.name}
														</span>
													</div>
													<div className="resourceInfo-container">
														<div className="resourceInfo__creationDate">
															<div className="resourceInfo__creationDate__icon">
																<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16">
																	<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
																</svg>
															</div>
															<div className="resourceInfo__creationDate__content">
																<div className="resourceInfo__cretionDate_date">
																	{data.created_at.split("T")[0]}
																</div>
																<div className="resourceInfo__cretionDate_time">
																	{data.created_at.split("T")[1].split(".")[0]}
																</div>
															</div>
														</div>
														<div className="resourceInfo__createdBy">
															<div className="resourceInfo__createdBy__icon">
																<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
																	<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
																</svg>
															</div>
															<div className="resourceInfo__createdBy__content">
																{data.createdBy}
															</div>
														</div>
													</div>
												</li>
											</>
										);
									}
								})}
							</ul>
						) : (
							<div id="courseNotSelectedeAdvisor">
								<h3>You must select a course</h3>
							</div>
						)}
					</div>
				</section>
				<ResourcesModal />
				<BottomButtons mobile={ItsMobileDevice} location={"resources"} />
			</div>
		</>
	) : (
		<Loader />
	);
}