document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var url = document.getElementById('urlInput').value;
    var dbName = document.getElementById('dbNameInput').value;
    var username = document.getElementById('usernameInput').value;
    var password = document.getElementById('passwordInput').value;
  
    // Perform authentication logic here
    fetch(url + '/web/session/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        params: {
          db: dbName,
          login: username,
          password: password
        }
      })
    })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Authentication failed');
      }
    })
    .then(function(data) {
      // Authentication successful
      document.getElementById('message').innerHTML = 'Hello, User!';
      // Perform any further actions or navigate to the home page
    })
    .catch(function(error) {
      // Authentication failed
      document.getElementById('message').innerHTML = 'Invalid credentials. Please check your input.';
      console.log('Error:', error);
    });
  });
  