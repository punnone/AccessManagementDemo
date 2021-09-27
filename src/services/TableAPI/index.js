import axios from "axios"

export const TableAPI = {
	authen: ({ username, password }) => {
		return axios({
			url: `${process.env.REACT_APP_API_ENDPOINT}/Oauth/login`,
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
			return response.data
		})
		.catch((error) => {
			throw error
		})
	},

	getPermissions: ({ token }) => {
		return axios({
			url: `${process.env.REACT_APP_API_ENDPOINT}/permission/get`,
			method: "GET",
			headers: {
				"Context-Type": "application/json",
				"Authorization": "Bearer " + token
			}
		})
		.then((response) => {
			return response.data
		})
		.catch((error) => {
			throw error
		})
	},

	getDataTables: ({ token }) => {
		return axios({
			url: `${process.env.REACT_APP_API_ENDPOINT}/thingdemo`,
			method: "GET",
			headers: {
				"Context-Type": "application/json",
				"Authorization": "Bearer " + token
			}
		})
		.then((response) => {
			return response.data
		})
		.catch((error) => {
			throw error
		})
	}
}
