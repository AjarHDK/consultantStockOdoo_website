import cgi
import xmlrpc.client as xmlrpclib
import urllib.parse as urlparse
from urllib.parse import urlencode

# Retrieve the form data
form = cgi.FieldStorage()
url = form.getvalue('url')
db = form.getvalue('db')
username = form.getvalue('username')
password = form.getvalue('password')

# Set up the connection with your Odoo instance
common = xmlrpclib.ServerProxy('{}/xmlrpc/2/common'.format(url))
uid = common.authenticate(db, username, password, {})

# Prepare the redirect URL with query parameters
params = {'message': ''}
if uid:
    params['message'] = 'Authentication successful!'
else:
    params['message'] = 'Authentication failed! Please check your credentials.'

redirect_url = 'index.html?' + urlencode(params)

# Redirect the user back to the HTML page
print('Status: 302 Found')
print('Location: ' + redirect_url)
print()
