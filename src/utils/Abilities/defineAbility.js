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
