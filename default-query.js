module.exports =
  `
query login {
  login(input: {email: "ckemmey1@harvard.edu", password: "498-97-9862"})
}

query getUser {
  user(id: 4) {
    ...UserData
    roles @include(if: true) {
      id
      name
    }
  }
}

query getUserRoles {
  alias1: roles {
    id
    name
  }
  alias2: userRoles {
    userId
    roleId
  }
}

query getUsers {
  users {
    ...UserData
    password
    roles {
      name
    }
  }
}

mutation createUser {
  createUser(input: {firstName: "Sander", email: "my@email.com"}) {
    ...UserData
  }
}

mutation updateUser {
  updateUser(input: {id: 4, firstName: "Sander", lastName: "Hammelburg", email: "my@email.com"}) {
    ...UserData
  }
}

fragment UserData on User {
  id
  firstName
  lastName
  email
}
`