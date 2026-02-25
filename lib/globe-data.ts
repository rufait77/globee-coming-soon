// Convert lat/lng to 3D coordinates on a unit sphere
export function latLngToVector3(lat: number, lng: number, radius: number = 1): [number, number, number] {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return [x, y, z];
}

export interface CityNode {
    name: string;
    lat: number;
    lng: number;
}

export interface ArcConnection {
    from: number; // index into cities array
    to: number;
}

export const cities: CityNode[] = [
    { name: "New York", lat: 40.7128, lng: -74.006 },
    { name: "London", lat: 51.5074, lng: -0.1278 },
    { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
    { name: "Sydney", lat: -33.8688, lng: 151.2093 },
    { name: "Dubai", lat: 25.2048, lng: 55.2708 },
    { name: "Singapore", lat: 1.3521, lng: 103.8198 },
    { name: "São Paulo", lat: -23.5505, lng: -46.6333 },
    { name: "Paris", lat: 48.8566, lng: 2.3522 },
    { name: "Mumbai", lat: 19.076, lng: 72.8777 },
    { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
    { name: "Seoul", lat: 37.5665, lng: 126.978 },
    { name: "Cape Town", lat: -33.9249, lng: 18.4241 },
    { name: "Toronto", lat: 43.6532, lng: -79.3832 },
    { name: "Berlin", lat: 52.52, lng: 13.405 },
    { name: "Bangkok", lat: 13.7563, lng: 100.5018 },
    { name: "Cairo", lat: 30.0444, lng: 31.2357 },
    { name: "Nairobi", lat: -1.2921, lng: 36.8219 },
    { name: "Mexico City", lat: 19.4326, lng: -99.1332 },
];

export const arcs: ArcConnection[] = [
    { from: 0, to: 1 },   // NYC → London
    { from: 1, to: 7 },   // London → Paris
    { from: 1, to: 4 },   // London → Dubai
    { from: 4, to: 8 },   // Dubai → Mumbai
    { from: 8, to: 5 },   // Mumbai → Singapore
    { from: 5, to: 2 },   // Singapore → Tokyo
    { from: 2, to: 10 },  // Tokyo → Seoul
    { from: 3, to: 5 },   // Sydney → Singapore
    { from: 0, to: 9 },   // NYC → LA
    { from: 0, to: 6 },   // NYC → São Paulo
    { from: 7, to: 13 },  // Paris → Berlin
    { from: 1, to: 15 },  // London → Cairo
    { from: 15, to: 16 }, // Cairo → Nairobi
    { from: 11, to: 16 }, // Cape Town → Nairobi
    { from: 0, to: 12 },  // NYC → Toronto
    { from: 9, to: 17 },  // LA → Mexico City
    { from: 14, to: 5 },  // Bangkok → Singapore
    { from: 4, to: 16 },  // Dubai → Nairobi
];
