class User {

    constructor() {
        this._users = null;
    }

    getUsers() {

        if (this._users === null) {
            try {
                const storedUsers = localStorage.getItem('users'); // Get users data from localStorage API
                this._users = storedUsers ? JSON.parse(storedUsers) : [];
            } catch(error) {
                return this._users = [];
            }
        }
        return this._users;

    }

    saveUsers(userData) {
        
        const { name, username, avatar, password } = userData;
        if (typeof name !== 'string' || name.trim() === '') {
            return {
                success: false,
                error: 'Nama tidak boleh kosong'
            }
        }
        if (typeof username !== 'string' || username.trim() === '') {
            return {
                success: false,
                error: 'Username tidak boleh kosong'
            }
        }
        if (typeof avatar !== 'string' || avatar.trim() === '') {
            return {
                success: false,
                error: 'Avatar tidak boleh kosong'
            }
        }
        if (typeof password !== 'string' || password.trim() === '') {
            return {
                success: false,
                error: 'Password tidak boleh kosong'
            }
        }
        if (password.length < 8) {
            return {
                success: false,
                error: 'Password minimal 8 karakter'
            }
        }
        
        const newUser = {
            id: Date.now(),
            isActive: true,
            ...userData
        };

        const users = this.getUsers();
        users.push(newUser);

        try {
            localStorage.setItem('users', JSON.stringify(users));
            return {
                success: true,
            }
        } catch(error){
            return{
                success: false,
            }
        }
        
    }

    userSignIn(userData) {

        const { username, password } = userData;
        if (typeof username !== 'string' || username.trim() === '') {
            return {
                success: false,
                error: 'Username tidak boleh kosong'
            }
        }
        if (typeof password !== 'string' || password.trim() === '') {
            return {
                success: false,
                error: 'Password tidak boleh kosong'
            }
        }
        
        const userExists = this.getUsers().some(user => user.username.toLowerCase() === username.toLowerCase() && user.password === password);
        if (userExists) {
            return {
                success: true,
            }
        } else {
            return {
                success: false,
                error: 'Username atau password salah!'
            }
        }

    }
    
}