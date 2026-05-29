# GTM College - Complete Admission & Admin Flow Documentation

## 🎯 System Overview

This document outlines the complete flow for student admissions and admin management in the GTM College website.

---

## 📊 Database Schema

### Models

#### 1. **Student**
- `id` - Unique identifier
- `email` - Unique email (login credential)
- `password` - Hashed password
- `name` - Full name
- `phone` - Contact number
- `createdAt` - Registration timestamp
- `updatedAt` - Last update timestamp
- `applications[]` - Related applications

#### 2. **Application**
- `id` - Unique identifier
- `studentId` - Foreign key to Student
- `programme` - Selected programme (B.Tech, M.Tech, MBA, etc.)
- `branch` - Specialization/Branch
- `entranceExam` - Exam name (JEE, GATE, CAT, etc.)
- `entranceScore` - Score/Rank achieved
- `boardPercent` - 10+2 percentage
- `address` - Street address
- `city` - City name
- `state` - State name
- `pincode` - Postal code
- `guardianName` - Parent/Guardian name
- `guardianPhone` - Guardian contact
- `status` - Application status (enum)
- `adminNote` - Optional message from admin
- `submittedAt` - Submission timestamp
- `updatedAt` - Last update timestamp

#### 3. **AdminUser**
- `id` - Unique identifier
- `email` - Unique email
- `password` - Hashed password
- `name` - Full name
- `role` - SUPER_ADMIN or EDITOR
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp

#### 4. **Application Status Enum**
- `PENDING` - Initial state after submission
- `UNDER_REVIEW` - Admin is reviewing
- `ACCEPTED` - Application approved
- `REJECTED` - Application denied
- `WAITLISTED` - Put on waiting list

---

## 🔐 Authentication System

### Student Authentication
- **JWT Token**: Stored in `student_token` cookie (24h expiry)
- **Secret**: `JWT_SECRET + "-student"`
- **Endpoints**:
  - `POST /api/student/register` - Create new student account
  - `POST /api/student/login` - Login existing student
  - `POST /api/student/logout` - Clear session
  - `GET /api/student/session` - Check current session
  - `GET /api/student/me` - Get student profile

### Admin Authentication
- **JWT Token**: Stored in `admin_token` cookie (8h expiry)
- **Secret**: `JWT_SECRET`
- **Endpoints**:
  - `POST /api/auth/login` - Admin login
  - `POST /api/auth/logout` - Admin logout
  - `GET /api/auth/session` - Check admin session

---

## 🎓 Student Flow

### Step 1: Registration/Login
**Route**: `/student/login`

**Features**:
- Toggle between Login and Register tabs
- Registration requires: email, password, name, phone
- Login requires: email, password
- Password visibility toggle
- Auto-redirect to dashboard if already logged in
- Beautiful gradient UI with GTM branding

**Process**:
1. Student visits `/student/login`
2. Chooses "Register" tab
3. Fills: Full Name, Phone, Email, Password
4. System creates account with hashed password
5. JWT token issued and stored in cookie
6. Redirected to `/student/dashboard`

### Step 2: Student Dashboard
**Route**: `/student/dashboard`

**Features**:
- View all submitted applications
- Track application status with visual progress
- See admin notes/messages
- Status badges with color coding
- Application details display
- Logout functionality
- "Apply Now" button if no applications

**Status Display**:
- **Pending**: Yellow badge with clock icon
- **Under Review**: Blue badge with alert icon
- **Accepted**: Green badge with checkmark + 🎉
- **Rejected**: Red badge with X icon
- **Waitlisted**: Purple badge with clock icon

**Progress Tracker**:
- Step 1: Submitted
- Step 2: In Review
- Step 3: Decision

### Step 3: Application Submission
**Route**: `/apply`

**Protected**: Requires student login

**Multi-Step Form**:

#### Step 1: Programme Selection
- Select Programme: B.Tech, M.Tech, MBA, MCA, B.Arch, Ph.D.
- Select Branch/Specialization (dynamic based on programme)
- Branches include: CSE, ECE, EEE, Mechanical, Civil, IT, AI & Data Science, etc.

#### Step 2: Academic Details
- Entrance Exam: JEE Main, JEE Advanced, TANCET, GATE, CAT, MAT, NATA, Other
- Entrance Score/Rank
- 10+2 Board Percentage (0-100)

#### Step 3: Personal Details
- Address (textarea)
- City
- State
- Pincode
- Guardian Name
- Guardian Phone

#### Step 4: Review & Submit
- Display all entered information
- Confirmation checkbox
- Submit button

**Validation**:
- One application per student (enforced at API level)
- All fields required
- Board percentage: 0-100 range

**Success**:
- Success screen with checkmark animation
- "Go to Dashboard" button
- Application immediately visible in dashboard

---

## 👨‍💼 Admin Flow

### Admin Login
**Route**: `/admin/login`

