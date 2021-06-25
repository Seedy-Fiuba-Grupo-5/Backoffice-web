import axios from 'axios';

class ApiController {
    static get(url, errorHandler, responseHandler){
        axios.get(url)
            .then(response => {
                responseHandler(response);
            }).catch((err) => {
                errorHandler(err);
            });
    }
}

export default ApiController;