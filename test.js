const uid = Symbol('uid');
console.log(uid);

const user = {
    [uid]: 'p1',
    name: 'Max',
    age: 30
}

user[uid] = 'bah bah'

user.id = 'p2'

console.log(user)