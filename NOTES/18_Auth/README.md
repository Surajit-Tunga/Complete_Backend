# Authentication & Authorization

## Authentication
- Authentication is the process of verfying the identity of a user or system accessing an application.
- It ensures that only authorized user can access protected resources & features.
- Authentication is crucial for security, protecting data & providing personalized experiences in web application.

## Authorization
- Authorization is the process of determining what actions a user is permitted to perform within an application.
- It ensures that users can access only the resources and functionalities they have permission for.
- Authorization enhances security by restricting access to sensitive data and operations, complementing the authentication process.

---

## Signup UI
1. Add the sginup button in the nav while logged out which points to /signup.
```js
<% if(!isLoggedIn) { %> 
    <a href="/login" class="text-white text-lg hover:underline">Log in</a>
    <a href="/signup" class="text-white text-lg hover:underline">Sign up</a>
   <% } else {%> 
     <form action="/logout" method="POST">
        <button
          type="submit"
          class="text-white text-lg hover:underline">
            Logout
        </button>
      </form>
<% } %> 
```
2. Make signup.ejs
3. Now Handle authRoutes & authController
```js
authRouter.get("/signup", getSignup);
authRouter.post("/signup", postSignup);

//---Controller
exports.getSignup = (req, res, next) => {
    res.render('auth/signup', { 
        pageTitle: "Sign Up",
        isLoggedIn: false
    });
};
exports.postSignup= (req, res, next) => {
    res.redirect('/');
}; 
```
- Imrove the UI using AI

<details>
   <summary>SignUp Page (click to expand)</summary>

```js
<%- include('../partials/head') %>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  </head>
  <body class="bg-gray-100">
    <%- include('../partials/header') %>
    <main class="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-md max-w-2xl">
      <h1 class="text-3xl font-bold mb-6 text-center text-gray-800 border-b pb-4">Create Your Account</h1>
      
      <form action="/signup" method="POST" class="max-w-md mx-auto">
 
        <!-- Name fields in a flex layout -->
        <div class="flex gap-4 mb-4">
          <div class="flex-1">
            <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <i class="fas fa-user"></i>
              </span>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="John"
                class="w-full pl-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                required />
            </div>
          </div>
          
          <div class="flex-1">
            <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                <i class="fas fa-user"></i>
              </span>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Doe"
                class="w-full pl-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition" />
            </div>
          </div>
        </div>
        
        <!-- Email field -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <i class="fas fa-envelope"></i>
            </span>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your.email@example.com"
              class="w-full pl-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              required />
          </div>
        </div>
        
        <!-- Password fields -->
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <i class="fas fa-lock"></i>
            </span>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
              class="w-full pl-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              required/>
          </div>
        </div>
        
        <div class="mb-5">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <i class="fas fa-lock"></i>
            </span>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Your Password"
              class="w-full pl-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              required/>
          </div>
        </div>

        <!-- User type selection with better styling -->
        <div class="mb-5 p-4 bg-gray-50 rounded-md border border-gray-200">
          <p class="text-sm font-medium text-gray-700 mb-2">I want to register as:</p>
          <div class="flex space-x-6">
            <label class="inline-flex items-center cursor-pointer">
              <input type="radio" name="userType" value="guest" id="guest" class="form-radio text-red-500 focus:ring-red-500"/>
              <span class="ml-2">Guest</span>
            </label>
            <label class="inline-flex items-center cursor-pointer">
              <input type="radio" name="userType" value="host" id="host" class="form-radio text-red-500 focus:ring-red-500"/>
              <span class="ml-2">Host</span>
            </label>
          </div>
        </div>

        <!-- Terms and conditions -->
        <div class="mb-6">
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" name="terms" id="terms" class="form-checkbox text-red-500 focus:ring-red-500" required />
            <span class="ml-2 text-gray-700">I agree to the <a href="#" class="text-red-500 hover:underline">terms and conditions</a></span>
          </label>
        </div> 

        <!-- Submit button with animation -->
        <button type="submit" class="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium transition duration-300 flex items-center justify-center">
          <span>Register</span>
          <i class="fas fa-arrow-right ml-2"></i>
        </button>
        
        <!-- Login link -->
        <p class="text-center mt-4 text-gray-600">
          Already have an account? <a href="/login" class="text-red-500 hover:underline">Log in</a>
        </p>
      </form>
    </main>
  </body>
</html>
```   
</details>

