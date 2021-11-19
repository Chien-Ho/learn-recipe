import axios from 'axios'

const SetToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    } else {
        delete axios.defaults.headers.common['Authorization']
    }

}
export default SetToken