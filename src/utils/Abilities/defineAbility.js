const { AbilityBuilder, Ability } = require('@casl/ability');
const PAGE = 'Table'

export function updateAbility(permission) {
	const { rules, can, cannot } = new AbilityBuilder(Ability)
	// can('update','thing')
	permission.map((p,i) => {
		const per_split = p.split(":")
		can(
			per_split[0],
			per_split[1]
		)
	})
	return rules
}
// export function defineAbilitiesOnTableFor(user) {
//   switch (user.role) {
//     case 'admin':
//       can(
//         user.permissions,
//         PAGE
//       )
//       break;

//     case 'professor':
//       can(
//         user.permissions,
//         PAGE
//       )

//       cannot(['delete'], PAGE)
//       break;

//     case 'student':
//       can(
//         user.permissions,
//         PAGE,
//         {
//           user_id: user.user_id
//         }
//       )

//       cannot(['create', 'delete'], PAGE)
//       break;

//     case 'user':
//       can(user.permissions, PAGE)

//       cannot(['create', 'update', 'delete'], PAGE)
//       break;

//     default:
//       cannot(['create', 'read', 'update', 'delete'], PAGE)
//       break;
//   }

//   return new Ability(rules);
// }

// export function defineAbilitiesForAdmin(user) {

//   can(['create', 'read', 'update', 'delete'], PAGE)

//   return new Ability(rules)
// }

// export function defineAbilitiesForProfessor(user) {

//   can(user.permissions, PAGE)

//   cannot(['create', 'update', 'delete'], PAGE, { field: 'Computer Science' })

//   return new Ability(rules)
// }

// export function defineAbilitiesForStudent(user) {

//   can(user.permissions, PAGE)

//   cannot(['create', 'update', 'delete'], PAGE)

//   return new Ability(rules)
// }
