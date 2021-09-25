import axios from "axios"

export const TableAPI = {
	authen: ({ username, password }) => {
		return axios({
			url: `${process.env.REACT_APP_API_ENDPOINT}/auth/login`,
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

	doAuthorization: ({ username, password }) => {
		return axios({
			url: `${process.env.REACT_APP_API_ENDPOINT}/api/v2/auth/token`,
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

	postTokenRenew: ({ token }) => {
		return axios({
			url: `${process.env.REACT_APP_API_ENDPOINT}/api/v2/auth/token/refresh`,
			method: "POST",
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

	getPermissions: ({ token }) => {
		return axios({
			url: `${process.env.REACT_APP_API_ENDPOINT}/auth/permission`,
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
			url: `${process.env.REACT_APP_API_ENDPOINT}/thing/all`,
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
