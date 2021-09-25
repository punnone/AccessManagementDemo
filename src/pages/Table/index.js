import React, { useContext, useMemo, useState } from 'react'
import Cookie from "js-cookie"
import _ from "lodash"
import { verify } from "../../components/CheckToken"
import { UserContext } from '../../contexts/userContext'
import { useEffect } from 'react/cjs/react.development'
import { TableColumns , TableAction } from "../../utils/MockupData/TableColumns"
import { TableOwner } from "../../utils/MockupData/TableValues"
import { AbilityContext , Can } from '../../contexts/abilityContext'
import { useAbility } from '@casl/react'
import { TableAPI } from '../../services/TableAPI' // fetchAPI
import Table from "../../components/Table"
import { TableShowContext } from '../../contexts/tableShowContext'
// import { changeFormat } from '../../utils/Abilities/Permissions'

function TablePage() {
	const userContext = useContext(UserContext)
	const tableData = useContext(TableShowContext)
	const ability = useAbility(AbilityContext)
	const token = Cookie.get("access_token")
	
	const [isVerify,setIsVerify] = useState(false)
	const [column,setColumn] = useState([])
	const [action,setAction] = useState([])
	const [loading,setLoading] = useState(true)

	useMemo(() => {
		userContext.getPermission()
	},[])

    useEffect(() => {
		setLoading(true)
		tableData.getDataTable()
        setIsVerify(verify(token))
    },[userContext.user])

	useEffect(() => {
		setLoading(false)
	},[tableData.dataTable])

	useEffect(() => {
		setColumnWithPermission()
	},[userContext.permission])

	function setColumnWithPermission(params) {
		const oldColumn = [...TableColumns]
		const new_column = _.remove(oldColumn,(c,i) => {
			// return changeFormat(c)
			const per_split = c.permission.split(":")
			return ability.can(per_split[0],per_split[1])
		})

		const oldAction = [...TableAction]
		const new_Action = _.remove(oldAction,(c,i) => {
			const per_split = c.permission.split(":")
			return ability.can(per_split[0],per_split[1])
		})

		setAction(new_Action)
		setColumn(new_column)
	}



	return (
		isVerify !== false ?
		<React.Fragment>
			<main className="h-100 flex items-center justify-center">
				<div
					className="flex flex-column h-100 w-auto mh{8}"
					style={{
						height: "calc(100vh - {8}5px - {8}rem)",
						width: "calc(100vw - {8}5px - {8}rem)",
					}}
				>
					<Table
						tcolumn = {column}
						tvalue = {tableData.dataTable ? tableData.dataTable : []}
						action = {action}
						loading = {loading}
					/>
					
					{/* <Can do="create" on="Table">
						<p> can do <b>Create</b> on table</p>
					</Can> */}
				</div>
			</main>
		</React.Fragment>
		: 
		<>
			<p>Not Permission</p>
		</>
	)
}

export default TablePage
