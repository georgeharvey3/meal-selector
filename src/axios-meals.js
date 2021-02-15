import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://meal-selector-525ee-default-rtdb.firebaseio.com/'
});

export default instance;