/**
 * 用户类别
 * Author:Shier
 * createTime:12:44
 */
export type UserType = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string; // 用户头像
    profile?: string;
    gender?: number; // 性别 0： 女
    phone: string;
    email: string;
    userStatus: number; // 用户状态 '状态 0 - 正常'
    userRole: number; // '用户角色 0 - 普通用户 1 - 管理员'
    planetCode: string; // 星球编号
    tags: string[]; // 标签
    createTime: Date; // 创建时间
    hasJoinNum?: number;
};
