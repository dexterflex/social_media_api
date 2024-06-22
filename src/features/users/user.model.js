

let count = 0;

class userModel {
    constructor(name, email, password) {
        this.id = ++count;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

let users = [new userModel("vivek kumar", "vk281977@gmail.com", "vivekkumar@1")];



export const addUser = ({ name, email, password }) => {
    let user = users.find(u => u.email == email)
    if (user) {
        return { success: false, msg: "user already exists" }
    }
    let newUser = new userModel(name, email, password)
    users.push(newUser)
    return { success: true, newUser }
}


export const authenticateUser = ({ email, password }) => {
    let user = users.find(u =>
        u.email == email &&
        u.password == password
    )
    if (user) {
        return { success: true, user }
    }
    return { success: false, msg: "authentication failed" }
}

