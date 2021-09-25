import React, { useContext, useMemo, useState } from 'react'
import Cookie from "js-cookie"
import { verify } from "../../components/CheckToken"
import { UserContext } from '../../contexts/userContext'
import { useEffect } from 'react/cjs/react.development'
import { TableColumns } from "../../utils/MockupData/TableColumns"
import { TableOwner } from "../../utils/MockupData/TableValues"
import { AbilityContext , Can } from '../../contexts/abilityContext'
import { useAbility } from '@casl/react'
// import { TableAdminEvent } from "../../utils/MockupData/TableValues"

function TablePage() {
	const userContext = useContext(UserContext)
	const ability = useAbility(AbilityContext)
	const token = Cookie.get("access_token")
	
	const [isVerify,setIsVerify] = useState(false)
	// const [dataTable,setDataTable] = useState()

	useMemo(() => {
		userContext.getPermission()
	},[])

    useEffect(() => {
        setIsVerify(verify(token))
    },[userContext.user])



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
					
					<table 
						style={{
							width : "80vw",
							textAlign: "center"
						}}
					>
						<tr>
							{
								TableColumns.map((c,i) => {
									const per_split = c.permission.split(":")
									const permission = ability.can(per_split[0],per_split[1])
									console.log("per_split",per_split,permission)
									return(
										<Can do={per_split[0]} on={per_split[1]}>
											<th 
												key={i}
												// style={{
												// 	display : permission ? "block" : "none"
												// }}
											>
												{c.display}
											</th>	
										</Can>
									)
								})
							}
							
						</tr>
						{
							TableOwner.map((v,i) => {
								return(
									<tr 
										key={i}
										// style={{
										// 	display : ability.can(per_split[0],per_split[1]) ? "block" : "none"
										// }}
									>
										<td key={i}>{v.name}</td>
										<td key={i}>{v.uid}</td>
										<td key={i}>{v.cctv}</td>
										<td key={i}>{v.alarm}</td>
										<td key={i}>Edit</td>
										<td key={i}>Edit</td>
									</tr>
								)
							})
						}
					</table>
					
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
