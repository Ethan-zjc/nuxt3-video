/** @format */

export interface LinkItem extends ResBase {
    id: number;
    text: string;
    url: string;
}

export type BasicLinkAll = ResData<LinkItem[]>;

export interface BannerItem extends ResBase {
    id: number;
    img: string;
    title: string;
    url: string;
    urlType: string;
}

export type BasicBannerList = ResPage<BannerItem[]>;

export interface GenreItem {
    id: number;
    name: string;
}

export interface RankItem {
    id: number;
    title: string;
    columnValue: string;
    episodeCount?: any;
    theEnd: number;
    moviePv: MoviePv;
}

export interface ColumnItem {
    name: string;
    type: string;
    value: string;
    genres: GenreItem[];
    ranks: RankItem[];
    rows: MovieItem[];
}

export type WebIndex = ResData<ColumnItem[]>;
