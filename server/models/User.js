
const fs = require('fs')

class User {
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
    getAllUser(){
        return this.users
    }

    addUser(user) {
        this.users.push(user)
        this.commit()
    }

    getUser(email) {
        const user = this.users.find(user => user.email === email)
        if (user === undefined) {
            return 'Unknown user'
        } else {
            return user
        }
    }
    deleteUser(email) {
        let idx = this.users.findIndex(item => item.email === email)
        this.users.splice(idx, 1)
        this.commit()
    }
    addFile(file, user) {
        if (!user.album) {
            user['album'] = [{ file, like: 0, comments: 0 }]
        } else {
            user.album.push({ file, like: 0, comments: 0 })

        }
        this.commit()
    }

    deleteFile(user, img) {
        let usr = this.users.find(item=>item.email === user.email)
        let idx = usr.album.findIndex(({file})=>file===img)
        usr.album.splice(idx,1)
        this.commit()
    }

    addLikes(user, img) {
        for (let i of user.album) {
            if (i.file === img) {
                i.like += 1
            }
        }
        this.commit()
    }


}

module.exports = User