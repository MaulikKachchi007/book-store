<!DOCTYPE html>
<html lang="en">
<head>
    <title>Api Documentation</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>

<div class="container mt-3">
    <h2>Api Documentation</h2>
    <p>Read api documentation implementation</p>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>Endpoint</th>
            <th>Method</th>
            <th>Auth</th>
            <th>Required</th>
            <th>Optional</th>
            <th>Response</th>
            <th>Description</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th>User API</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>/api/register</td>
            <td>POST</td>
            <td>No</td>
            <td></td>
            <td></td>
            <td>User Register success message</td>
            <td>User can register</td>
        </tr>
        <tr>
            <td>/api/login</td>
            <td>POST</td>
            <td>No</td>
            <td></td>
            <td></td>
            <td>Logged User and token</td>
            <td>(User / Admin) Login</td>
        </tr>
        <tr>
            <td>/api/profile</td>
            <td>Get</td>
            <td>Yes</td>
            <td></td>
            <td></td>
            <td>get Logged User Profile</td>
            <td>Pass Logged User Token</td>
        </tr>
        <tr>
            <td>/api/update-profile</td>
            <td>POST</td>
            <td>Yes</td>
            <td></td>
            <td></td>
            <td>Update user profile and return message</td>
            <td>Pass Logged User Token</td>
        </tr>
        <tr>
            <td>/api/logout</td>
            <td>GET</td>
            <td>Yes</td>
            <td></td>
            <td></td>
            <td>Logout User</td>
            <td>Pass Logged User Token</td>
        </tr>
        <tr>
            <th>Books API (Admin Can able to (Create/Edit/Delete)</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>/api/books</td>
            <td>GET</td>
            <td>No</td>
            <td></td>
            <td>?page, ?limit, ?search, ?date</td>
            <td>List of books/td>
            <td>Get All Books in without user login</td>
        </tr>
        <tr>
            <td>/api/books</td>
            <td>POST</td>
            <td>Yes</td>
            <td>/id</td>
            <td></td>
            <td>Create a new Book and return response message</td>
            <td>Create a new Book</td>
        </tr>
        <tr>
            <td>/api/books/{id}</td>
            <td>GET</td>
            <td>Yes</td>
            <td>/id</td>
            <td></td>
            <td>GET Single book</td>
            <td>GET Book</td>
        </tr>
        <tr>
            <td>/api/books/{id}</td>
            <td>POST</td>
            <td>Yes</td>
            <td>/id</td>
            <td></td>
            <td>Update book and return book message response</td>
            <td>Update Book</td>
        </tr>
        <tr>
            <td>/api/books/{id}</td>
            <td>DELETE</td>
            <td>Yes</td>
            <td>/id</td>
            <td></td>
            <td>Delete user and return delete message response</td>
            <td>Delete Book</td>
        </tr>
        <tr>
            <th>Books API (Anyone can access api)</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>/api/get-all-books</td>
            <td>GET</td>
            <td>No</td>
            <td></td>
            <td>?page, ?limit, ?search, ?date</td>
            <td>List of books/td>
            <td>Get All Books in without user login</td>
        </tr>
        </tbody>
    </table>
</div>

</body>
</html>
