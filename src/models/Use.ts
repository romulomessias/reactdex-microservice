import AdressModel from "./Address";
import Address from "./Address";
import Company from "./Company";

export default class User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}