import { AbilityBuilder, Ability } from '@casl/ability'

const { can, cannot, rules } = new AbilityBuilder(Ability)


export function tableAbility(params) {
  	can(user.permissions, "Table");
}
