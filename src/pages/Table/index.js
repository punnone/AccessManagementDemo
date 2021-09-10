import React, { useState, useContext, useEffect, useCallback } from 'react'
import moment from 'moment'
import axios from 'axios'
import { TableContext } from '../../contexts/TableContext'
import Table from '../../components/Table'
import { TableAPI } from '../../services/TableAPI' // fetchAPI
import { defineAbilitiesOnTableFor } from '../../utils/Abilities'
import { Can } from '../../components/Abilities' // ability context
import { updateAbility } from '../../utils/Abilities' // permissions
import { UserRoles, TableColumns, TableValues, TableActions, TableActionsMore } from '../../utils/MockupData'

function TablePage({ ability }) {
  const table = useContext(TableContext)

  const [data, setData] = useState({ columns: [], values: [] })
  const [userData, setUserData] = useState(UserRoles)
  const [tableNavigation, setTableNavigation] = useState([])
  const [tableDropdownMenuMore, setTableDropdownMenuMore] = useState([])
  const [loading, setLoading] = useState(true)
  const [tableName, setTableName] = useState("Table Name")
  const [tableSearchPlaceHolder, setTableSearchPlaceHolder] = useState("Search")
  const [isActionAvaliable, setIsActionAvaliable] = useState(false)
  const [tableColumnActionName, setTableColumnActionName] = useState("View | More")
  const [tableColumnActionComponent, setTableColumnActionComponent] = useState([])
  const [tableColumnActionRole, setTableColumnActionRole] = useState('')
  const [isExpandComponent, setIsExpandComponent] = useState(false)
  const [isSubExpandComponent, setIsSubExpandComponent] = useState([])
  const [role, setRole] = useState('')

  useEffect(() => {
    const { columns, values } = data
    setData({
      columns: TableColumns,
      values: TableValues
    })
    setIsActionAvaliable(true)
    setTableColumnActionComponent(TableActions)
    setTableDropdownMenuMore(TableActionsMore)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (tableColumnActionComponent?.length > 0) {
      setIsActionAvaliable(true)
    }
  }, [tableColumnActionComponent])

  const onClickView = (data) => {
    console.log({ onClickView: data })
  }

  const onClickMore = (eventKey, rowData) => {
    console.log({ onClickMore: { eventKey, rowData } })
  }

  // CSS EVENT
  const onClickSelectRole = (selectRole) => {
    return role === selectRole ? 'selected' : ''
  }

  // Action of Table
  const checkActionWithPermissions = (ability, role) => {
    let cloneData = { ...data }
    let tableColumnActionComponent = [
      {
        name: 'read',
        icon: 'eye',
        action: 'read',
        available: ability.can('read', 'Table')
      }
    ]
    let tableDropdownMenuMore = [
      {
        name: 'create',
        icon: 'plus-square',
        action: 'create',
        available: ability.can('create', 'Table'),
      },
      {
        name: 'edit',
        icon: 'pencil',
        action: 'edit',
        available: ability.can('update', 'Table'),
      },
      {
        name: 'delete',
        icon: 'trash',
        action: 'delete',
        available: ability.can('delete', 'Table'),
      }
    ]

    switch (role) {
      case 'admin':
        setData({
          columns: TableColumns,
          values: TableValues
        })
        setTableDropdownMenuMore(tableDropdownMenuMore)
        setTableColumnActionName('View | More')
        break;
      case 'professor':
        let updateProfessorValues = data.values && data.values.map((v, i) =>
          ['Computer Science'].includes(v.field)
            ?
            {
              ...v,
              isAction: {
                field: v.field,
                create: false,
                read: true,
                update: false,
                delete: false
              }
            }
            : v
        )
        setData({
          columns: TableColumns,
          ...data.values,
          values: updateProfessorValues
        })
        let updateProfessorDropdownMenuMore = tableDropdownMenuMore.map((v, i) =>
          ({ ...v, field: 'Computer Science' })
        )
        console.table(updateProfessorDropdownMenuMore)
        setTableDropdownMenuMore(updateProfessorDropdownMenuMore)
        setTableColumnActionName('View | More')
        break;
      case 'math':
        let updateMathValues = data.values && data.values.map((v, i) =>
          ['Computer Engineering', 'Computer Science', ''].includes(v.field)
            ?
            {
              ...v,
              isAction: {
                field: v.field,
                create: false,
                read: true,
                update: false,
                delete: false
              }
            }
            : v
        )
        setData({
          columns: TableColumns,
          ...data.values,
          values: updateMathValues
        })
        let updateMathDropdownMenuMore = tableDropdownMenuMore.map((v, i) =>
          ({ ...v, field: ['Computer Engineering', 'Computer Science', ''] })
        )
        console.table(updateMathDropdownMenuMore)
        setTableDropdownMenuMore(updateMathDropdownMenuMore)
        setTableColumnActionName('View | More')
        break;
      case 'student':
        let updateColumns = data.columns.filter((v, i) => !['field_id', 'active'].includes(v.column))
        // let updateColumns = data.columns.map((v, i) =>
        //   v.column === 'field_id' || v.column === 'active'
        //     ?
        //     {
        //       ...v,
        //       display: {
        //         en: v.display.en,
        //         available: false
        //       }
        //     }
        //     : v
        // )
        setData({
          ...data.columns,
          columns: [...updateColumns],
        })
        setTableDropdownMenuMore(false)
        setTableColumnActionName('View')
        break;
    }

    setTableColumnActionComponent(tableColumnActionComponent)
    setTableColumnActionRole(role)

    console.table(tableColumnActionComponent)
    console.table(tableDropdownMenuMore)
    console.table(data)
  }

  // EVENT CHANGE ROLE
  const onClickRole = (e) => {
    setLoading(true)
    console.clear()
    // POST Username, Password then return { permissions: <object>, role: <string>, username: <string>, _id: <string> }
    TableAPI.getPermissions({ username: e.target.name, password: 'password' })
      .then((user) => {
        // let ability = defineAbilitiesOnTableFor(user)
        // checkActionWithPermissions(ability, e.target.name)
        const rules = updateAbility(user)
        ability.update(rules)
        checkActionWithPermissions(ability, user?.role)
        setRole(e.target.name)
        setTableName(`Table ${e.target.name}`)
        setLoading(false)
      })
      .catch((error) => {
        console.log({ TableAPI_getPermissions: error })
        setLoading(false)
      })

  }

  return (
    <React.Fragment>
      <header className="header">
        <ul className="roles">
          {
            userData.map((user, index) => {
              return (
                <React.Fragment>
                  <li>
                    <button
                      type="button"
                      name={user.role}
                      className={onClickSelectRole(`${user.role}`) ? 'selected' : ''}
                      onClick={onClickRole}
                    >
                      {user.role}
                    </button>
                  </li>
                </React.Fragment>
              )
            })
          }
        </ul>
      </header>
      <main className="h-100 flex items-center justify-center">
        <div
          className="flex flex-column h-100 w-auto mh4"
          style={{
            height: "calc(100vh - 45px - 4rem)",
            width: "calc(100vw - 45px - 4rem)",
          }}
        >
          <Can do="create" on="Table">
            <p>{role} can do <b>Create</b> on table</p>
          </Can>
          <Can do="read" on="Table">
            <p>{role} can do <b>Read</b> on table</p>
          </Can>
          <Can do="update" on="Table">
            <p>{role} can do <b>Update</b> on table</p>
          </Can>
          <Can do="delete" on="Table">
            <p>{role} can do <b>Delete</b> on table</p>
          </Can>
          <div className="pv3">
            {
              <Table
                data={data}
                tableNavigation={tableNavigation}
                tableDropdownMenuMore={tableDropdownMenuMore}
                loading={loading}
                tableName={tableName}
                tableSearchPlaceHolder={tableSearchPlaceHolder}
                isColumnActionAvaliable={isActionAvaliable}
                tableColumnActionName={tableColumnActionName}
                tableColumnActionComponent={tableColumnActionComponent}
                tableColumnActionRole={tableColumnActionRole}
                isExpandComponent={isExpandComponent}
                isSubExpandComponent={isSubExpandComponent}
                onClickView={onClickView}
                onClickMore={onClickMore}
              />
            }
          </div>
        </div>
      </main>
    </React.Fragment>
  )
}

export default TablePage
