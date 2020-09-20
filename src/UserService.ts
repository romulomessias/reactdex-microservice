import axios, { AxiosInstance } from 'axios';
import User from './models/Use';
import { injectable } from 'inversify';
import Address from './models/Address';

@injectable()
export default class UserService {
    private readonly axiosClient: AxiosInstance;

    constructor () {
        this.axiosClient = axios.create({
            baseURL: 'https://jsonplaceholder.typicode.com'
        })
    }

    async getAllWebsites (): Promise<string[]> {
        const users = await this.getAllUsers();
        return users.map( it => it.website );
    }

    async getCompactModel ()  {
        const users = await this.getAllUsers();
        return users.map(it => {
            return {
                name: it.name,
                email: it.email,
                company: it.company.name
            }
        })
        .sort( (first, second) => first.name.localeCompare(second.name))
    }

    async filterByAddress (value: string): Promise<User[]> {
        const users = await this.getAllUsers();
        return users.filter(it => Address.normalizated(it.address).includes(value.toUpperCase()))
    }

    private  async getAllUsers(): Promise<User[]> {
        const result = await this.axiosClient.get('/users');
        const users: User[] = result.data.map(it => Object.assign(new User(), it));
        return users;
    }
}