**Features**:
- Email and password authentication
- JWT token with 8h expiry
- Role-based access (SUPER_ADMIN, EDITOR)

### Admin Dashboard
**Route**: `/admin/_layout/dashboard`

**Features**:
- Statistics cards:
  - Total News Articles
  - Total Events
  - Total Announcements
  - Total Admin Users
- Recent news list (5 items)
- Upcoming events list (5 items)
- Visual indicators for published/unpublished content

### Applications Management
**Route**: `/admin/_layout/applications`

**Key Features**:

#### 1. Statistics Overview
- Total Applications
- Pending Count
- Under Review Count
- Accepted Count
- Rejected Count
- Waitlisted Count

#### 2. Search & Filter
- **Search**: By student name, email, programme, or branch
- **Filter**: By status (All, Pending, Under Review, Accepted, Rejected, Waitlisted)
- Real-time updates

#### 3. Applications Table
**Columns**:
- Applicant (name + email)
- Programme (programme + branch)
- Exam/Score (entrance exam + score)
- Board %
- Applied Date
- Status Badge
- Actions (View button)

**Features**:
- Sortable columns
- Hover effects
- Color-coded status badges
- Responsive design

#### 4. Application Detail Modal
**Triggered by**: Clicking eye icon on any application

**Displays**:
- Student name, email, phone
- Current status badge
- Programme and branch
- Entrance exam and score
- Board percentage
- Application ID (first 8 chars)
- Full address
- Guardian details

**Actions Available**:
- **Mark Under Review** (Blue button)
- **Accept** (Green button)
- **Waitlist** (Purple button)
- **Reject** (Red button)
- **Add Admin Note** (Optional message to student)

**Process**:
1. Admin clicks "View" on application
2. Modal opens with full details
3. Admin can add a note for the student
4. Admin clicks status button
5. Application status updates
6. Student sees new status in their dashboard
7. Student sees admin note (if provided)

#### 5. Real-time Updates
- Status changes reflect immediately
- Statistics update automatically
- Table refreshes after status change

---

## 🔄 Complete User Journey Examples

### Example 1: Successful Application

1. **Student Registration**
   - Visits `/student/login`
   - Registers with email: `john@example.com`
   - Creates password, enters name "John Doe", phone "+91 98765 43210"
   - Account created, logged in automatically

2. **Application Submission**
   - Clicks "Apply Now" from dashboard
   - Step 1: Selects "B.Tech" → "Computer Science Engineering"
   - Step 2: Selects "JEE Main", enters "95.4 percentile", board "92.5%"
   - Step 3: Fills address, city "Chennai", state "Tamil Nadu", pincode "600001"
   - Enters guardian "Mr. Doe", phone "+91 98765 00000"
   - Step 4: Reviews all info, clicks "Submit Application"
   - Success screen appears
   - Redirected to dashboard

3. **Tracking Status**
   - Dashboard shows application with "Pending Review" status
   - Progress bar shows "Submitted" step completed

4. **Admin Review**
   - Admin logs into `/admin/login`
   - Goes to Applications section
   - Sees John's application in "Pending" filter
   - Clicks "View" to open details
   - Reviews entrance score and board percentage
   - Adds note: "Excellent academic record. Shortlisted for interview."
   - Clicks "Mark Under Review"

5. **Student Notification**
   - John refreshes dashboard
   - Status changes to "Under Review" (blue badge)
   - Sees admin note in blue box
   - Progress bar shows "In Review" step active

6. **Final Decision**
   - Admin reviews interview results
   - Opens John's application again
   - Adds note: "Congratulations! You have been selected for B.Tech CSE. Please check your email for next steps."
   - Clicks "Accept"

7. **Student Sees Result**
   - John logs in to dashboard
   - Sees "Accepted! 🎉" in green badge
   - Progress bar fully completed
   - Admin note displayed in green box
   - Can proceed with admission formalities

### Example 2: Rejected Application

1. Student applies with low entrance score
2. Admin reviews application
3. Admin adds note: "Unfortunately, your entrance score does not meet our minimum requirements for this programme. You may apply again next year."
4. Admin clicks "Reject"
5. Student sees "Not Selected" status with red badge
6. Admin note explains the reason

---

## 🎨 UI/UX Features

