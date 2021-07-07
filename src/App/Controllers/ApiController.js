import axios from 'axios';

class ApiController {
    static get(url, errorHandler, responseHandler, params= {}){
        const body = {
            'token': localStorage.getItem('token'),
            'id': localStorage.getItem('adminId')
        }
        axios.get(url, {params: params}, body)
            .then(response => {
                if(response.data && response.data.token){
                    localStorage.setItem("token", response.data.token);
                }
                responseHandler(response);
            }).catch((err) => {
                errorHandler(err);
            });
    }

    static post(url, body, errorHandler, responseHandler){
        axios.post(url, body)
            .then(response => {
                if(response.data && response.data.token){
                    localStorage.setItem("token", response.data.token);
                }
                responseHandler(response);
            }).catch((err) => {
                errorHandler(err);
        });
    }

    static patch(url, body, errorHandler, responseHandler){
        body["token"] = localStorage.getItem("token");
        axios.patch(url, body)
            .then(response => {
                if(response.data && response.data.token){
                    localStorage.setItem("token", response.data.token);
                }
                responseHandler(response);
            }).catch((err) => {
            errorHandler(err);
        });
    }
}

export default ApiController;