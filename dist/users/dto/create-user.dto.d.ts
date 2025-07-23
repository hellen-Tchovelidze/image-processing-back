declare class Address {
    homeNumber: number;
    city: string;
    street: string;
}
export declare class CreateUserDto {
    fullName: string;
    email: string;
    age: number;
    address: Address;
    password: string;
}
export {};
