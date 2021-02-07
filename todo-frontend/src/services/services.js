import axios from 'axios';

export const getTodos = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/todos', {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            },
        });
        const todoOut = response.data;
        return todoOut
    } catch (error) {
        console.log(error);
    }
}


