/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Link {
    name: string;
    url: string;
}

export interface Format {
    src: string;
    background: string | undefined;
    format: string;
    height?: number;
    width?: number;
    size: number;
}

export interface Logo {
    theme: string;
    formats: Format[];
    tags: string[];
    type: string;
}

export interface Color {
    hex: string;
    type: string;
    brightness: number;
}

export interface Font {
    name: string;
    type: string;
    origin: string;
    originId: string;
    weights: any[];
}

export interface Image {
    formats: Format[];
    tags: string[];
    type: string;
}

export interface Industry {
    score: number;
    id: string;
    name: string;
    emoji: string;
    parent: Industry | undefined;
    slug: string;
}

export interface Location {
    city: string;
    country: string;
    countryCode: string;
    region: string;
    state: string;
    subregion: string;
}

export interface Company {
    employees: number;
    foundedYear: number;
    industries: Industry[];
    kind: string;
    location: Location;
}

export interface BrandInfo {
    id: string;
    name: string;
    domain: string;
    claimed: boolean;
    description: string;
    longDescription: string;
    links: Link[];
    logos: Logo[];
    colors: Color[];
    fonts: Font[];
    images: Image[];
    qualityScore: number;
    company: Company;
    isNsfw: boolean;
}

export interface ErrorResponse {
    message: string;
}

export async function fetchBrandInfo(domainOrId: string, bearerToken: string): Promise<BrandInfo | ErrorResponse> {
    const url = `https://api.brandfetch.io/v2/brands/${domainOrId}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    return data;
}