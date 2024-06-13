document.getElementById('getCustomerListButton').addEventListener('click', getCustomerList);
async function authenticateUser() {
    const url = 'https://qa.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp';
    const loginData = {
        login_id: "test@sunbasedata.com",
        password: "Test@123"
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;  // Assuming the response has a token property
            localStorage.setItem('jwtToken', token);
            console.log('Authentication successful, token:', token);
        } else {
            console.error('Authentication failed');
        }
    } catch (error) {
        console.error('Error during authentication:', error);
    }
    const login =document.getElementById("login-screen");
    login.classList.add("hide");
    const form = document.getElementById("customer-list-screen")
    form.classList.remove("hide");
    Sync();
}

async function getCustomerList() {
    const url = 'https://qa.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list';
    const token = localStorage.getItem('jwtToken');

    if (!token) {
        alert('No token found, please authenticate first');
        return;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const customers = await response.json();
            console.log('Customer list:', customers);
            // Process or display the customer list
            displayCustomerList(customers);
        } else {
            console.error('Failed to fetch customer list');
        }
    } catch (error) {
        console.error('Error fetching customer list:', error);
    }
}

function displayCustomerList(customers) {
    const customerListDiv = document.getElementById('customerList');
    customerListDiv.innerHTML = '';

    customers.forEach(customer => {
        const customerDiv = document.createElement('div');
        customerDiv.innerHTML = `
            <p><strong>Name:</strong> ${customer.first_name} ${customer.last_name}</p>
            <p><strong>Email:</strong> ${customer.email}</p>
            <p><strong>Phone:</strong> ${customer.phone}</p>
        `;
        customerListDiv.appendChild(customerDiv);
    });
}
    
    
function updateTable(customers){
            const tbody = document.querySelector('#customer-table tbody');
            tbody.innerHTML = '';
            customers.forEach(customer => {
            const row = `<tr>
            <td>${customer.id}</td>
            <td>${customer.firstName}</td>
            <td>${customer.lastName}</td>
            <td>${customer.street}</td>
            <td>${customer.address}</td>
            <td>${customer.city}</td>
            <td>${customer.state}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>
                <button onclick="editCustomer(${customer.id})">Edit</button>
                <button onclick="deleteCustomer(${customer.id})">Delete</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
       
}

// delete customer from database

async function deleteCustomer(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8080/api/customers/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`  // Uncomment if your API requires a token
            }
        });

        if (response.ok) {
            await Sync();
            document.getElementById('response').innerHTML = `<p>Customer deleted successfully!</p>`;
        } else {
            const error = await response.json();
            document.getElementById('response').innerHTML = `<p>Error: ${error.message}</p>`;
        }
    } catch (error) {
        document.getElementById('response').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}
document.getElementById('deleteCustomerButton').addEventListener('click', () => {
    const customerId = getSelectedCustomerId(); // Implement this function to get the selected customer ID
    deleteCustomer(customerId);
});


function toggelForm(){
    const lsit = document.getElementById("customer-list-screen")
    lsit.classList.toggle("hide");
    const form = document.getElementById("add-customer-screen")
    form.classList.toggle("hide");

}

function toggleEditCustomer(){
    const lsit = document.getElementById("customer-list-screen")
    lsit.classList.toggle("hide");
    const form = document.getElementById("update-customer-screen")
    form.classList.toggle("hide");
}

// edit customer and save the updated customer in database by backend

function editCustomer(id){
    toggleEditCustomer();
    const update = document.getElementById("updateCustomer");
    update.addEventListener("click",async()=>{
    
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const street = document.getElementById('Street').value;
        const address = document.getElementById('Address').value;
        const city = document.getElementById('City').value;
        const state = document.getElementById('State').value;
        const email = document.getElementById('Email').value;
        const phone = document.getElementById('Phone').value;
        const customer = {
        firstName,
        lastName,
        street,
        address,
        city,
        state,
        email,
        phone
        };
        try {
            const response = await fetch(`http://127.0.0.1:8080/api/customers/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer)
            });
    
            if (response.ok) {
                const result = await response.json();
                Sync();
                document.getElementById('response').innerHTML = `<p>Customer added successfully! ID:</p>`;
                document.getElementById('customer-form').reset();
            } else {
                const error = await response.json();
                document.getElementById('response').innerHTML = `<p>Error: ${error.message}</p>`;
            }
        } catch (error) {
            document.getElementById('response').innerHTML = `<p>Error: ${error.message}</p>`;
        }
        toggleEditCustomer();
    })
}

// get customer by id

async function getCustomerById(){
    const id = document.getElementById("search").value;
    try {
        const response = await fetch(`http://127.0.0.1:8080/api/customers/get/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`  // Add this header if your API requires a token
            }
        });
        if(response.ok){
            const customer = await response.json();
            console.log(customer)
            const tbody = document.querySelector('#customer-table tbody');
            tbody.innerHTML = "";
            const row = `<tr>
            <td>${customer.id}</td>
            <td>${customer.firstName}</td>
            <td>${customer.lastName}</td>
            <td>${customer.street}</td>
            <td>${customer.address}</td>
            <td>${customer.city}</td>
            <td>${customer.state}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>
                <button onclick="editCustomer(${customer.id})">Edit</button>
                <button onclick="deleteCustomer(${customer.id})">Delete</button>
            </td>
         </tr>`;
            tbody.innerHTML += row;
            }
    
        else {
            const error = await response.json();
            document.getElementById('response').innerHTML = `<p>Error: ${error.message}</p>`;
        }
    } catch (error) {
        document.getElementById('response').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// sync the customer list by database

async function Sync(){
    try {
        const response = await fetch('http://127.0.0.1:8080/api/customers/getAll', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`  // Add this header if your API requires a token
            }
        });
        if(response.ok){
            const customers = await response.json();
            updateTable(customers)
             }
    
        else {
            const error = await response.json();
            document.getElementById('response').innerHTML = `<p>Error: ${error.message}</p>`;
        }
    } catch (error) {
        document.getElementById('response').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// add customer 

async function addCustomer() {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const street = document.getElementById('street').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const customer = {
        firstName,
        lastName,
        street,
        address,
        city,
        state,
        email,
        phone
    };

    try {
        const response = await fetch('http://127.0.0.1:8080/api/customers/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer)
        });

        if (response.ok) {
            const result = await response.json();
            Sync();
            document.getElementById('response').innerHTML = `<p>Customer added successfully! ID:</p>`;
            document.getElementById('customer-form').reset();
        } else {
            const error = await response.json();
            document.getElementById('response').innerHTML = `<p>Error: ${error.message}</p>`;
        }
    } catch (error) {
        document.getElementById('response').innerHTML = `<p>Error: ${error.message}</p>`;
    }
    toggelForm()
   
}

function showAddCustomerForm(){
    toggelForm()
}

