// Function to fetch and display expense details
function fetchAndDisplayDetails() {
    axios.get('http://localhost:3000/') // Assuming this endpoint retrieves expense details from the server
        .then(result => {
            const detailsList = document.getElementById('details');
            detailsList.innerHTML = ''; // Clear existing list items
            
            result.data.forEach(expense => {
                const newLi = document.createElement('li');
                newLi.textContent = `${expense.expenseAmount} - ${expense.chooseDescreption} - ${expense.chooseCategory}`;
                
                const deleteBtn = document.createElement('button');
                deleteBtn.setAttribute('class', 'delete-btn');
                deleteBtn.textContent = 'Delete Expense';
                deleteBtn.setAttribute('data-id', expense.id); // Assuming expense object has an 'id' property
                
                const editBtn = document.createElement('button');
                editBtn.setAttribute('class', 'edit-btn');
                editBtn.textContent = 'Edit Expense';
                editBtn.setAttribute('data-id', expense.id); // Set data-id attribute for identifying the expense to edit
                
                newLi.appendChild(deleteBtn);
                newLi.appendChild(editBtn);
                detailsList.appendChild(newLi);
            });
        })
        .catch(err => console.error('Error fetching expense details:', err));
}

// Event listener for page load
window.addEventListener('load', function () {
    fetchAndDisplayDetails(); // Fetch and display expense details when the page loads
});

// Event listener for form submission
document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    
    const expenseDetails = {
        expenseAmount: event.target.expenseAmount.value,
        chooseDescreption: event.target.chooseDescreption.value,
        chooseCategory: event.target.chooseCategory.value
    };

    axios.post('http://localhost:3000/', expenseDetails)
        .then(result => {
            console.log('Expense added:', result.data);
            fetchAndDisplayDetails(); // Fetch and display updated expense details after adding
            document.getElementById('form').reset(); // Reset the form
        })
        .catch(err => console.error('Error adding expense:', err));
});

// Event listener for delete and edit buttons (delegate to parent)
document.getElementById('details').addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
        event.preventDefault(); // Prevent default button behavior
        
        const userId = event.target.getAttribute('data-id');
        axios.delete(`http://localhost:3000/${userId}`)
            .then(result => {
                console.log('Expense deleted:', userId);
                fetchAndDisplayDetails(); // Fetch and display updated expense details after deletion
            })
            .catch(err => console.error('Error deleting expense:', err));
    } else if (event.target.classList.contains('edit-btn')) {
        event.preventDefault(); // Prevent default button behavior
        
        const userId = event.target.getAttribute('data-id');
        const parentLi = event.target.parentElement;
        
        // Create input fields for editing
        const editForm = document.createElement('form');
        
        const amountInput = document.createElement('input');
        amountInput.type = 'number';
        amountInput.name = 'expenseAmount';
        amountInput.value = parentLi.dataset.expenseAmount; // Assuming dataset is used to store expense details
        
        const descriptionInput = document.createElement('input');
        descriptionInput.type = 'text';
        descriptionInput.name = 'chooseDescreption';
        descriptionInput.value = parentLi.dataset.chooseDescreption;
        
        const categoryInput = document.createElement('input');
        categoryInput.type = 'text';
        categoryInput.name = 'chooseCategory';
        categoryInput.value = parentLi.dataset.chooseCategory;
        
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.textContent = 'Save Changes';
        
        editForm.appendChild(amountInput);
        editForm.appendChild(descriptionInput);
        editForm.appendChild(categoryInput);
        editForm.appendChild(submitBtn);
        
        // Replace the list item with the edit form
        parentLi.innerHTML = '';
        parentLi.appendChild(editForm);
        
        // Event listener for form submission (edit)
        editForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const updatedExpense = {
                expenseAmount: amountInput.value,
                chooseDescreption: descriptionInput.value,
                chooseCategory: categoryInput.value
            };
            
            axios.put(`http://localhost:3000/${userId}`, updatedExpense)
                .then(result => {
                    console.log('Expense updated:', result.data);
                    fetchAndDisplayDetails(); // Fetch and display updated expense details after edit
                })
                .catch(err => console.error('Error updating expense:', err));
        });
    }
});