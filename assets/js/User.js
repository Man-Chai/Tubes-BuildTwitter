class User {

    constructor(){
        this._users = null;

    }
    getUsers(){
        if(this._users == null){
            try{
                const storedUsers = localStorage.getItem('users');
                this._users = storedUsers ? JSON.parse(storedUsers) : [];
            }
            catch(error){
                return this._users = [];


            }
        }
        return this._users;
    }
    saveUser(userData){    

        const {name, username,avatar, password} = userData;

        if(typeof name !== 'string' || name.trim() === ''){
            return{
            success: false,
            error: 'name is missing'
        }
    }
    if(typeof username !== 'string' || username.trim() === ''){
            return{
            success: false,
            error: 'username is missing'
        }
    }
    if(typeof avatar !== 'string' || avatar.trim() === ''){
            return{
            success: false,
            error: 'avatar is missing'
        }
    }
    if(password.length < 8){
            return{
            success: false,
            error: 'password at least has 8 characters' 
        }
    }

    const newTwitt = {
        id: Date.now(),
        isActive: true,
        ...userData
    };

    const users = this.getUsers();
    user.push(newUser);

    try{
        localStorage.setItem('users', JSON.stringify(users));
        return{
            success: true,
        }
    }
    catch(error){
        return{
            success: false,
        }
    }
}

    userSignIn(userData){
        const {username,password} = userData;
    if(typeof username !== 'string' || username.trim() === ''){
            return{
            success: false,
            error: 'username is missing'
        }
    }
    if(typeof avatar !== 'string' || avatar.trim() === ''){
            return{
            success: false,
            error: 'avatar is missing'
        }
    }
    if(password.length < 8){
            return{
            success: false,
            error: 'password at least has 8 characters' 
        }
    }

    const usersExist = this.getUsers().some(user => user.username.toLowerCase() === username.toLowerCase()&& user.password === password); 

    if(usersExist){
        return{
            success: true,
        }
    }
    else{
        return{
            success: false,
            error: 'username or password is wrong!'
        }
    }
}
}