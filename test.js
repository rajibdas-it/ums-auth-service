const currentId = (0).toString().padStart(5, '0')
const incrementId = (Number(currentId) + 1).toString().padStart(5, '0')
console.log(incrementId);