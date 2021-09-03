export const UserModel = [
  {
    id: 1,
    username: 'john.doe@dmail.com',
    role: 'admin',
    permissions: ['create', 'read', 'update', 'delete'],
    pages: ['Register'],
    input: []
  },
  {
    id: 2,
    username: 'jane.doe@dmail.com',
    role: 'professor',
    permissions: ['read', 'update']
  },
  {
    id: 3,
    username: 'baby.doe@dmail.com',
    role: 'student',
    permissions: ['read']
  },
  {
    id: 4,
    username: 'kid.doe@dmail.com',
    role: 'user',
    permissions: ['read']
  },
  {
    id: 5,
    username: 'Anna.doe@dmail.com',
    role: 'guest',
    permissions: []
  }
]
