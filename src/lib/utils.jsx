export const isUserAllowed = (user, roles) => { 
    // cấp tất cả quyền cho owner
    if (user.role === 'owner') {
        return true
    }

    // kiểm tra role của user trong trường hợp không phải owner
    const userRoles = Array.isArray(roles) ? roles : [roles]

    return userRoles.some((r) => user.role === r)
}