const baseUrl = "http://localhost:3001";

export const api ={
    getCategories: async (): Promise<any> => {
        const response = await fetch(`${baseUrl}/categories`)
        return response.json();
    },
    getProducts: async (): Promise<any> => {
        const response = await fetch(`${baseUrl}/products`)
        return response.json();
    },
    getProductByCategory: async (categoryId: string,start:number): Promise<any> => {
        const response = await fetch(`${baseUrl}/products?categoryId=${categoryId}&_start=${start}&_end=${start+8}`)
       return response.json();
    },

    getTotalPage: async (categoryId: string): Promise<any> => {
        const response = await fetch(`${baseUrl}/products?categoryId=${categoryId}`)
        return response.json();
    },
    getProductAndDetailById: async (productId: string): Promise<any> => {
        const response = await fetch(`${baseUrl}/products/${productId}?_embed=detailProducts`)
        return response.json();
    }
}
