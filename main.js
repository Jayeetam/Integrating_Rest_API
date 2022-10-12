function saveToLocalStorage(event) {
    event.preventDefault();
    const amount = event.target.username.value;
    const desc = event.target.emailId.value;
    const Category = event.target.Category.value;
    
    const obj = {
        amount,
        desc,
        Category
    }

    axios.post("https://crudcrud.com/api/5821ce68d51648ab944c7d8267197f97/ExpenseData",obj)
    .then((response) => {
        showNewUserOnScreen(response.data)
        
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4> Something Went Wrong </h4>"
        console.log(err)
    })
   
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/5821ce68d51648ab944c7d8267197f97/ExpenseData")
    .then((response) => {
        console.log(response)

        for(var i=0; i< response.data.length; i++){
            showNewUserOnScreen(response.data[i])
        }
    })
    .catch((error) => {
        console.log(error)
    })
  
})

function showNewUserOnScreen(user){
    document.getElementById('desc').value = '';
    document.getElementById('username').value = '';
    document.getElementById('Category').value ='';
   
    if(localStorage.getItem(user.desc) !== null){
        removeUserFromScreen(user.desc)
    }

    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${user._id}> ${user.amount} - ${user.desc} - ${user.Category}
                            <button onclick=deleteUser('${user._id}')> Delete Expense </button>
                            <button onclick=editUserDetails('${user.desc}','${user.amount}','${user.Category}','${user._id}')>Edit Expense </button>
                         </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}



function editUserDetails(emailId, amount, Category, userId){

    document.getElementById('desc').value = emailId;
    document.getElementById('username').value = amount;
    document.getElementById('Category').value =Category;

    deleteUser(userId)
 }



 function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/5821ce68d51648ab944c7d8267197f97/ExpenseData/${userId}`)
        .then((response) => {
            removeUserFromScreen(userId)
        })
        .catch((error) => {
            console.log(error)
        })


}

function removeUserFromScreen(userId){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(userId);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}