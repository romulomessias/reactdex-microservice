export default class GeoLocation {
    lat: number
    lng: number
    
    get normalizated(): string {
        return this.lat.toString() + this.lng.toString();
    }
}