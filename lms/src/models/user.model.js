export default class User {
    constructor(user_id, username, email, password, role_id) {
        this.user_id = user_id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role_id = role_id;
    }
}