export const loginHtml = `<div class="login-container">
<form id="login-form">
<h1>Login</h1>
            <div class="username">
                <label for="username-email">Username or Email</label>
                <input type="text" id="username-email"required>
            </div>
            <div>
                <label for="password">password</label>
                <input type="password" id="password" required>

            </div>
            <div id="error"></div>
            <button type="submit" >submit</button>
        </form>
    </div>`
     export const profilHtml = `<div id="header">
    <div id="user"></div>
    <div class="level-xp"> </div>
    <button id="log-out">Logout</button>
  </div>
     `