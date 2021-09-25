export const TableColumns = [
	{
		key : "name",
		label : "Name",
		permission : "read:thing",
		fixed: true,
		width: 70
	},
	{
		key : "uid",
		label : "UID",
		permission : "read:uid",
		fixed: true,
		width: 70
	},
	{
		key : "cctv",
		label : "CCTV",
		permission : "read:cctv",
		fixed: true,
		width: 70
	},
	{
		key : "alarm",
		label : "Alarm",
		permission : "read:alarm",
		fixed: true,
		width: 70
	}
]

export const TableAction = [
	{
		key : "edit_thing",
		label : "Edit Thing",
		permission : "update:thing",
		fixed: true,
		width: 70
	},
	{
		key : "edit_alarm",
		label : "Edit  Alarm",
		permission : "update:alarm",
		checkPackage : true,
		fixed: true,
		width: 70
	}
]