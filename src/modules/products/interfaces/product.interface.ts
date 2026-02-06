import type { User } from "@/modules/auth/interfaces/user.interface";


export interface Product {
    id:          number;
    name:        string;
    description: string;
    images:      string[];
    price:       number;
    stock:       number;
    category:    Category;
}

export interface Category {
    id:          number;
    name:        string;
    description: string;
}



