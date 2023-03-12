/**
 * 用户类别
 * Author:Shier
 * createTime:12:44
 */
//用户类型
export type UserType = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    gender: number;
    phone: string;
    contactInfo: string;
    profile?: string;
    userStatus: number;
    userRole: number;
    planetCode: string;
    email?: string,
    tags: string[];
    createTime: Date;
};
