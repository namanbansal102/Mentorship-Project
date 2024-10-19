const logoutButton = document.querySelector('.logoutbtn');

document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('login-button');
    const userProfile = document.getElementById('user-profile');
    const navbarProfileImage = document.getElementById('navbar-profile-image');
    const navbarUserName = document.getElementById('navbar-user-name');

    function updateNavbar() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const profileImage = localStorage.getItem('profileImage');
        const userName = localStorage.getItem('userName');

        if (isLoggedIn === 'true') {
            loginButton.style.display = 'none';
            userProfile.style.display = 'flex';
            navbarProfileImage.src = profileImage || '/placeholder.svg?height=40&width=40';
            navbarUserName.textContent = userName || 'User';
            logoutButton.style.display = 'inline-block'; // Ensure logout button is visible
        } else {
            loginButton.style.display = 'flex';
            userProfile.style.display = 'none';
            logoutButton.style.display = 'none'; // Hide logout button
        }
    }

    // Call updateNavbar when the page loads
    updateNavbar();

    // Add event listener for login button
    loginButton.addEventListener('click', function(event) {
        event.preventDefault();
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            window.location.href = './login.html';
        }
    });

    // Logout functionality
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('profileImage');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        updateNavbar();
        window.location.href = './login.html';
    });
    // Prevent access to login page when logged in
    if (window.location.href.includes('login.html') && localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = './index.html';
    }

    // Prevent navigating back to the login page
    window.addEventListener('popstate', function(event) {
        if (localStorage.getItem('isLoggedIn') === 'true' && document.referrer.includes('./login.html')) {
            window.location.href = './index.html'; 
        }
    });

    if (localStorage.getItem('isLoggedIn') === 'true') {    
        history.replaceState(null, '', './index.html');
    }
});
