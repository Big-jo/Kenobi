export interface IComment {
    id?: number;
    episodeId: number;
    anonymous: boolean;
    ip_address: string | string[] | undefined;
    comment: string;
    createdAt?: Date;
    comments_count?: number;
}