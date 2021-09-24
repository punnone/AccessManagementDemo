export const TableColumns = [
	{
		column : "name",
		display : "Name",
		permission : 'can("view", "thing")'
	},
	{
		column : "uid",
		display : "UID",
		permission : 'can("view", "uid")'
	},
	{
		column : "cctv",
		display : "CCTV",
		permission : 'can("view", "cctv")'
	},
	{
		column : "alarm",
		display : "Alarm",
		permission : 'can("view", "alarm")'
	},
	{
		column : "edit_thing",
		display : "Edit Thing",
		permission : 'can("edit", "thing")'
	},
	{
		column : "edit_alarm",
		display : "Edit Alarm",
		permission : 'can("edit", "alarm")'
	}
]

export const TableColumnssss = [
	{
		column: 'id',
		display: {
			en: 'id',
			available: true
		}
	},
	{
		column: 'name',
		display: {
			en: 'Name',
			available: true
		}
	},
	{
		column: 'faculty_id',
		display: {
			en: 'Faculty_ID',
			available: true
		}
	},
	{
		column: 'faculty',
		display: {
			en: 'Faculty',
			available: true
		}
	},
	{
		column: 'field_id',
		display: {
			en: 'Field_ID',
			available: true
		}
	},
	{
		column: 'field',
		display: {
			en: 'Field',
			available: true
		}
	},
	{
		column: 'active',
		display: {
			en: 'Active',
			available: true
		}
	},
	{
		column: 'updated',
		display: {
			en: 'Updated Date',
			available: true
		}
	},
	{
		column: 'created',
		display: {
			en: 'Created Date',
			available: true
		}
	}
]
