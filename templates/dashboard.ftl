<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Directory</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <header class="header">
        <h1>Employee Directory</h1>
        <div class="search-bar">
            <input type="text" id="searchInput" placeholder="Search by name or email">
            <button id="searchBtn">Filter</button>
        </div>
    </header>
    <div class="controls">
        <label for="sortSelect">Sort:</label>
        <select id="sortSelect">
            <option value="">--Select--</option>
            <option value="firstName">First Name</option>
            <option value="department">Department</option>
        </select>
        <label for="showSelect">Show:</label>
        <select id="showSelect">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>
        <button id="addEmployeeBtn" class="add-btn">Add Employee</button>
    </div>
    <aside class="filter-sidebar" id="filterSidebar">
        <h2>Filter Employees</h2>
        <label>First Name:<input type="text" id="filterFirstName"></label>
        <label>Department:<input type="text" id="filterDepartment"></label>
        <label>Role:<input type="text" id="filterRole"></label>
        <button id="applyFilterBtn">Apply</button>
        <button id="resetFilterBtn">Reset</button>
    </aside>
    <main>
        <div class="employee-list">
            <#list employees as emp>
            <div class="employee-card">
                <strong>${emp.firstName} ${emp.lastName}</strong><br>
                <b>Email:</b> ${emp.email}<br>
                <b>Department:</b> ${emp.department}<br>
                <b>Role:</b> ${emp.role}<br>
                <div class="card-actions">
                    <button class="edit-btn" data-id="${emp.id}">Edit</button>
                    <button class="delete-btn" data-id="${emp.id}">Delete</button>
                </div>
            </div>
            </#list>
        </div>
        <div class="pagination" id="pagination"></div>
    </main>
    <footer class="footer">
        &copy; 2025 Employee Directory App. All rights reserved.
    </footer>
    <script src="../js/app.js"></script>
</body>
</html> 