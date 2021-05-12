import Api from "./Api";

class AuthApi {
    authenticate({email, password}) {
        return Api.post('/authenticate', {email, password});
    }

    register ({name, email, password, accountType}) {
        return Api.post('/register', {name, email, password, accountType});
    }
}

export default new AuthApi();