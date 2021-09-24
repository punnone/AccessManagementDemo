import React, { useContext, useState } from 'react'
import Cookie from "js-cookie"
import { verify } from "../../components/CheckToken"
import { UserContext } from '../../contexts/userContext'
import { useEffect } from 'react/cjs/react.development'
import { TableColumns } from "../../utils/MockupData/TableColumns"
import { TableOwner } from "../../utils/MockupData/TableValues"
import { TableAdminEvent } from "../../utils/MockupData/TableValues"
import { AbilityContext } from '../../contexts/abilityContext'

function TablePage() {
	const userContext = useContext(UserContext)
	const ability = useContext(AbilityContext)
	const token = Cookie.get("access_token")
	
	const [isVerify,setIsVerify] = useState(false)
	const [dataTable,setDataTable] = useState()

    useEffect(() => {
        console.log("verify token test ",verify(token))
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
									return(
										ability.can('edit','thing') && 
										<th key={i}>{c.display}</th>	
									)
								})
							}
							
						</tr>
						{
							TableOwner.map((v,i) => {
								return(
									<tr key={i}>
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