<details>
   <summary>Nav Bar (click to expand)</summary>
   
```js
<!-- Responsive Airbnb-style Navbar with Drawer for Small Screens -->
<div class="bg-red-600 shadow-md py-4 px-4 md:px-8">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl md:text-3xl font-bold text-white tracking-tight">Airbnb</h1>
    <!-- Hamburger Icon for Drawer -->
    <button id="menu-btn" class="md:hidden flex items-center px-2 py-1 border border-white rounded text-white focus:outline-none" aria-label="Open menu">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
    <!-- Desktop Nav -->
    <nav class="hidden md:flex gap-6 items-center">
      <a href="/" class="text-white text-lg font-medium hover:underline transition">Home</a>
      <% if(isLoggedIn) { %>  
        <a href="/bookings" class="text-white text-lg font-medium hover:underline transition">Bookings</a>
        <a href="/favourites" class="text-white text-lg font-medium hover:underline transition">Favourites</a>
        <a href="/host/host-home-list" class="text-white text-lg font-medium hover:underline transition">Host Homes</a>
        <a href="/host/add-home" class="text-white text-lg font-medium hover:underline transition">Add Home</a>
      <% } %> 
      <% if(!isLoggedIn) { %> 
        <a href="/login" class="text-white text-lg font-medium hover:underline transition">Log in</a>
        <a href="/signup" class="text-white text-lg font-medium hover:underline transition">Sign up</a>
      <% } else { %> 
        <form action="/logout" method="POST">
          <button
            type="submit"
            class="text-white text-lg font-medium hover:underline transition">
              Logout
          </button>
        </form>
      <% } %> 
    </nav>
  </div>
  <!-- Drawer Nav for Mobile -->
  <div id="drawer" class="fixed inset-0 z-40 bg-black bg-opacity-40 hidden">
    <div class="absolute top-0 left-0 w-64 h-full bg-white shadow-lg flex flex-col p-6 gap-4 animate-slideIn">
      <div class="flex justify-between items-center mb-4">
        <span class="text-xl font-bold text-red-600">Airbnb</span>
        <button id="close-drawer" class="text-gray-600 hover:text-red-600" aria-label="Close menu">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <a href="/" class="text-red-600 text-lg font-medium hover:underline transition">Home</a>
      <% if(isLoggedIn) { %>  
        <a href="/bookings" class="text-red-600 text-lg font-medium hover:underline transition">Bookings</a>
        <a href="/favourites" class="text-red-600 text-lg font-medium hover:underline transition">Favourites</a>
        <a href="/host/host-home-list" class="text-red-600 text-lg font-medium hover:underline transition">Host Homes</a>
        <a href="/host/add-home" class="text-red-600 text-lg font-medium hover:underline transition">Add Home</a>
      <% } %> 
      <% if(!isLoggedIn) { %> 
        <a href="/login" class="text-red-600 text-lg font-medium hover:underline transition">Log in</a>
        <a href="/signup" class="text-red-600 text-lg font-medium hover:underline transition">Sign up</a>
      <% } else { %> 
        <form action="/logout" method="POST">
          <button
            type="submit"
            class="text-red-600 text-lg font-medium hover:underline transition w-full text-left">
              Logout
          </button>
        </form>
      <% } %> 
    </div>
  </div>
  <style>
    @keyframes slideIn {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }
    .animate-slideIn { animation: slideIn 0.2s ease; }
  </style>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const menuBtn = document.getElementById('menu-btn');
      const drawer = document.getElementById('drawer');
      const closeDrawer = document.getElementById('close-drawer');
      if(menuBtn && drawer && closeDrawer) {
        menuBtn.addEventListener('click', () => {
          drawer.classList.remove('hidden');
        });
        closeDrawer.addEventListener('click', () => {
          drawer.classList.add('hidden');
        });
        drawer.addEventListener('click', (e) => {
          if(e.target === drawer) drawer.classList.add('hidden');
        });
      }
    });
  </script>
</div>
```
   
</details>   