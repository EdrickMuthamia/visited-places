// Contact constructor
function Contact(FirstName, LastName, PhoneNumber, Email) {
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.PhoneNumber = PhoneNumber;
    this.Email = Email;
}

// AddressBook constructor
function AddressBook() {
    this.contacts = [];
}

AddressBook.prototype.addContact = function(contact) {
    this.contacts.push(contact);
    this.displayContacts();
};

AddressBook.prototype.removeContact = function(index) {
    if (index > -1 && index < this.contacts.length) {
        this.contacts.splice(index, 1);
        this.displayContacts();
    }
};

AddressBook.prototype.displayContacts = function() {
    const contactList = document.getElementById('contacts');
    contactList.innerHTML = ''; 

    this.contacts.forEach((contact, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${contact.FirstName} ${contact.LastName} - ${contact.PhoneNumber} - ${contact.Email}`;

    
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            this.removeContact(index);
        });

        listItem.appendChild(removeButton);
        contactList.appendChild(listItem);
    });
};

const myAddressBook = new AddressBook();

document.getElementById('newContactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('newFirstName').value;
    const lastName = document.getElementById('newLastName').value;
    const phoneNumber = document.getElementById('newPhoneNumber').value;
    const email = document.getElementById('newEmail').value;

    if (firstName && lastName && phoneNumber && email) {
        const newContact = new Contact(firstName, lastName, phoneNumber, email);
        myAddressBook.addContact(newContact);

    
        document.getElementById('newFirstName').value = '';
        document.getElementById('newLastName').value = '';
        document.getElementById('newPhoneNumber').value = '';
        document.getElementById('newEmail').value = '';
    }
});