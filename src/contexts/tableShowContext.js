import React, { useState, createContext } from 'react'
import { TableAPI } from '../services/TableAPI' // fetchAPI
import Cookies from 'js-cookie'

export const TableShowContext = createContext({
    dataTable: [],
    getDataTable : () => {},
    setDataTable : () => {}
})

export const TableShowProvider = ({ children , ability }) => {
    const [dataTable, _setDataTable] = useState(null)

    function getDataTable() {
        TableAPI.getDataTables({ 
            token : Cookies.get("access_token")
        })
        .then((response) => {
            _setDataTable(response)
        })
        .catch((error) => {
            alert("Get data table is went wrong. Plese try again.")
        })
    }

    function setDataTable(data) {
        _setDataTable(data)
    }

    return (
        <TableShowContext.Provider value={{
            dataTable,
            getDataTable,
            setDataTable
        }}>
            {children}
        </TableShowContext.Provider>
    )
}
