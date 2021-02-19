const DataLoader = require('dataloader');
const roleRepo = require('../db/repo/role-repo')


const batchUserIds = ids => {
    console.log('ids', ids)

    // Get all roles
    const roles = roleRepo().getRoles()
    const userRoles = roleRepo().getUsersRoles()

    // Array of arrays
    const mappedRolesByIds = ids.map(id => userRoles.filter(ur => ur.userId === Number(id)).map(r => r.roleId))

    const groupedById = mappedRolesByIds.map(array => roles.filter(r => array.includes(r.id)))

    return Promise.resolve(groupedById)
}

module.exports = new DataLoader(batchUserIds);
// https://www.youtube.com/watch?v=ld2_AS4l19g