import React, { useState, useEffect, useContext } from "react"
import { TableContext } from "../../contexts/TableContext"
import Table from "../../components/Table"

function TablePage({ usename, password }) {
  const table = useContext(TableContext)

  useEffect(() => {
    const login = { usename, password }

    table.setInitiateTable(login)
  }, [])

  return (
    <React.Fragment></React.Fragment>
  )
}

export default TablePage
