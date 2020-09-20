import GeoLocation from "./GeoLocation";

export default class Address {
    street: string  
    suite: string
    city: string
    zipcode: string
    geo: GeoLocation

    static normalizated(address: Address): string {
        const tmp = address.street + address.suite + address.city + address.zipcode
        return tmp.toUpperCase()
    }
}