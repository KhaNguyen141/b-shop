import { httpClient } from "./http-client";

export interface CategoryResponse {
  id: number;
  name: string;
  products: [{ id: number; name: string; price: number; description: string; imageFileName: string }];
}

class CategoryService {
  public async findAsync(id: number) {
    const { data } = await httpClient.get<CategoryResponse>(`/api/categories/${id}`);
    return data;
  }

  public async findAllAsync() {
    const { data } = await httpClient.get<CategoryResponse[]>("/api/categories");
    return data;
  }
}

export default new CategoryService();