import axios from 'axios';
if(typeof window !== "undefined")
    axios.defaults.baseURL = `${window.location.origin}/api`;
else axios.defaults.baseURL = 'http://localhost:3000/api';

axios.defaults.headers.post['Content-Type'] = 'application/json';