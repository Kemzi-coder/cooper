import {HeaderName} from "../../../common/constants";
import {
	ApiCalculator,
	GetManyParams,
	PaginationParams
} from "../../../common/lib";
import FavoriteProjectService from "./service";

class FavoriteProjectController {
	static async getAll(req, res, next) {
		try {
			const {id} = req.user;
			const {page, limit} = new PaginationParams(req.query);
			const {search, sort} = new GetManyParams(req.query);
			const offset = ApiCalculator.calcOffset(page, limit);

			const {projects, totalCount} = await FavoriteProjectService.getAll(id, {
				limit,
				offset,
				sort,
				search
			});

			const totalPages = ApiCalculator.calcTotalPages(totalCount, limit);
			res.set({
				[HeaderName.PAGE]: page,
				[HeaderName.TOTAL_COUNT]: totalCount,
				[HeaderName.TOTAL_PAGES]: totalPages
			});
			res.json(projects);
		} catch (e) {
			next(e);
		}
	}

	static async add(req, res, next) {
		try {
			const {id} = req.user;
			const {projectId} = req.params;

			const user = await FavoriteProjectService.add(id, projectId);

			res.json(user);
		} catch (e) {
			next(e);
		}
	}

	static async remove(req, res, next) {
		try {
			const {id} = req.user;
			const {projectId} = req.params;

			const user = await FavoriteProjectService.remove(id, projectId);

			res.json(user);
		} catch (e) {
			next(e);
		}
	}
}

export default FavoriteProjectController;
