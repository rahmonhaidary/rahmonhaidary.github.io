# rahmonhaidary.github.io
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>University Life Tracker</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary: #6366f1;
            --primary-dark: #4f46e5;
            --secondary: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
            --dark: #1e1b4b;
            --light: #f8fafc;
            --gray: #64748b;
            --card-bg: #ffffff;
            --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
        }

        header {
            background: var(--card-bg);
            border-radius: 20px;
            padding: 25px 35px;
            margin-bottom: 25px;
            box-shadow: var(--shadow);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .logo-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--primary), #8b5cf6);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }

        .logo h1 {
            color: var(--dark);
            font-size: 1.8rem;
        }

        .logo span {
            color: var(--gray);
            font-size: 0.9rem;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .user-info input {
            padding: 10px 15px;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            font-size: 1rem;
            width: 200px;
        }

        .user-info input:focus {
            outline: none;
            border-color: var(--primary);
        }

        nav {
            background: var(--card-bg);
            border-radius: 15px;
            padding: 10px;
            margin-bottom: 25px;
            box-shadow: var(--shadow);
            display: flex;
            gap: 10px;
            overflow-x: auto;
            flex-wrap: wrap;
        }

        .nav-btn {
            padding: 12px 25px;
            border: none;
            border-radius: 10px;
            background: transparent;
            color: var(--gray);
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 8px;
            white-space: nowrap;
        }

        .nav-btn:hover {
            background: #f1f5f9;
        }

        .nav-btn.active {
            background: var(--primary);
            color: white;
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin-bottom: 25px;
        }

        .stat-card {
            background: var(--card-bg);
            border-radius: 15px;
            padding: 25px;
            box-shadow: var(--shadow);
        }

        .stat-card h3 {
            color: var(--gray);
            font-size: 0.9rem;
            margin-bottom: 10px;
        }

        .stat-card .value {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--dark);
        }

        .stat-card .sub {
            color: var(--gray);
            font-size: 0.85rem;
            margin-top: 5px;
        }

        .stat-card.gpa .value { color: var(--primary); }
        .stat-card.courses .value { color: var(--secondary); }
        .stat-card.tasks .value { color: var(--warning); }
        .stat-card.budget .value { color: var(--danger); }

        .card {
            background: var(--card-bg);
            border-radius: 15px;
            padding: 25px;
            box-shadow: var(--shadow);
            margin-bottom: 20px;
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            flex-wrap: wrap;
            gap: 15px;
        }

        .card-header h2 {
            color: var(--dark);
            font-size: 1.4rem;
        }

        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.95rem;
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .btn-primary {
            background: var(--primary);
            color: white;
        }

        .btn-primary:hover {
            background: var(--primary-dark);
        }

        .btn-secondary {
            background: #e2e8f0;
            color: var(--dark);
        }

        .btn-danger {
            background: var(--danger);
            color: white;
        }

        .btn-success {
            background: var(--secondary);
            color: white;
        }

        .btn-small {
            padding: 6px 12px;
            font-size: 0.85rem;
        }

        /* Forms */
        .form-group {
            margin-bottom: 15px;
        }

        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: var(--dark);
            font-weight: 500;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 1rem;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary);
        }

        .form-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }

        /* Modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .modal.active {
            display: flex;
        }

        .modal-content {
            background: var(--card-bg);
            border-radius: 20px;
            padding: 30px;
            width: 100%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .modal-header h2 {
            color: var(--dark);
        }

        .close-btn {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--gray);
        }

        /* Tables */
        .table-wrapper {
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }

        th {
            background: #f8fafc;
            color: var(--dark);
            font-weight: 600;
        }

        tr:hover {
            background: #f8fafc;
        }

        /* Course Card */
        .course-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
        }

        .course-card {
            background: linear-gradient(135deg, var(--primary), #8b5cf6);
            border-radius: 15px;
            padding: 20px;
            color: white;
            position: relative;
            overflow: hidden;
        }

        .course-card::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
        }

        .course-card h3 {
            font-size: 1.3rem;
            margin-bottom: 5px;
        }

        .course-card .code {
            opacity: 0.8;
            font-size: 0.9rem;
            margin-bottom: 15px;
        }

        .course-card .details {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            margin-top: 15px;
        }

        .course-card .grade {
            font-size: 2rem;
            font-weight: 700;
            position: absolute;
            right: 20px;
            top: 20px;
        }

        .course-card .actions {
            margin-top: 15px;
            display: flex;
            gap: 10px;
        }

        .course-card .btn {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            padding: 8px 15px;
        }

        .course-card .btn:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        /* Assignment List */
        .assignment-item {
            display: flex;
            align-items: center;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 10px;
            background: #f8fafc;
            gap: 15px;
        }

        .assignment-item.completed {
            opacity: 0.6;
        }

        .assignment-item .checkbox {
            width: 24px;
            height: 24px;
            border: 2px solid var(--primary);
            border-radius: 6px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .assignment-item.completed .checkbox {
            background: var(--secondary);
            border-color: var(--secondary);
        }

        .assignment-item .info {
            flex: 1;
        }

        .assignment-item .title {
            font-weight: 600;
            color: var(--dark);
        }

        .assignment-item.completed .title {
            text-decoration: line-through;
        }

        .assignment-item .meta {
            font-size: 0.85rem;
            color: var(--gray);
            margin-top: 3px;
        }

        .assignment-item .due {
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
        }

        .due.urgent {
            background: #fef2f2;
            color: var(--danger);
        }

        .due.soon {
            background: #fffbeb;
            color: var(--warning);
        }

        .due.later {
            background: #f0fdf4;
            color: var(--secondary);
        }

        .priority {
            padding: 3px 8px;
            border-radius: 5px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
        }

        .priority.high { background: #fef2f2; color: var(--danger); }
        .priority.medium { background: #fffbeb; color: var(--warning); }
        .priority.low { background: #f0fdf4; color: var(--secondary); }

        /* Schedule */
        .schedule-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 10px;
        }

        .day-column {
            background: #f8fafc;
            border-radius: 10px;
            padding: 15px;
            min-height: 400px;
        }

        .day-column h4 {
            text-align: center;
            margin-bottom: 15px;
            color: var(--dark);
            padding-bottom: 10px;
            border-bottom: 2px solid #e2e8f0;
        }

        .schedule-item {
            background: linear-gradient(135deg, var(--primary), #8b5cf6);
            color: white;
            border-radius: 8px;
            padding: 10px;
            margin-bottom: 10px;
            font-size: 0.85rem;
        }

        .schedule-item .time {
            opacity: 0.8;
            font-size: 0.75rem;
        }

        .schedule-item .course-name {
            font-weight: 600;
            margin: 5px 0;
        }

        .schedule-item .location {
            opacity: 0.8;
            font-size: 0.75rem;
        }

        /* Study Timer */
        .timer-container {
            text-align: center;
            padding: 40px;
        }

        .timer-display {
            font-size: 5rem;
            font-weight: 700;
            color: var(--dark);
            margin: 30px 0;
            font-family: 'Courier New', monospace;
        }

        .timer-buttons {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }

        .timer-buttons .btn {
            padding: 15px 40px;
            font-size: 1.1rem;
        }

        .timer-presets {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }

        .preset-btn {
            padding: 10px 20px;
            border: 2px solid var(--primary);
            border-radius: 25px;
            background: transparent;
            color: var(--primary);
            cursor: pointer;
            transition: all 0.3s;
        }

        .preset-btn:hover,
        .preset-btn.active {
            background: var(--primary);
            color: white;
        }

        .study-log {
            margin-top: 30px;
            text-align: left;
        }

        .log-item {
            display: flex;
            justify-content: space-between;
            padding: 12px;
            background: #f8fafc;
            border-radius: 8px;
            margin-bottom: 8px;
        }

        /* Budget */
        .budget-overview {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 25px;
        }

        .budget-card {
            background: linear-gradient(135deg, var(--secondary), #059669);
            color: white;
            border-radius: 15px;
            padding: 20px;
            text-align: center;
        }

        .budget-card.expenses {
            background: linear-gradient(135deg, var(--danger), #dc2626);
        }

        .budget-card.remaining {
            background: linear-gradient(135deg, var(--primary), #4f46e5);
        }

        .budget-card h4 {
            opacity: 0.8;
            font-size: 0.9rem;
            margin-bottom: 10px;
        }

        .budget-card .amount {
            font-size: 2rem;
            font-weight: 700;
        }

        .expense-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            background: #f8fafc;
            border-radius: 10px;
            margin-bottom: 10px;
        }

        .expense-item .category {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .expense-item .icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
        }

        .expense-item .amount {
            font-weight: 600;
            color: var(--danger);
        }

        /* Progress Bar */
        .progress-bar {
            height: 8px;
            background: #e2e8f0;
            border-radius: 4px;
            overflow: hidden;
            margin-top: 10px;
        }

        .progress-bar .fill {
            height: 100%;
            background: var(--primary);
            border-radius: 4px;
            transition: width 0.3s;
        }

        /* GPA Calculator */
        .gpa-display {
            text-align: center;
            padding: 30px;
            background: linear-gradient(135deg, var(--primary), #8b5cf6);
            border-radius: 15px;
            color: white;
            margin-bottom: 25px;
        }

        .gpa-display h3 {
            opacity: 0.8;
            margin-bottom: 10px;
        }

        .gpa-display .gpa-value {
            font-size: 4rem;
            font-weight: 700;
        }

        .gpa-display .gpa-sub {
            opacity: 0.8;
            margin-top: 10px;
        }

        /* Empty State */
        .empty-state {
            text-align: center;
            padding: 50px;
            color: var(--gray);
        }

        .empty-state .icon {
            font-size: 4rem;
            margin-bottom: 20px;
        }

        /* Filter buttons */
        .filter-group {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .filter-btn {
            padding: 8px 16px;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            background: white;
            cursor: pointer;
            transition: all 0.3s;
        }

        .filter-btn.active {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
        }

        @media (max-width: 768px) {
            .schedule-grid {
                grid-template-columns: 1fr;
            }
            
            .timer-display {
                font-size: 3rem;
            }
            
            header {
                flex-direction: column;
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="logo">
                <div class="logo-icon">🎓</div>
                <div>
                    <h1>UniTracker</h1>
                    <span>Your University Life Companion</span>
                </div>
            </div>
            <div class="user-info">
                <input type="text" id="studentName" placeholder="Your Name" />
                <input type="text" id="semester" placeholder="Current Semester" />
            </div>
        </header>

        <nav>
            <button class="nav-btn active" data-tab="dashboard">📊 Dashboard</button>
            <button class="nav-btn" data-tab="courses">📚 Courses</button>
            <button class="nav-btn" data-tab="assignments">📝 Assignments</button>
            <button class="nav-btn" data-tab="schedule">📅 Schedule</button>
            <button class="nav-btn" data-tab="gpa">🎯 GPA Calculator</button>
            <button class="nav-btn" data-tab="timer">⏱️ Study Timer</button>
            <button class="nav-btn" data-tab="budget">💰 Budget</button>
        </nav>

        <!-- Dashboard -->
        <div id="dashboard" class="tab-content active">
            <div class="dashboard-grid">
                <div class="stat-card gpa">
                    <h3>Current GPA</h3>
                    <div class="value" id="dashGPA">0.00</div>
                    <div class="sub">Out of 4.0</div>
                </div>
                <div class="stat-card courses">
                    <h3>Active Courses</h3>
                    <div class="value" id="dashCourses">0</div>
                    <div class="sub" id="dashCredits">0 Credits</div>
                </div>
                <div class="stat-card tasks">
                    <h3>Pending Tasks</h3>
                    <div class="value" id="dashTasks">0</div>
                    <div class="sub" id="dashUrgent">0 Due Soon</div>
                </div>
                <div class="stat-card budget">
                    <h3>Monthly Budget</h3>
                    <div class="value" id="dashBudget">$0</div>
                    <div class="sub" id="dashSpent">$0 Spent</div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h2>📅 Upcoming Deadlines</h2>
                </div>
                <div id="upcomingDeadlines">
                    <div class="empty-state">
                        <div class="icon">📝</div>
                        <p>No upcoming deadlines</p>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h2>📊 Study Statistics</h2>
                </div>
                <div id="studyStats">
                    <p>Total Study Time This Week: <strong id="weeklyStudy">0h 0m</strong></p>
                </div>
            </div>
        </div>

        <!-- Courses -->
        <div id="courses" class="tab-content">
            <div class="card">
                <div class="card-header">
                    <h2>📚 My Courses</h2>
                    <button class="btn btn-primary" onclick="openModal('courseModal')">+ Add Course</button>
                </div>
                <div class="course-grid" id="courseList">
                    <div class="empty-state">
                        <div class="icon">📚</div>
                        <p>No courses added yet</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Assignments -->
        <div id="assignments" class="tab-content">
            <div class="card">
                <div class="card-header">
                    <h2>📝 Assignments & Tasks</h2>
                    <button class="btn btn-primary" onclick="openModal('assignmentModal')">+ Add Task</button>
                </div>
                <div class="filter-group">
                    <button class="filter-btn active" data-filter="all">All</button>
                    <button class="filter-btn" data-filter="pending">Pending</button>
                    <button class="filter-btn" data-filter="completed">Completed</button>
                    <button class="filter-btn" data-filter="high">High Priority</button>
                </div>
                <div id="assignmentList">
                    <div class="empty-state">
                        <div class="icon">📝</div>
                        <p>No assignments yet</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Schedule -->
        <div id="schedule" class="tab-content">
            <div class="card">
                <div class="card-header">
                    <h2>📅 Weekly Schedule</h2>
                    <button class="btn btn-primary" onclick="openModal('scheduleModal')">+ Add Class</button>
                </div>
                <div class="schedule-grid" id="scheduleGrid">
                    <div class="day-column">
                        <h4>Monday</h4>
                        <div class="day-classes" data-day="monday"></div>
                    </div>
                    <div class="day-column">
                        <h4>Tuesday</h4>
                        <div class="day-classes" data-day="tuesday"></div>
                    </div>
                    <div class="day-column">
                        <h4>Wednesday</h4>
                        <div class="day-classes" data-day="wednesday"></div>
                    </div>
                    <div class="day-column">
                        <h4>Thursday</h4>
                        <div class="day-classes" data-day="thursday"></div>
                    </div>
                    <div class="day-column">
                        <h4>Friday</h4>
                        <div class="day-classes" data-day="friday"></div>
                    </div>
                    <div class="day-column">
                        <h4>Saturday</h4>
                        <div class="day-classes" data-day="saturday"></div>
                    </div>
                    <div class="day-column">
                        <h4>Sunday</h4>
                        <div class="day-classes" data-day="sunday"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- GPA Calculator -->
        <div id="gpa" class="tab-content">
            <div class="gpa-display">
                <h3>Cumulative GPA</h3>
                <div class="gpa-value" id="calculatedGPA">0.00</div>
                <div class="gpa-sub">Based on <span id="totalCreditsGPA">0</span> credits</div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h2>📊 Grade Breakdown</h2>
                </div>
                <div class="table-wrapper">
                    <table id="gpaTable">
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Credits</th>
                                <th>Grade</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Study Timer -->
        <div id="timer" class="tab-content">
            <div class="card">
                <div class="timer-container">
                    <h2>⏱️ Study Timer</h2>
                    <div class="timer-presets">
                        <button class="preset-btn" data-minutes="25">Pomodoro (25m)</button>
                        <button class="preset-btn" data-minutes="45">Study (45m)</button>
                        <button class="preset-btn" data-minutes="60">Focus (60m)</button>
                        <button class="preset-btn" data-minutes="5">Break (5m)</button>
                    </div>
                    <div class="timer-display" id="timerDisplay">25:00</div>
                    <div class="timer-buttons">
                        <button class="btn btn-success" id="startTimer">▶ Start</button>
                        <button class="btn btn-secondary" id="pauseTimer">⏸ Pause</button>
                        <button class="btn btn-danger" id="resetTimer">🔄 Reset</button>
                    </div>
                    <div class="form-group" style="max-width: 300px; margin: 0 auto;">
                        <label>What are you studying?</label>
                        <input type="text" id="studySubject" placeholder="Enter subject...">
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h2>📊 Study Log</h2>
                    <button class="btn btn-secondary" onclick="clearStudyLog()">Clear Log</button>
                </div>
                <div class="study-log" id="studyLog">
                    <div class="empty-state">
                        <div class="icon">📖</div>
                        <p>No study sessions logged yet</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Budget -->
        <div id="budget" class="tab-content">
            <div class="budget-overview">
                <div class="budget-card">
                    <h4>Monthly Budget</h4>
                    <div class="amount" id="totalBudget">$0</div>
                </div>
                <div class="budget-card expenses">
                    <h4>Total Expenses</h4>
                    <div class="amount" id="totalExpenses">$0</div>
                </div>
                <div class="budget-card remaining">
                    <h4>Remaining</h4>
                    <div class="amount" id="remainingBudget">$0</div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h2>💰 Budget Settings</h2>
                </div>
                <div class="form-group" style="max-width: 300px;">
                    <label>Monthly Budget ($)</label>
                    <input type="number" id="monthlyBudgetInput" placeholder="Enter budget" onchange="updateBudget()">
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h2>📝 Expenses</h2>
                    <button class="btn btn-primary" onclick="openModal('expenseModal')">+ Add Expense</button>
                </div>
                <div id="expenseList">
                    <div class="empty-state">
                        <div class="icon">💸</div>
                        <p>No expenses recorded</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Course Modal -->
    <div class="modal" id="courseModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Add Course</h2>
                <button class="close-btn" onclick="closeModal('courseModal')">&times;</button>
            </div>
            <form id="courseForm">
                <div class="form-group">
                    <label>Course Name</label>
                    <input type="text" id="courseName" required placeholder="e.g., Introduction to Computer Science">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Course Code</label>
                        <input type="text" id="courseCode" required placeholder="e.g., CS101">
                    </div>
                    <div class="form-group">
                        <label>Credits</label>
                        <input type="number" id="courseCredits" required min="1" max="10" placeholder="3">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Instructor</label>
                        <input type="text" id="courseInstructor" placeholder="Dr. Smith">
                    </div>
                    <div class="form-group">
                        <label>Current Grade</label>
                        <select id="courseGrade">
                            <option value="">Not graded</option>
                            <option value="4.0">A (4.0)</option>
                            <option value="3.7">A- (3.7)</option>
                            <option value="3.3">B+ (3.3)</option>
                            <option value="3.0">B (3.0)</option>
                            <option value="2.7">B- (2.7)</option>
                            <option value="2.3">C+ (2.3)</option>
                            <option value="2.0">C (2.0)</option>
                            <option value="1.7">C- (1.7)</option>
                            <option value="1.3">D+ (1.3)</option>
                            <option value="1.0">D (1.0)</option>
                            <option value="0.0">F (0.0)</option>
                        </select>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Add Course</button>
            </form>
        </div>
    </div>

    <!-- Assignment Modal -->
    <div class="modal" id="assignmentModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Add Assignment</h2>
                <button class="close-btn" onclick="closeModal('assignmentModal')">&times;</button>
            </div>
            <form id="assignmentForm">
                <div class="form-group">
                    <label>Assignment Title</label>
                    <input type="text" id="assignmentTitle" required placeholder="e.g., Research Paper">
                </div>
                <div class="form-group">
                    <label>Course</label>
                    <select id="assignmentCourse" required>
                        <option value="">Select Course</option>
                    </select>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Due Date</label>
                        <input type="date" id="assignmentDue" required>
                    </div>
                    <div class="form-group">
                        <label>Priority</label>
                        <select id="assignmentPriority" required>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea id="assignmentDesc" rows="3" placeholder="Assignment details..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Add Assignment</button>
            </form>
        </div>
    </div>

    <!-- Schedule Modal -->
    <div class="modal" id="scheduleModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Add Class to Schedule</h2>
                <button class="close-btn" onclick="closeModal('scheduleModal')">&times;</button>
            </div>
            <form id="scheduleForm">
                <div class="form-group">
                    <label>Course</label>
                    <select id="scheduleCourse" required>
                        <option value="">Select Course</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Day</label>
                    <select id="scheduleDay" required>
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                        <option value="saturday">Saturday</option>
                        <option value="sunday">Sunday</option>
                    </select>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Start Time</label>
                        <input type="time" id="scheduleStart" required>
                    </div>
                    <div class="form-group">
                        <label>End Time</label>
                        <input type="time" id="scheduleEnd" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" id="scheduleLocation" placeholder="e.g., Room 101, Building A">
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Add to Schedule</button>
            </form>
        </div>
    </div>

    <!-- Expense Modal -->
    <div class="modal" id="expenseModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Add Expense</h2>
                <button class="close-btn" onclick="closeModal('expenseModal')">&times;</button>
            </div>
            <form id="expenseForm">
                <div class="form-group">
                    <label>Description</label>
                    <input type="text" id="expenseDesc" required placeholder="e.g., Textbooks">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Amount ($)</label>
                        <input type="number" id="expenseAmount" required min="0" step="0.01" placeholder="0.00">
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <select id="expenseCategory" required>
                            <option value="food">🍔 Food</option>
                            <option value="books">📚 Books</option>
                            <option value="transport">🚗 Transport</option>
                            <option value="entertainment">🎮 Entertainment</option>
                            <option value="supplies">✏️ Supplies</option>
                            <option value="other">📦 Other</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="date" id="expenseDate" required>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%;">Add Expense</button>
            </form>
        </div>
    </div>

    <script>
        // Data Management
        let data = {
            student: { name: '', semester: '' },
            courses: [],
            assignments: [],
            schedule: [],
            expenses: [],
            studyLog: [],
            budget: 0
        };

        // Load data from localStorage
        function loadData() {
            const saved = localStorage.getItem('uniTrackerData');
            if (saved) {
                data = JSON.parse(saved);
                document.getElementById('studentName').value = data.student.name;
                document.getElementById('semester').value = data.student.semester;
                document.getElementById('monthlyBudgetInput').value = data.budget;
            }
        }

        // Save data to localStorage
        function saveData() {
            data.student.name = document.getElementById('studentName').value;
            data.student.semester = document.getElementById('semester').value;
            localStorage.setItem('uniTrackerData', JSON.stringify(data));
        }

        // Tab Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(btn.dataset.tab).classList.add('active');
            });
        });

        // Modal Functions
        function openModal(id) {
            document.getElementById(id).classList.add('active');
            if (id === 'assignmentModal' || id === 'scheduleModal') {
                updateCourseDropdowns();
            }
        }

        function closeModal(id) {
            document.getElementById(id).classList.remove('active');
        }

        // Close modal when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });

        // Course Management
        document.getElementById('courseForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const course = {
                id: Date.now(),
                name: document.getElementById('courseName').value,
                code: document.getElementById('courseCode').value,
                credits: parseInt(document.getElementById('courseCredits').value),
                instructor: document.getElementById('courseInstructor').value,
                grade: document.getElementById('courseGrade').value
            };
            data.courses.push(course);
            saveData();
            renderCourses();
            updateDashboard();
            updateGPA();
            closeModal('courseModal');
            e.target.reset();
        });

        function renderCourses() {
            const container = document.getElementById('courseList');
            if (data.courses.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="icon">📚</div>
                        <p>No courses added yet</p>
                    </div>
                `;
                return;
            }
            container.innerHTML = data.courses.map(course => {
                const gradeDisplay = course.grade ? getGradeLetter(parseFloat(course.grade)) : '-';
                return `
                    <div class="course-card">
                        <h3>${course.name}</h3>
                        <div class="code">${course.code}</div>
                        <div class="grade">${gradeDisplay}</div>
                        <div class="details">
                            <span>👤 ${course.instructor || 'TBA'}</span>
                            <span>📊 ${course.credits} Credits</span>
                        </div>
                        <div class="actions">
                            <button class="btn btn-small" onclick="editCourse(${course.id})">✏️ Edit</button>
                            <button class="btn btn-small" onclick="deleteCourse(${course.id})">🗑️ Delete</button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function getGradeLetter(points) {
            if (points >= 4.0) return 'A';
            if (points >= 3.7) return 'A-';
            if (points >= 3.3) return 'B+';
            if (points >= 3.0) return 'B';
            if (points >= 2.7) return 'B-';
            if (points >= 2.3) return 'C+';
            if (points >= 2.0) return 'C';
            if (points >= 1.7) return 'C-';
            if (points >= 1.3) return 'D+';
            if (points >= 1.0) return 'D';
            return 'F';
        }

        function deleteCourse(id) {
            if (confirm('Are you sure you want to delete this course?')) {
                data.courses = data.courses.filter(c => c.id !== id);
                data.assignments = data.assignments.filter(a => a.courseId !== id);
                data.schedule = data.schedule.filter(s => s.courseId !== id);
                saveData();
                renderCourses();
                renderAssignments();
                renderSchedule();
                updateDashboard();
                updateGPA();
            }
        }

        function editCourse(id) {
            const course = data.courses.find(c => c.id === id);
            if (!course) return;
            
            document.getElementById('courseName').value = course.name;
            document.getElementById('courseCode').value = course.code;
            document.getElementById('courseCredits').value = course.credits;
            document.getElementById('courseInstructor').value = course.instructor;
            document.getElementById('courseGrade').value = course.grade;
            
            deleteCourse(id);
            openModal('courseModal');
        }

        // Assignment Management
        document.getElementById('assignmentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const assignment = {
                id: Date.now(),
                title: document.getElementById('assignmentTitle').value,
                courseId: parseInt(document.getElementById('assignmentCourse').value),
                dueDate: document.getElementById('assignmentDue').value,
                priority: document.getElementById('assignmentPriority').value,
                description: document.getElementById('assignmentDesc').value,
                completed: false
            };
            data.assignments.push(assignment);
            saveData();
            renderAssignments();
            updateDashboard();
            closeModal('assignmentModal');
            e.target.reset();
        });

        function renderAssignments(filter = 'all') {
            const container = document.getElementById('assignmentList');
            let assignments = [...data.assignments];
            
            // Apply filter
            if (filter === 'pending') {
                assignments = assignments.filter(a => !a.completed);
            } else if (filter === 'completed') {
                assignments = assignments.filter(a => a.completed);
            } else if (filter === 'high') {
                assignments = assignments.filter(a => a.priority === 'high');
            }
            
            // Sort by due date
            assignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            
            if (assignments.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="icon">📝</div>
                        <p>No assignments found</p>
                    </div>
                `;
                return;
            }
            
            container.innerHTML = assignments.map(assignment => {
                const course = data.courses.find(c => c.id === assignment.courseId);
                const dueClass = getDueClass(assignment.dueDate);
                const daysUntil = getDaysUntil(assignment.dueDate);
                
                return `
                    <div class="assignment-item ${assignment.completed ? 'completed' : ''}">
                        <div class="checkbox" onclick="toggleAssignment(${assignment.id})">
                            ${assignment.completed ? '✓' : ''}
                        </div>
                        <div class="info">
                            <div class="title">${assignment.title}</div>
                            <div class="meta">
                                ${course ? course.name : 'Unknown Course'} 
                                ${assignment.description ? '• ' + assignment.description : ''}
                            </div>
                        </div>
                        <span class="priority ${assignment.priority}">${assignment.priority}</span>
                        <span class="due ${dueClass}">${daysUntil}</span>
                        <button class="btn btn-small btn-danger" onclick="deleteAssignment(${assignment.id})">🗑️</button>
                    </div>
                `;
            }).join('');
        }

        function getDueClass(dateStr) {
            const due = new Date(dateStr);
            const now = new Date();
            const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
            if (diffDays < 0) return 'urgent';
            if (diffDays <= 3) return 'urgent';
            if (diffDays <= 7) return 'soon';
            return 'later';
        }

        function getDaysUntil(dateStr) {
            const due = new Date(dateStr);
            const now = new Date();
            const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
            if (diffDays < 0) return 'Overdue';
            if (diffDays === 0) return 'Today';
            if (diffDays === 1) return 'Tomorrow';
            return `${diffDays} days`;
        }

        function toggleAssignment(id) {
            const assignment = data.assignments.find(a => a.id === id);
            if (assignment) {
                assignment.completed = !assignment.completed;
                saveData();
                renderAssignments();
                updateDashboard();
            }
        }

        function deleteAssignment(id) {
            data.assignments = data.assignments.filter(a => a.id !== id);
            saveData();
            renderAssignments();
            updateDashboard();
        }

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderAssignments(btn.dataset.filter);
            });
        });

        // Schedule Management
        document.getElementById('scheduleForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const scheduleItem = {
                id: Date.now(),
                courseId: parseInt(document.getElementById('scheduleCourse').value),
                day: document.getElementById('scheduleDay').value,
                startTime: document.getElementById('scheduleStart').value,
                endTime: document.getElementById('scheduleEnd').value,
                location: document.getElementById('scheduleLocation').value
            };
            data.schedule.push(scheduleItem);
            saveData();
            renderSchedule();
            closeModal('scheduleModal');
            e.target.reset();
        });

        function renderSchedule() {
            const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
            days.forEach(day => {
                const container = document.querySelector(`.day-classes[data-day="${day}"]`);
                const daySchedule = data.schedule.filter(s => s.day === day);
                daySchedule.sort((a, b) => a.startTime.localeCompare(b.startTime));
                
                container.innerHTML = daySchedule.map(item => {
                    const course = data.courses.find(c => c.id === item.courseId);
                    return `
                        <div class="schedule-item">
                            <div class="time">${formatTime(item.startTime)} - ${formatTime(item.endTime)}</div>
                            <div class="course-name">${course ? course.name : 'Unknown'}</div>
                            <div class="location">📍 ${item.location || 'TBA'}</div>
                        </div>
                    `;
                }).join('');
            });
        }

        function formatTime(time) {
            const [hours, minutes] = time.split(':');
            const h = parseInt(hours);
            const ampm = h >= 12 ? 'PM' : 'AM';
            const h12 = h % 12 || 12;
            return `${h12}:${minutes} ${ampm}`;
        }

        // Update Course Dropdowns
        function updateCourseDropdowns() {
            const dropdowns = ['assignmentCourse', 'scheduleCourse'];
            dropdowns.forEach(id => {
                const select = document.getElementById(id);
                const currentValue = select.value;
                select.innerHTML = '<option value="">Select Course</option>' +
                    data.courses.map(c => `<option value="${c.id}">${c.name} (${c.code})</option>`).join('');
                if (currentValue) select.value = currentValue;
            });
        }

        // GPA Calculator
        function updateGPA() {
            const tbody = document.querySelector('#gpaTable tbody');
            const gradedCourses = data.courses.filter(c => c.grade);
            
            if (gradedCourses.length === 0) {
                tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No graded courses yet</td></tr>';
                document.getElementById('calculatedGPA').textContent = '0.00';
                document.getElementById('totalCreditsGPA').textContent = '0';
                return;
            }
            
            let totalPoints = 0;
            let totalCredits = 0;
            
            tbody.innerHTML = gradedCourses.map(course => {
                const points = parseFloat(course.grade);
                totalPoints += points * course.credits;
                totalCredits += course.credits;
                return `
                    <tr>
                        <td>${course.name}</td>
                        <td>${course.credits}</td>
                        <td>${getGradeLetter(points)}</td>
                        <td>${points.toFixed(1)}</td>
                    </tr>
                `;
            }).join('');
            
            const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
            document.getElementById('calculatedGPA').textContent = gpa;
            document.getElementById('totalCreditsGPA').textContent = totalCredits;
            document.getElementById('dashGPA').textContent = gpa;
        }

        // Study Timer
        let timerInterval = null;
        let timerSeconds = 25 * 60;
        let timerRunning = false;
        let timerStartTime = null;

        function updateTimerDisplay() {
            const minutes = Math.floor(timerSeconds / 60);
            const seconds = timerSeconds % 60;
            document.getElementById('timerDisplay').textContent = 
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                timerSeconds = parseInt(btn.dataset.minutes) * 60;
                updateTimerDisplay();
                if (timerRunning) {
                    clearInterval(timerInterval);
                    timerRunning = false;
                }
            });
        });

        document.getElementById('startTimer').addEventListener('click', () => {
            if (!timerRunning) {
                timerRunning = true;
                timerStartTime = new Date();
                timerInterval = setInterval(() => {
                    if (timerSeconds > 0) {
                        timerSeconds--;
                        updateTimerDisplay();
                    } else {
                        clearInterval(timerInterval);
                        timerRunning = false;
                        logStudySession();
                        alert('⏰ Time\'s up! Great study session!');
                    }
                }, 1000);
            }
        });

        document.getElementById('pauseTimer').addEventListener('click', () => {
            if (timerRunning) {
                clearInterval(timerInterval);
                timerRunning = false;
            }
        });

        document.getElementById('resetTimer').addEventListener('click', () => {
            clearInterval(timerInterval);
            timerRunning = false;
            const activePreset = document.querySelector('.preset-btn.active');
            timerSeconds = activePreset ? parseInt(activePreset.dataset.minutes) * 60 : 25 * 60;
            updateTimerDisplay();
        });

        function logStudySession() {
            const subject = document.getElementById('studySubject').value || 'General Study';
            const activePreset = document.querySelector('.preset-btn.active');
            const duration = activePreset ? parseInt(activePreset.dataset.minutes) : 25;
            
            data.studyLog.push({
                id: Date.now(),
                subject,
                duration,
                date: new Date().toISOString()
            });
            saveData();
            renderStudyLog();
        }

        function renderStudyLog() {
            const container = document.getElementById('studyLog');
            if (data.studyLog.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="icon">📖</div>
                        <p>No study sessions logged yet</p>
                    </div>
                `;
                return;
            }
            
            const recentLogs = data.studyLog.slice(-10).reverse();
            container.innerHTML = recentLogs.map(log => `
                <div class="log-item">
                    <span>📚 ${log.subject}</span>
                    <span>${log.duration} min • ${new Date(log.date).toLocaleDateString()}</span>
                </div>
            `).join('');

            // Update weekly study time
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            const weeklyMinutes = data.studyLog
                .filter(log => new Date(log.date) > weekAgo)
                .reduce((sum, log) => sum + log.duration, 0);
            const hours = Math.floor(weeklyMinutes / 60);
            const mins = weeklyMinutes % 60;
            document.getElementById('weeklyStudy').textContent = `${hours}h ${mins}m`;
        }

        function clearStudyLog() {
            if (confirm('Clear all study logs?')) {
                data.studyLog = [];
                saveData();
                renderStudyLog();
            }
        }

        // Budget Management
        document.getElementById('expenseForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const expense = {
                id: Date.now(),
                description: document.getElementById('expenseDesc').value,
                amount: parseFloat(document.getElementById('expenseAmount').value),
                category: document.getElementById('expenseCategory').value,
                date: document.getElementById('expenseDate').value
            };
            data.expenses.push(expense);
            saveData();
            renderExpenses();
            updateBudgetDisplay();
            updateDashboard();
            closeModal('expenseModal');
            e.target.reset();
        });

        function updateBudget() {
            data.budget = parseFloat(document.getElementById('monthlyBudgetInput').value) || 0;
            saveData();
            updateBudgetDisplay();
            updateDashboard();
        }

        function updateBudgetDisplay() {
            const total = data.budget;
            const spent = data.expenses.reduce((sum, e) => sum + e.amount, 0);
            const remaining = total - spent;
            
            document.getElementById('totalBudget').textContent = `$${total.toFixed(2)}`;
            document.getElementById('totalExpenses').textContent = `$${spent.toFixed(2)}`;
            document.getElementById('remainingBudget').textContent = `$${remaining.toFixed(2)}`;
        }

        function renderExpenses() {
            const container = document.getElementById('expenseList');
            if (data.expenses.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="icon">💸</div>
                        <p>No expenses recorded</p>
                    </div>
                `;
                return;
            }
            
            const categoryIcons = {
                food: '🍔',
                books: '📚',
                transport: '🚗',
                entertainment: '🎮',
                supplies: '✏️',
                other: '📦'
            };
            
            const categoryColors = {
                food: '#f59e0b',
                books: '#8b5cf6',
                transport: '#3b82f6',
                entertainment: '#ec4899',
                supplies: '#10b981',
                other: '#6b7280'
            };
            
            container.innerHTML = data.expenses.slice().reverse().map(expense => `
                <div class="expense-item">
                    <div class="category">
                        <div class="icon" style="background: ${categoryColors[expense.category]}20; color: ${categoryColors[expense.category]}">
                            ${categoryIcons[expense.category]}
                        </div>
                        <div>
                            <div style="font-weight: 600;">${expense.description}</div>
                            <div style="font-size: 0.8rem; color: var(--gray);">${new Date(expense.date).toLocaleDateString()}</div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span class="amount">-$${expense.amount.toFixed(2)}</span>
                        <button class="btn btn-small btn-danger" onclick="deleteExpense(${expense.id})">🗑️</button>
                    </div>
                </div>
            `).join('');
        }

        function deleteExpense(id) {
            data.expenses = data.expenses.filter(e => e.id !== id);
            saveData();
            renderExpenses();
            updateBudgetDisplay();
            updateDashboard();
        }

        // Dashboard
        function updateDashboard() {
            // GPA
            const gradedCourses = data.courses.filter(c => c.grade);
            let totalPoints = 0;
            let totalCredits = 0;
            gradedCourses.forEach(c => {
                totalPoints += parseFloat(c.grade) * c.credits;
                totalCredits += c.credits;
            });
            const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
            document.getElementById('dashGPA').textContent = gpa;
            
            // Courses
            document.getElementById('dashCourses').textContent = data.courses.length;
            const allCredits = data.courses.reduce((sum, c) => sum + c.credits, 0);
            document.getElementById('dashCredits').textContent = `${allCredits} Credits`;
            
            // Tasks
            const pending = data.assignments.filter(a => !a.completed);
            document.getElementById('dashTasks').textContent = pending.length;
            const urgent = pending.filter(a => getDueClass(a.dueDate) === 'urgent').length;
            document.getElementById('dashUrgent').textContent = `${urgent} Due Soon`;
            
            // Budget
            document.getElementById('dashBudget').textContent = `$${data.budget.toFixed(0)}`;
            const spent = data.expenses.reduce((sum, e) => sum + e.amount, 0);
            document.getElementById('dashSpent').textContent = `$${spent.toFixed(0)} Spent`;
            
            // Upcoming deadlines
            renderUpcomingDeadlines();
        }

        function renderUpcomingDeadlines() {
            const container = document.getElementById('upcomingDeadlines');
            const upcoming = data.assignments
                .filter(a => !a.completed)
                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                .slice(0, 5);
            
            if (upcoming.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="icon">📝</div>
                        <p>No upcoming deadlines</p>
                    </div>
                `;
                return;
            }
            
            container.innerHTML = upcoming.map(assignment => {
                const course = data.courses.find(c => c.id === assignment.courseId);
                const dueClass = getDueClass(assignment.dueDate);
                return `
                    <div class="assignment-item">
                        <div class="info">
                            <div class="title">${assignment.title}</div>
                            <div class="meta">${course ? course.name : 'Unknown'}</div>
                        </div>
                        <span class="due ${dueClass}">${getDaysUntil(assignment.dueDate)}</span>
                    </div>
                `;
            }).join('');
        }

        // Auto-save user info
        document.getElementById('studentName').addEventListener('change', saveData);
        document.getElementById('semester').addEventListener('change', saveData);

        // Initialize
        loadData();
        renderCourses();
        renderAssignments();
        renderSchedule();
        renderStudyLog();
        renderExpenses();
        updateBudgetDisplay();
        updateGPA();
        updateDashboard();
        updateTimerDisplay();

        // Set default date for expense
        document.getElementById('expenseDate').valueAsDate = new Date();
    </script>
</body>
</html>
