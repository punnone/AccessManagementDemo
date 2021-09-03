import React, { useEffect, useCallback, useState } from 'react'
import moment from 'moment'
import { defineAbilitiesOnTableFor } from '../../utils/Ability/defineAbility'
import Table from '../../components/Table'
import '../../assets/css/App.css'
import tw from 'twin.macro'
import Button from '../Button'

const styles = {
  // Move long class sets out of jsx to keep it scannable
  container: ({ hasBackground }) => [
    tw`tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-screen`,
    hasBackground && tw`tw-bg-gradient-to-b tw-from-primary-blue tw-to-blue-200 `,
  ],
}

const App = () => {
  const [data, setData] = useState({ columns: [], values: [] })
  const [tableNavigation, setTableNavigation] = useState([])
  const [tableDropdownMenuMore, setTableDropdownMenuMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tableName, setTableName] = useState("Table Name")
  const [tableSearchPlaceHolder, setTableSearchPlaceHolder] = useState("Search")
  const [isActionAvaliable, setIsActionAvaliable] = useState(true)
  const [tableColumnActionName, setTableColumnActionName] = useState("View")
  const [tableColumnActionComponent, setTableColumnActionComponent] = useState([])
  const [isExpandComponent, setIsExpandComponent] = useState(false)
  const [isSubExpandComponent, setIsSubExpandComponent] = useState([])

  const [role, setRole] = useState('guest')
  const [, forceRender] = React.useState({});

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

  const onClickRole = (e) => {
    setLoading(true)
    const user = { user_id: 1, role: e.target.name }
    const ability = defineAbilitiesOnTableFor(user)

    console.log({
      create: ability.can('create', 'Table'),
      read: ability.can('read', 'Table'),
      update: ability.can('update', 'Table'),
      delete: ability.can('delete', 'Table')
    })

    setRole(e.target.name)
    setTableName(`Table ${e.target.name}`)
    let data = { columns: [], values: [] }
    switch (e.target.name) {
      case 'admin':
        data = {
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
        setTableColumnActionComponent([
          {
            name: 'create',
            icon: 'plus-square',
            action: 'create'
          },
          {
            name: 'edit',
            icon: 'pencil',
            action: 'edit'
          },
          {
            name: 'delete',
            icon: 'trash',
            action: 'delete'
          }
        ])
        break;

      case 'professor':
        data = {
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
            }
          ]
        }
        setTableColumnActionComponent([
          {
            name: 'create',
            icon: 'plus-square',
            action: 'create'
          },
          {
            name: 'edit',
            icon: 'pencil',
            action: 'edit'
          }
        ])
        break;

      case 'student':
        data = {
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
            }
          ]
        }

        setTableColumnActionComponent([
          {
            name: 'edit',
            icon: 'pencil',
            action: 'edit'
          }
        ])
        break;

      case 'user':
        data = {
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

        setTableColumnActionComponent([])
        break;

      default:
        data = { columns: [], values: [] }
        setTableColumnActionComponent([])
        break;
    }
    setData(data)
    setTimeout(() => {
      setLoading(false)
    }, 1750);
  }

  return (
    <React.Fragment>
      <header className="header">
        <ul className="roles">
          <li>
            <button
              type="button"
              name="admin"
              className={onClickSelectRole('admin') ? 'selected' : ''}
              onClick={onClickRole}
            >
              Admin
            </button>
          </li>
          <li>
            <button
              type="button"
              name="professor"
              className={onClickSelectRole('professor') ? 'selected' : ''}
              onClick={onClickRole}
            >
              Professor
            </button>
          </li>
          <li>
            <button
              type="button"
              name="student"
              className={onClickSelectRole('student') ? 'selected' : ''}
              onClick={onClickRole}
            >
              Student
            </button>
          </li>
          <li>
            <button
              type="button"
              name="user"
              className={onClickSelectRole('user') ? 'selected' : ''}
              onClick={onClickRole}
            >
              User
            </button>
          </li>
          <li>
            <button
              type="button"
              name="guest"
              className={onClickSelectRole('guest') ? 'selected' : ''}
              onClick={onClickRole}
            >
              Guest
            </button>
          </li>
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
    </React.Fragment>
  )
}

export default App
