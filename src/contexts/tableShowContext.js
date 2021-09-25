import React, { useState, createContext } from 'react'
import { TableAPI } from '../services/TableAPI' // fetchAPI
import Cookies from 'js-cookie'

export const TableShowContext = createContext({
    dataTable: [],
    getDataTable : () => {}
})

export const TableShowProvider = ({ children , ability }) => {
    const [dataTable, setDataTable] = useState(null)

    function getDataTable() {
        TableAPI.getDataTables({ 
            token : Cookies.get("access_token")
        })
        .then((response) => {
            setDataTable(response)
        })
        .catch((error) => {
            alert("Get data table is went wrong. Plese try again.")
        })
    }

    return (
        <TableShowContext.Provider value={{
            dataTable,
            getDataTable
        }}>
            {children}
        </TableShowContext.Provider>
    )
}
