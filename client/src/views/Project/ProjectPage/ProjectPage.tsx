import {InfoItem} from "@components/InfoList";
import {Loader, LoaderWrapper} from "@components/Loader";
import Page from "@components/Page/Page";
import {CategoryItem, CategoryList} from "@components/CategoryList";
import Text from "@components/Text/Text";
import Title from "@components/Title/Title";
import useTypedDispatch from "@hooks/useTypedDispatch";
import useTypedSelector from "@hooks/useTypedSelector";
import ProjectsService from "@services/projects/projects.service";
import {
	ProjectPageBlock,
	ProjectPageInfoList,
	ProjectPageInner,
	ProjectPageSection,
	ProjectsPageDate
} from "@views/Project/ProjectPage/ProjectPage.styled";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";

const ProjectPage = () => {
	const {id} = useParams();
	const dispatch = useTypedDispatch();
	const isLoading = useTypedSelector(state => state.projectState.isLoading);
	const project = useTypedSelector(state => state.projectState.project);
	const formattedDate = new Date(project?.creator?.createdDate).toLocaleString(
		undefined,
		{
			month: "short",
			day: "2-digit",
			year: "numeric"
		}
	);

	const itemsClient = [
		{id: 1, title: "country", value: "Ukraine"},
		{id: 2, title: "Projects posted", value: project?.creator?.projectsCount}
	];

	useEffect(() => {
		dispatch(ProjectsService.fetchOneById(id));
	}, [dispatch, id]);

	if (isLoading) {
		return (
			<LoaderWrapper>
				<Loader />
			</LoaderWrapper>
		);
	}

	return (
		<Page>
			<ProjectPageInner>
				<ProjectPageSection>
					<Title size="large">{project.title}</Title>
				</ProjectPageSection>
				<ProjectPageSection>
					<Text>{project.description}</Text>
				</ProjectPageSection>
				<ProjectPageSection>
					<ProjectPageInfoList>
						{itemsClient.map(item => (
							<InfoItem key={item.id} value={item.value} title={item.title} />
						))}
					</ProjectPageInfoList>
				</ProjectPageSection>
				<ProjectPageSection>
					<Title marginBottom="24px">Skills</Title>
					<CategoryList>
						{project.categories.map(category => (
							<CategoryItem key={category._id}>{category.name}</CategoryItem>
						))}
					</CategoryList>
				</ProjectPageSection>
				<ProjectPageSection>
					<ProjectPageBlock>
						<Title marginRight="12px">About the client</Title>
						<ProjectsPageDate>Member since {formattedDate}</ProjectsPageDate>
					</ProjectPageBlock>
					<ProjectPageInfoList>
						{itemsClient.map(item => (
							<InfoItem key={item.id} value={item.value} title={item.title} />
						))}
					</ProjectPageInfoList>
				</ProjectPageSection>
			</ProjectPageInner>
		</Page>
	);
};

export default ProjectPage;
