import { AbilityBuilder, Ability } from '@casl/ability'

export function updateAbility(user) {
  const { can, cannot, rules } = new AbilityBuilder(Ability)

  switch (user.role) {
    case "admin":
      can(user.permissions, "Table");
      break;

    case "professor":
      can(user.permissions, "Table");

      cannot(['create', 'update', 'delete'], "Table", { field: 'Computer Science' })
      break;

    case "math":
      can(user.permissions, "Table");

      cannot(['create', 'update', 'delete'], "Table", { field: 'Mathematics' })
      break;

    case "student":
      can(user.permissions, "Table");

      cannot(['read'], "Table", { columns: ['field_id', 'active'] })
      break;

    default:
      can("read", "all");
      break;
  }

  return rules
}
