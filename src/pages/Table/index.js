import React, { useContext, useMemo, useState ,useEffect} from 'react'
import Cookie from "js-cookie"
import _ from "lodash"
import { verify } from "../../Components/CheckToken"
import { UserContext } from '../../contexts/userContext'
import { TableColumns , TableAction } from "../../utils/MockupData/TableColumns"
import { AbilityContext , Can } from '../../contexts/abilityContext'
import { useAbility } from '@casl/react'
import Table from "../../Components/Table"
import { TableShowContext } from '../../contexts/tableShowContext'

function TablePage() {
	const userContext = useContext(UserContext)
	const tableData = useContext(TableShowContext)
	const ability = useAbility(AbilityContext)
	const token = Cookie.get("access_token")
	
	const [isVerify,setIsVerify] = useState(false)
	const [column,setColumn] = useState([])
	const [action,setAction] = useState([])
	const [loading,setLoading] = useState(true)

    useEffect(() => {
		if(userContext.permission && !_.isEqual(userContext.permission,[])){
			setLoading(true)
			tableData.getDataTable()
			setIsVerify(verify(token))
		}
    },[userContext.permission])

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
		setLoading(false)
	}


	return (
		isVerify !== false ?
		<React.Fragment>
			<main className="h-100 flex items-center justify-center">
				<div
					className="flex flex-column h-100 w-auto mh-8"
					// style={{
					// 	height: "calc(100vh - {8}5px - {8}rem)",
					// 	width: "calc(100vw - {8}5px - {8}rem)",
					// }}
				>
					<Table
						tcolumn = {column}
						tvalue = {tableData.dataTable ? tableData.dataTable : []}
						action = {action}
						loading = {loading || userContext.loading}
						noData = {loading ? [] : false}
					/>
					
					{/* <Can do="create" on="Table">
						<p> can do <b>Create</b> on table</p>
					</Can> */}
				</div>
			</main>
		</React.Fragment>
		: 
		userContext.loading ? 
		<>
			<div className="flex justify-center text-2xl mt-96" style={{marginTop:"10rem"}}>
				Loading.......
			</div>
		</>
		:
		<>
			<div className="flex justify-center text-2xl mt-96" style={{marginTop:"10rem"}}>
				Not Permission. Please Login.
			</div>
		</>
	)
}

export default TablePage
