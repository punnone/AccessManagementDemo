import axios from "axios"

export const TableAPI = {
  getPermissions: ({ username, password }) => {
    return axios({
      url: `http://10.224.188.14/api/login`,
      method: "POST",
      headers: {
        "Context-Type": "application/json"
      },
      data: {
        username,
        password
      }
    })
      .then((response) => {
        // console.log({ getUserPermissionsSuccess: response.data })
        return response.data
      })
      .catch((error) => {
        // console.log({ getUserPermissionsError: error })
        throw error
      })
  }
}
