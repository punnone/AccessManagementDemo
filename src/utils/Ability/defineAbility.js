const { AbilityBuilder, Ability } = require('@casl/ability');
const { rules, can, cannot } = new AbilityBuilder(Ability)

export function defineAbilitiesOnTableFor(user) {
  const PAGE = 'Table'

  switch (user.role) {
    case 'admin':
      can(
        ['create', 'read', 'update', 'delete'],
        PAGE
      )
      break;

    case 'professor':
      can(
        ['create', 'read', 'update'],
        PAGE,
        ['active']
      )

      cannot(['delete'], PAGE)
      cannot(['delete'], PAGE, { role: 'professor' })
      break;

    case 'student':
      can(
        ['read', 'update'],
        PAGE,
        {
          user_id: user.user_id
        }
      )

      cannot(['create', 'delete'], PAGE)
      break;

    case 'user':
      can('read', PAGE)

      cannot(['create', 'update', 'delete'], PAGE)
      break;

    default:
      cannot(['create', 'read', 'update', 'delete'], PAGE)
      break;
  }

  return new Ability(rules);
}
