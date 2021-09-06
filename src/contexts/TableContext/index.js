import React, { createContext, Component } from "react"
import { TableAPI } from "../../services/TableAPI"

export const TableContext = createContext({
  initTable: [],
  initPermissions: [],
  setInitiateTable: () => { },
  setPermissions: () => { }
})

const { Provider } = TableContext

class TableProvider extends Component {
  state = {
    initTable: []
  }

  setInitiateTable = (Authentication) => {
    TableAPI.getPermissions(Authentication)
      .then((response) => {
        this.setState({
          initTable: response
        })
      })

  }

  render() {
    const TableProviderValue = {
      ...this.state,
      setInitiateTable: this.setInitiateTable,
      setPermissions: this.setPermissions
    }

    return (
      <Provider value={TableProvider}>
        {
          this.props.children
        }
      </Provider>
    )
  }
}

export default TableProvider
