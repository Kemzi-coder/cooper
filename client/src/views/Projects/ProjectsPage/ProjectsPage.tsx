import InfiniteScrollList from "@components/InfiniteScrollList/InfiniteScrollList";
import Page from "@components/Page/Page";
import {ProjectList} from "@components/ProjectList";
import useProjects from "@hooks/useProjects";
import useTypedDispatch from "@hooks/useTypedDispatch";
import ProjectsService from "@services/projects/projects.service";
import {YOUR_PROJECTS_ROUTE} from "@utils/constants/routeNames";
import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import ProjectsHeader from "../ProjectsHeader/ProjectsHeader";
import {ProjectsPageInner} from "./ProjectsPage.styled";

const ProjectsPage = () => {
	const dispatch = useTypedDispatch();
	const location = useLocation();

	const {
		isLoading,
		isLoadingMore,
		projects,
		page,
		sort,
		search,
		limit,
		totalCount
	} = useProjects();

	const handleLoadMore = () =>
		dispatch(
			ProjectsService.fetchMore({
				page: page + 1,
				limit,
				search,
				sort: sort.value
			})
		);

	useEffect(() => {
		if (location.pathname === YOUR_PROJECTS_ROUTE) {
			dispatch(
				ProjectsService.fetchByAuth({page: 1, sort: sort.value, search, limit})
			);
		} else {
			dispatch(
				ProjectsService.fetchAll({page: 1, sort: sort.value, search, limit})
			);
		}
	}, [dispatch, limit, location.pathname, search, sort.value]);

	return (
		<Page>
			<ProjectsPageInner>
				<ProjectsHeader />
				<InfiniteScrollList
					hasMore={page < Math.ceil(totalCount / limit)}
					isLoading={isLoadingMore}
					onLoadMore={handleLoadMore}
				>
					<ProjectList isLoading={isLoading} projects={projects} />
				</InfiniteScrollList>
			</ProjectsPageInner>
		</Page>
	);
};

export default ProjectsPage;
