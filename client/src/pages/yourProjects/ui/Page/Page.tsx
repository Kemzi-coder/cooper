import {
	fetchUserProjectsThunk,
	ProjectCard,
	ProjectList,
	ProjectListPanel,
	selectProjects,
	useProjectsFetchUtils
} from "@entities/project";
import {withAuthProtection} from "@features/auth";
import {InfiniteScrollList} from "@features/infiniteScroll";
import {ProjectsSearchBar} from "@features/project/searchProjects";
import {ProjectsSortDropdown} from "@features/project/sortProjects";
import {AddToFavoritesButton} from "@features/user/addToFavorites";
import {useTypedDispatch, useTypedSelector} from "@shared/model";
import {Widget} from "@shared/ui";
import {ProjectActionsPanel} from "@widgets/ProjectActionsPanel";
import {useCallback, useEffect} from "react";

const Page = () => {
	const dispatch = useTypedDispatch();
	const {hasMore, isFetching, params, shouldRefetch} = useProjectsFetchUtils();

	const projects = useTypedSelector(selectProjects);

	useEffect(() => {
		dispatch(
			fetchUserProjectsThunk({
				page: 1,
				limit: params.limit,
				search: params.search,
				sort: params.sort
			})
		);
	}, [dispatch, params.limit, params.search, params.sort, shouldRefetch]);

	const handleFetchMore = useCallback(() => {
		dispatch(fetchUserProjectsThunk({...params, page: params.page + 1}));
	}, [dispatch, params]);

	return (
		<>
			<Widget mb="lg">
				<ProjectListPanel
					centerContentSlot={<ProjectsSearchBar />}
					rightContentSlot={<ProjectsSortDropdown />}
				/>
			</Widget>
			<Widget>
				<InfiniteScrollList
					onFetchMore={handleFetchMore}
					isFetching={isFetching}
					hasMore={hasMore}
				>
					<ProjectList>
						{projects.map(project => (
							<ProjectCard
								key={project.id}
								project={project}
								topPanelSlot={<ProjectActionsPanel project={project} />}
								actionsSlot={<AddToFavoritesButton projectId={project.id} />}
							/>
						))}
					</ProjectList>
				</InfiniteScrollList>
			</Widget>
		</>
	);
};

export default withAuthProtection(Page);
