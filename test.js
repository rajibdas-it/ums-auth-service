// const currentId = (0).toString().padStart(5, '0')
// const incrementId = (Number(currentId) + 1).toString().padStart(5, '0')
// console.log(incrementId);



const myObj = { page: '1', limit: '5', sortBy: 'year', sortOrder: 'desc' }

const keys = ['page', 'limit', 'sortBy', 'sortOrder']

const myOutPut = {}

for (const key of keys) {
    if (myObj && Object.hasOwnProperty.call(myObj, key)) {
        myOutPut[key] = myObj[key]
    }
}

console.log(myOutPut);