const recordForm = document.getElementById('record-form');
const nameInput = document.getElementById('name');
const contactInput = document.getElementById('contact');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const recordList = document.getElementById('record-list');
const editIndexInput = document.getElementById('edit-index');

// Initialize records from local storage
let records = JSON.parse(localStorage.getItem('records')) || [];
console.log(records.length);

// Function to check for duplicate names
function isDuplicateName(email) {
  return records.some(
    (record) => record.email.toLowerCase() === email.toLowerCase()
  );
}

// Display records
function displayRecords() {
  recordList.innerHTML = '';
  console.log(records.length);
  if (records.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="8" style="text-align:center;color:red;">No Record Found</td>`;
    recordList.appendChild(row);
  } else {
    records.forEach((record, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${record.name}</td>
                    <td>${record.contact}</td>
                    <td>${record.email}</td>
                    <td>${record.password}</td>
                    <td>${record.date}</td>
                    <td><button onclick="editRecord(${index})">Edit</button></td>
                    <td class="deleteButton"><button onclick="deleteRecord(${index})">Delete</button></td>
                `;
      recordList.appendChild(row);
    });
  }
}

// Add or Update a record
recordForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = nameInput.value;
  const contact = contactInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const editIndex = parseInt(editIndexInput.value);

  if (name && contact && email && password) {
    if (isDuplicateName(email) && editIndex === -1) {
      alert('Login already exists.');
      return;
    }

    const currentDate = new Date().toLocaleString(); 
    if (editIndex === -1) {
      // Add a new record
      records.push({ name, contact, email, password, date: currentDate });
    } else {
      // Update an existing record
      records[editIndex] = { name, contact, email, password, date: currentDate };
      editIndexInput.value = -1;
    }

    localStorage.setItem('records', JSON.stringify(records));
    nameInput.value = '';
    contactInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    displayRecords();
  }
});

// Edit a record
function editRecord(index) {
  const recordToEdit = records[index];
  nameInput.value = recordToEdit.name;
  contactInput.value = recordToEdit.contact;
  emailInput.value = recordToEdit.email;
  passwordInput.value = recordToEdit.password;
  editIndexInput.value = index;
}

// Delete a record
function deleteRecord(index) {
  displayRecords();
  let delBtn = document.querySelectorAll('.deleteButton');
  console.log(delBtn);
  delBtn[
    index
  ].innerHTML = `<i id="yesBtn" onclick="confirmDelete(${index})" class="fa-solid fa-check"></i><i id="noBtn" onclick="resetDelete(${index})" class="fa-solid fa-xmark"></i>`;
}

function confirmDelete(index) {
  records.splice(index, 1);
  localStorage.setItem('records', JSON.stringify(records));
  displayRecords();
}

function resetDelete(index) {
  displayRecords();
}

// Initial display
displayRecords();