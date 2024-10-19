    const loginForm = document.getElementById('login-form');
    const loginButton = document.querySelector('.login-btn');

    window.onload = function() {
        const profileImage = localStorage.getItem('profileImage');
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');

        // Set profile image
        document.getElementById('profile-image').src = profileImage || './assets/defaultprofile.jpg';

        // Set name and email if available
        if (userName) {
            document.getElementById('name').value = userName;
        }

        if (userEmail) {
            document.getElementById('email').value = userEmail;
        }

        // Update navbar if user is logged in
        updateNavbar();
    };

    document.getElementById('file-input').addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const profileImage = document.getElementById('profile-image');
                profileImage.src = event.target.result; // Update profile image
                localStorage.setItem('profileImage', event.target.result); // Store in local storage
                console.log("Profile image updated.");
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('isLoggedIn', 'true');
        console.log("User information saved.");
        window.location.href = './index.html';
    });

    function updateNavbar() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const navbar = document.querySelector('.navbar'); // Assuming there's a navbar class

        if (isLoggedIn === 'true') {
            const loginButton = navbar.querySelector('.login-btn');
            if (loginButton) {
                loginButton.remove();
            }

            const userProfile = document.createElement('div');
            userProfile.className = 'user-profile';

            const profileImage = document.createElement('img');
            profileImage.src = localStorage.getItem('profileImage') || './assets/defaultprofile.jpg';
            profileImage.alt = 'User Profile';
            profileImage.className = 'profile-image';

            const userName = document.createElement('span');
            userName.textContent = localStorage.getItem('userName');
            userName.className = 'user-name';

            userProfile.appendChild(profileImage);
            userProfile.appendChild(userName);

            navbar.appendChild(userProfile);
        }
    }

    // Call updateNavbar when the page loads
    document.addEventListener('DOMContentLoaded', updateNavbar);
