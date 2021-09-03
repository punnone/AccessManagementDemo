import React, { useEffect, useCallback, useState } from 'react'
import moment from 'moment'
import { defineAbilitiesOnTableFor } from '../../utils/Ability/defineAbility'
import Table from '../../components/Table'
import axios from 'axios'
import '../../assets/css/App.css'
import tw from 'twin.macro'
import Button from '../Button'

import { UserData, TableData } from '../../utils/MockupData'

const styles = {
  // Move long class sets out of jsx to keep it scannable
  container: ({ hasBackground }) => [
    tw`tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-screen`,
    hasBackground && tw`tw-bg-gradient-to-b tw-from-primary-blue tw-to-blue-200 `,
  ],
}

const App = () => {
  const [data, setData] = useState({
    columns: [
      {
        column: 'name',
        display: {
          en: 'name'
        }
      },
      {
        column: 'faculty',
        display: {
          en: 'Faculty'
        }
      },
      {
        column: 'field',
        display: {
          en: 'Field'
        }
      },
      {
        column: 'role',
        display: {
          en: 'Role'
        }
      },
      {
        column: 'created',
        display: {
          en: 'Start Date'
        }
      }
    ],
    values: []
  })
  const [userData, setUserData] = useState(UserData)
  const [tableNavigation, setTableNavigation] = useState([])
  const [tableDropdownMenuMore, setTableDropdownMenuMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tableName, setTableName] = useState("Table Name")
  const [tableSearchPlaceHolder, setTableSearchPlaceHolder] = useState("Search")
  const [isActionAvaliable, setIsActionAvaliable] = useState(true)
  const [tableColumnActionName, setTableColumnActionName] = useState("View")
  const [tableColumnActionComponent, setTableColumnActionComponent] = useState([])
  const [tableColumnActionRole, setTableColumnActionRole] = useState('guest')
  const [isExpandComponent, setIsExpandComponent] = useState(false)
  const [isSubExpandComponent, setIsSubExpandComponent] = useState([])

  const [role, setRole] = useState('guest')
  const [, forceRender] = React.useState({})

  const handleRenderTableData = () => {
    return () => setData({ columns: [], values: [] })
  }

  const onClickView = (data) => {
    console.log({ onClickView: data })
  }

  const onClickMore = (eventKey, rowData) => {
    console.log({ onClickMore: { eventKey, rowData } })
  }

  const onClickSelectRole = (selectRole) => {
    return role === selectRole ? 'selected' : ''
  }

  const checkActionWithPermissions = (ability, role) => {
    let tableColumnActionComponent = []

    console.log({
      create: ability.can('create', 'Table'),
      read: ability.can('read', 'Table'),
      update: ability.can('update', 'Table'),
      delete: ability.can('delete', 'Table')
    })

    if (ability.can('create', 'Table')) {
      tableColumnActionComponent.push({
        name: 'create',
        icon: 'plus-square',
        action: 'create',
        valid: true,
      })
    }

    if (ability.can('read', 'Table')) {
      // tableColumnActionComponent.push()
    }

    if (ability.can('update', 'Table')) {
      tableColumnActionComponent.push({
        name: 'edit',
        icon: 'pencil',
        action: 'edit',
        valid: true,
      })
    }

    if (ability.can('delete', 'Table')) {
      tableColumnActionComponent.push({
        name: 'delete',
        icon: 'trash',
        action: 'delete',
        valid: true,
      })
    }

    setTableColumnActionComponent(tableColumnActionComponent)
    setTableColumnActionRole(role)
  }

  const handlerFetchService = (username, password) => {
    console.log({ username, password })
    return axios.post(`http://10.224.188.14/api/login`, {
      username,
      password
    }).then(function (response) {
      return response.data
    }).catch(function (error) {
      throw error
    });
  }

  const onClickRole = (e) => {
    console.log(e.target.name)

    setLoading(true)
    setRole(e.target.name)
    setTableName(`Table ${e.target.name}`)
    let user = {}
    let dataWithPermissions = { columns: [], values: [] }
    let action = []
    switch (e.target.name) {
      case 'admin':
        dataWithPermissions = {
          columns: [
            {
              column: 'name',
              display: {
                en: 'name'
              }
            },
            {
              column: 'faculty',
              display: {
                en: 'Faculty'
              }
            },
            {
              column: 'field',
              display: {
                en: 'Field'
              }
            },
            {
              column: 'role',
              display: {
                en: 'Role'
              }
            },
            {
              column: 'created',
              display: {
                en: 'Start Date'
              }
            }
          ],
          values: [
            {
              id: 1,
              name: 'John Doe',
              faculty_id: '123456',
              faculty: 'Engineering',
              field_id: '000456',
              field: 'Computer Engineering',
              role: 'admin',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            },
            {
              id: 2,
              name: 'Jane Doe',
              faculty_id: '123457',
              faculty: 'Engineering',
              field_id: '000457',
              field: 'Computer Engineering',
              role: 'professor',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            },
            {
              id: 3,
              name: 'Baby Doe',
              faculty_id: '123458',
              faculty: 'Science',
              field_id: '000458',
              field: 'Computer Science',
              role: 'professor',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            },
            {
              id: 4,
              name: 'Kid Doe',
              faculty_id: '123459',
              faculty: 'Science',
              field_id: '000459',
              field: 'Computer Science',
              role: 'student',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            },
            {
              id: 5,
              name: 'Anna Doe',
              faculty_id: '123460',
              faculty: 'Science',
              field_id: '000460',
              field: 'Mathematics',
              role: 'student',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            },
            {
              id: 6,
              name: 'the babadook',
              faculty_id: '',
              faculty: '',
              field_id: '',
              field: '',
              role: 'guest',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            }
          ]
        }
        break;

      case 'professor':
        dataWithPermissions = {
          columns: [
            {
              column: 'name',
              display: {
                en: 'name'
              }
            },
            {
              column: 'faculty',
              display: {
                en: 'Faculty'
              }
            },
            {
              column: 'field',
              display: {
                en: 'Field'
              }
            },
            {
              column: 'role',
              display: {
                en: 'Role'
              }
            },
            {
              column: 'created',
              display: {
                en: 'Start Date'
              }
            }
          ],
          values: [
            {
              id: 1,
              name: 'John Doe',
              faculty_id: '123456',
              faculty: 'Engineering',
              field_id: '000456',
              field: 'Computer Engineering',
              role: 'admin',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            },
            {
              id: 2,
              name: 'Jane Doe',
              faculty_id: '123457',
              faculty: 'Engineering',
              field_id: '000457',
              field: 'Computer Engineering',
              role: 'professor',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            },
            {
              id: 3,
              name: 'Baby Doe',
              faculty_id: '123458',
              faculty: 'Science',
              field_id: '000458',
              field: 'Computer Science',
              role: 'professor',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            },
            {
              id: 4,
              name: 'Kid Doe',
              faculty_id: '123459',
              faculty: 'Science',
              field_id: '000459',
              field: 'Computer Science',
              role: 'student',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            },
            {
              id: 5,
              name: 'Anna Doe',
              faculty_id: '123460',
              faculty: 'Science',
              field_id: '000460',
              field: 'Mathematics',
              role: 'student',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            },
            {
              id: 6,
              name: 'the babadook',
              faculty_id: '',
              faculty: '',
              field_id: '',
              field: '',
              role: 'guest',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            }
          ]
        }
        break;

      case 'student':
        dataWithPermissions = {
          columns: [
            {
              column: 'name',
              display: {
                en: 'name'
              }
            },
            {
              column: 'faculty',
              display: {
                en: 'Faculty'
              }
            },
            {
              column: 'field',
              display: {
                en: 'Field'
              }
            },
            {
              column: 'role',
              display: {
                en: 'Role'
              }
            },
            {
              column: 'created',
              display: {
                en: 'Start Date'
              }
            }
          ],
          values: [
            {
              id: 1,
              name: 'John Doe',
              faculty_id: '123456',
              faculty: 'Engineering',
              field_id: '000456',
              field: 'Computer Engineering',
              role: 'admin',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            },
            {
              id: 2,
              name: 'Jane Doe',
              faculty_id: '123457',
              faculty: 'Engineering',
              field_id: '000457',
              field: 'Computer Engineering',
              role: 'professor',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            },
            {
              id: 3,
              name: 'Baby Doe',
              faculty_id: '123458',
              faculty: 'Science',
              field_id: '000458',
              field: 'Computer Science',
              role: 'professor',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            },
            {
              id: 4,
              name: 'Kid Doe',
              faculty_id: '123459',
              faculty: 'Science',
              field_id: '000459',
              field: 'Computer Science',
              role: 'student',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            },
            {
              id: 5,
              name: 'Anna Doe',
              faculty_id: '123460',
              faculty: 'Science',
              field_id: '000460',
              field: 'Mathematics',
              role: 'student',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            },
            {
              id: 6,
              name: 'the babadook',
              faculty_id: '',
              faculty: '',
              field_id: '',
              field: '',
              role: 'guest',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            }
          ]
        }
        break;

      case 'user':
        dataWithPermissions = {
          columns: [
            {
              column: 'name',
              display: {
                en: 'name'
              }
            },
            {
              column: 'faculty',
              display: {
                en: 'Faculty'
              }
            },
            {
              column: 'field',
              display: {
                en: 'Field'
              }
            },
            {
              column: 'created',
              display: {
                en: 'Start Date'
              }
            }
          ],
          values: [
            {
              id: 1,
              name: 'John Doe',
              faculty_id: '123456',
              faculty: 'Engineering',
              field_id: '000456',
              field: 'Computer Engineering',
              role: '',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            },
            {
              id: 2,
              name: 'Jane Doe',
              faculty_id: '123457',
              faculty: 'Engineering',
              field_id: '000457',
              field: 'Computer Engineering',
              role: '',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            },
            {
              id: 3,
              name: 'Baby Doe',
              faculty_id: '123458',
              faculty: 'Science',
              field_id: '000458',
              field: 'Computer Science',
              role: '',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            },
            {
              id: 4,
              name: 'Kid Doe',
              faculty_id: '123459',
              faculty: 'Science',
              field_id: '000459',
              field: 'Computer Science',
              role: '',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            },
            {
              id: 5,
              name: 'Anna Doe',
              faculty_id: '123460',
              faculty: 'Science',
              field_id: '000460',
              field: 'Mathematics',
              role: '',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            },
            {
              id: 6,
              name: 'the babadook',
              faculty_id: '',
              faculty: '',
              field_id: '',
              field: '',
              role: '',
              active: 1,
              updated: moment().format('DD/MM/YYYY HH:mm'),
              created: moment().format('DD/MM/YYYY HH:mm')
            }
          ]
        }
        break;

      default:
        dataWithPermissions = {
          columns: [
            {
              column: 'name',
              display: {
                en: 'name'
              }
            },
            {
              column: 'faculty',
              display: {
                en: 'Faculty'
              }
            },
            {
              column: 'field',
              display: {
                en: 'Field'
              }
            },
            {
              column: 'role',
              display: {
                en: 'Role'
              }
            },
            {
              column: 'created',
              display: {
                en: 'Start Date'
              }
            }
          ],
          values: []
        }
        break;
    }

    console.log({ dataWithPermissions })

    handlerFetchService(e.target.name, 'password')
      .then((user) => {
        let ability = defineAbilitiesOnTableFor(user)
        setData(dataWithPermissions)
        checkActionWithPermissions(ability, e.target.name)
      })

    setTimeout(() => {
      setLoading(false)
    }, 500);
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
          <div className="pv3">
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
          </div>
        </div>
      </main>
      <div css={styles.container({ hasBackground: true })}>
        <div tw="tw-flex tw-flex-col tw-justify-center tw-h-full tw-gap-y-5">
          <Button variant="primary">Submit</Button>
          <Button variant="secondary">Cancel</Button>
          <Button isSmall>Close</Button>
          <button className="tw-text-primary-blue">Test blue</button>
        </div>
      </div>
    </React.Fragment >
  )
}

export default App
