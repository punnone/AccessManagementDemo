const { AbilityBuilder, Ability } = require('@casl/ability');
const { rules, can, cannot } = new AbilityBuilder(Ability)

export function defineAbilitiesOnTableFor(user) {
  const PAGE = 'Table'

  console.log({ userPermissions: user.permissions })
  switch (user.role) {
    case 'admin':
      can(
        user.permissions,
        PAGE
      )
      break;

    case 'professor':
      can(
        user.permissions,
        PAGE
      )

      cannot(['delete'], PAGE)
      break;

    case 'student':
      can(
        user.permissions,
        PAGE,
        {
          user_id: user.user_id
        }
      )

      cannot(['create', 'delete'], PAGE)
      break;

    case 'user':
      can(user.permissions, PAGE)

      cannot(['create', 'update', 'delete'], PAGE)
      break;

    default:
      cannot(['create', 'read', 'update', 'delete'], PAGE)
      break;
  }

  return new Ability(rules);
}

export function defineAbilitiesForA(user) {

  switch (user.permissions) {
    case 'value':
      // some result
      break;

    default:
      break;
  }

  return new Ability(rules)
}

export function defineAbilitiesForB(user) {

  switch (user.permissions) {
    case 'value':
      // some result
      break;

    default:
      break;
  }

  return new Ability(rules)
}

export function defineAbilitiesForC(user) {

  switch (user.permissions) {
    case 'value':
      // some result
      break;

    default:
      break;
  }

  return new Ability(rules)
}

export function defineAbilitiesForNoBody() {

}
