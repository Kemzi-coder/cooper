import {CategoryDbService} from "../../common/database/services";
import {CategoryDto} from "../../common/dtos";

class CategoryService {
	static async getAll() {
		const categories = await CategoryDbService.getAll();
		return categories.map(c => new CategoryDto(c));
	}

	static async create(category) {
		const createdCategory = await CategoryDbService.create(category);
		return new CategoryDto(createdCategory);
	}
}

export default CategoryService;
