
const fs = require('fs')

class Registration {
    constructor() {
        this.users = []
        this.fill()
    }

    fill() {
        fs.readFile('../users.json', function (err, data) {
            if (err) {
                return 'there is an error'
            } else {
                this.users = JSON.parse(data)
            }
        }.bind(this))
    }

    commit() {
        fs.writeFile('../users.json', JSON.stringify(this.users, null, 2), (err) => {
            if (err) {
                console.log(err)
            }
            console.log('successfully saved')
        })
    }


    addUser(user) {
        this.users.push(user)
        this.commit()
    }

    getUser(email,password){
        const user = this.users.find(user=>user.email === email && user.password === password)
        if(user ===undefined){
            return 'User does not exists'
        }else{
            return user
        }
    }
}



module.exports = Registration