### Design System
- **Colors**:
  - Primary: Deep blue (#1e3a8a)
  - Gold: Accent color (#fbbf24)
  - Status colors: Yellow, Blue, Green, Red, Purple
- **Typography**: Extrabold headings, medium body text
- **Spacing**: Consistent padding and margins
- **Borders**: Rounded corners (rounded-xl, rounded-2xl)

### Responsive Design
- Mobile-first approach
- Grid layouts adapt to screen size
- Tables scroll horizontally on mobile
- Modals are full-screen on small devices

### Animations
- Hover effects on buttons and cards
- Smooth transitions
- Progress bar animations
- Status badge transitions

### Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus states
- Color contrast compliance

---

## 🔒 Security Features

### Password Security
- Bcrypt hashing with salt rounds: 10
- Passwords never stored in plain text
- Passwords never returned in API responses

### JWT Security
- HttpOnly cookies (prevents XSS)
- SameSite=Strict (prevents CSRF)
- Short expiry times (8h admin, 24h student)
- Separate secrets for admin and student tokens

### Authorization
- Protected routes check JWT before loading
- API endpoints verify tokens
- Role-based access control for admin features
- Students can only see their own applications

### Data Validation
- Email uniqueness enforced at DB level
- Required fields validated on frontend and backend
- Input sanitization
- SQL injection prevention via Prisma ORM

---

## 📱 API Endpoints Summary

### Student Endpoints
```
POST   /api/student/register      - Create account
POST   /api/student/login         - Login
POST   /api/student/logout        - Logout
GET    /api/student/session       - Get session
GET    /api/student/me            - Get profile
POST   /api/applications/submit   - Submit application
GET    /api/applications/my       - Get my applications
```

### Admin Endpoints
```
POST   /api/auth/login                    - Admin login
POST   /api/auth/logout                   - Admin logout
GET    /api/auth/session                  - Get admin session
GET    /api/applications                  - List all applications (with filters)
GET    /api/applications/stats            - Get statistics
POST   /api/applications/update-status    - Update application status
GET    /api/applications/detail?id=       - Get single application
GET    /api/users                         - List admin users
POST   /api/users/create                  - Create admin user
POST   /api/users/delete                  - Delete admin user
POST   /api/users/update-password         - Update admin password
```

### Content Management Endpoints
```
GET    /api/news                  - Get all news
POST   /api/news/create           - Create news
POST   /api/news/update           - Update news
POST   /api/news/delete           - Delete news
GET    /api/events                - Get all events
POST   /api/events/create         - Create event
POST   /api/events/update         - Update event
POST   /api/events/delete         - Delete event
GET    /api/announcements         - Get announcements
POST   /api/announcements/create  - Create announcement
POST   /api/announcements/update  - Update announcement
POST   /api/announcements/delete  - Delete announcement
GET    /api/content?section=      - Get section content
POST   /api/content/upsert        - Update section content
```

---

## 🚀 Deployment & Environment

### Environment Variables
```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
JWT_SECRET="gtm-college-super-secret-jwt-key-change-this-in-production"
```

### Database Migrations
```bash
npm run db:migrate    # Run migrations
npm run db:push       # Push schema changes
npm run db:seed       # Seed initial data
npm run db:studio     # Open Prisma Studio
```

### Build & Deploy
```bash
npm run dev           # Development server
npm run build         # Production build
npm run preview       # Preview production build
```

---

## 📈 Future Enhancements (Recommendations)

### 1. Email Notifications
- Send email on application submission
- Notify student when status changes
- Send admin note via email
- Interview scheduling emails

### 2. Document Upload
- Upload 10+2 marksheet
- Upload entrance exam scorecard
- Upload photo
- Upload ID proof

### 3. Payment Integration
- Application fee payment
- Admission fee payment
- Payment gateway integration (Razorpay/Stripe)

### 4. Interview Scheduling
- Calendar integration
- Time slot booking
- Video call links
- Reminder notifications

### 5. Advanced Filtering
- Filter by entrance score range
- Filter by board percentage
- Filter by programme/branch
- Export to Excel/CSV

### 6. Analytics Dashboard
- Application trends over time
- Programme-wise statistics
- Acceptance rate charts
- Geographic distribution

### 7. Bulk Actions
- Bulk status updates
- Bulk email sending
- Bulk export

### 8. Student Profile Enhancement
- Edit profile information
- Upload profile picture
- View application history
- Download application PDF

---

## ✅ Current System Strengths

1. ✅ Complete authentication system (Student + Admin)
2. ✅ Multi-step application form with validation
3. ✅ Real-time status tracking
4. ✅ Admin notes/messaging system
5. ✅ Search and filter functionality
6. ✅ Statistics dashboard
7. ✅ Responsive design
8. ✅ Security best practices
9. ✅ Clean, modern UI
10. ✅ Role-based access control

---

## 🎯 System is Production-Ready For:

- Student registration and login
- Application submission
- Application tracking
- Admin review and status management
- Content management (News, Events, Announcements)
- User management
- Basic reporting

---

## 📞 Support & Maintenance

### Regular Tasks
- Monitor application submissions
- Review and update applications daily
- Backup database regularly
- Update content (news, events)
- Manage admin users

### Troubleshooting
- Check JWT token expiry
- Verify database connection
- Review application logs
- Test email deliverability (when implemented)

---

**Last Updated**: January 2025
**Version**: 1.0
**Status**: Production Ready ✅
