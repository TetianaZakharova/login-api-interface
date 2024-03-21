import axios from 'axios';

export default axios.create({
    baseURL: 'https://auth-qa.qencode.com/v1/auth'
});