export interface Category {
    id: number;
    nameCategory: string;
}
export interface Product {
    id: number;
    name: string;
    img: string;
    categoryId: number;
    price: number;
}
export interface User {
    id: number;
    username: string;
    password: string;
    fullName: string;
    role: "USER" | "ADMIN";
}
