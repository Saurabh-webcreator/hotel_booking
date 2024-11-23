document.addEventListener('DOMContentLoaded', () => {
    const usersContainer = document.getElementById('users-container');

    // Function to retrieve users from localStorage
    function getUsersFromLocalStorage() {
        const usersData = localStorage.getItem('users');
        return usersData ? JSON.parse(usersData) : [];
    }


    // Function to display users
    function displayUsers() {
        const users = getUsersFromLocalStorage();
        usersContainer.innerHTML = ''; // Clear the container

        // Filter out the user with email "admin@123"
        const filteredUsers = users.filter(user => user.email !== "admin@gmail.com");

        filteredUsers.forEach((user, index) => {
            const userBox = document.createElement('div');
            userBox.className = 'user-box';
            userBox.innerHTML = `
            <h2>${user.fullName}</h2>
            <p>Email: ${user.email}</p>
            <p>Hotel Name: ${user.hotelName}</p>
            <p>Room Number: ${user.totalRooms}</p>
            <p>Contact Number: ${user.mobile}</p>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
            usersContainer.appendChild(userBox);
        });
    }

    // Function to delete a user
    function deleteUser(index) {
        let users = getUsersFromLocalStorage();
        users.splice(index, 1); // Remove the user at the given index
        localStorage.setItem('users', JSON.stringify(users)); // Update localStorage
        displayUsers(); // Refresh the UI
    }

    // Event delegation for delete buttons
    usersContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.getAttribute('data-index');
            deleteUser(index);
        }
    });

    // Initial display of users
    displayUsers();
});