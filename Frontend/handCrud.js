editId = null;
let tableBody = document.getElementById('userTableBody');
async function loader(){
    const res = await fetch('/users');
    const users = await res.json();
    tableBody.innerHTML = users.map(user => {
        return `<tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.age}</td>
            <td>
                <button onclick="editUser('${user.name}','${user.email}','${user.age}','${user._id}')">Edit</button>
                <a href='/delete/${user._id}' onclick="return confirm('Are you sure to delete this one!')">Delete</a>
            </td>
        </tr>`
    }).join('');
}
// Edit User 
async function editUser(name,email,age,id)
{
    document.querySelector('[name=name]').value = name;
    document.querySelector('[name=email]').value = email;
    document.querySelector('[name=age]').value = age;
    editId = id;

}

//Handle form submit
document.getElementById("form").addEventListener('submit',function(e){
    if(editId)
    {
        e.preventDefault();
        let formData = new FormData(this);
        fetch(`/update/${editId}`,{
            method:'POST',
            body: new URLSearchParams(formData)
        })
        .then(()=>{
            editId=null;
            this.reset();
            loader();
        });
    }

});
loader();