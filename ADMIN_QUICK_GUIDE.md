# Admin Quick Reference Guide

## 🚀 Quick Start

### Login
1. Go to `/admin/login`
2. Enter your admin email and password
3. You'll be redirected to the dashboard

### Daily Tasks Checklist
- [ ] Check new applications (Pending status)
- [ ] Review applications under review
- [ ] Update application statuses
- [ ] Add notes for students
- [ ] Update news and events
- [ ] Monitor statistics

---

## 📋 Managing Applications

### Viewing Applications

**Access**: Click "Applications" in the sidebar

**What You See**:
- Statistics cards at the top (Total, Pending, Under Review, etc.)
- Search bar to find specific students
- Status filter dropdown
- Table with all applications

### Searching Applications

**Search by**:
- Student name
- Student email
- Programme name
- Branch name

**Example**: Type "Computer Science" to find all CS applications

### Filtering by Status

**Available Filters**:
- All Status (default)
- Pending
- Under Review
- Accepted
- Rejected
- Waitlisted

**Tip**: Start your day by filtering "Pending" to see new applications

---

## 🔍 Reviewing an Application

### Step 1: Open Application Details
- Click the eye icon (👁️) in the Actions column
- A modal will open with full details

### Step 2: Review Information
Check:
- ✅ Student contact details
- ✅ Programme and branch selection
- ✅ Entrance exam scores
- ✅ Board percentage
- ✅ Address and guardian info

### Step 3: Add a Note (Optional)
- Type a message in the "Note to Student" field
- This will be visible to the student
- Use it to:
  - Request additional information
  - Provide interview details
  - Explain decisions
  - Give next steps

**Example Notes**:
```
✅ Good: "Congratulations! Please check your email for admission details."
✅ Good: "Your application is under review. Interview scheduled for 15th March."
✅ Good: "Please submit your 10+2 marksheet for verification."
❌ Avoid: "Rejected" (too brief, not helpful)
```

### Step 4: Update Status

**Available Actions**:

1. **Mark Under Review** (Blue)
   - Use when: You're actively reviewing the application
   - Student sees: "Under Review" status

2. **Accept** (Green)
   - Use when: Application is approved
   - Student sees: "Accepted! 🎉" status
   - **Important**: Add note with next steps!

3. **Waitlist** (Purple)
   - Use when: Good candidate but seats full
   - Student sees: "Waitlisted" status
   - Add note explaining waitlist process

4. **Reject** (Red)
   - Use when: Application doesn't meet criteria
   - Student sees: "Not Selected" status
   - **Important**: Add note explaining reason politely

### Step 5: Confirm
- Click the status button
- Modal closes automatically
- Table updates with new status
- Student can see the change immediately

---

## 💡 Best Practices

### Communication
- ✅ Always add notes when accepting or rejecting
- ✅ Be professional and encouraging
- ✅ Provide clear next steps
- ✅ Include contact information if needed
- ❌ Don't leave students without information

### Status Management
- ✅ Move to "Under Review" when you start reviewing
- ✅ Make decisions within 7 days
- ✅ Update status as soon as decision is made
- ❌ Don't leave applications in "Pending" too long

### Organization
- ✅ Use search to find specific applications quickly
- ✅ Filter by status to focus on specific groups
- ✅ Check statistics daily to track progress
- ✅ Review oldest applications first

---

## 📊 Understanding Statistics

### Dashboard Cards

**Total Applications**
- All applications ever submitted
- Includes all statuses

**Pending**
- New applications waiting for review
- **Action needed**: Review these first

**Under Review**
- Applications you're actively reviewing
- **Action needed**: Make decisions

**Accepted**
- Approved applications
- No action needed (unless student contacts you)

**Rejected**
- Declined applications
- No action needed

**Waitlisted**
- Applications on waiting list
- **Action needed**: Move to Accepted when seats available

---

## 🎯 Common Scenarios

### Scenario 1: New Application Arrives
1. You see "Pending" count increase
2. Filter by "Pending" status
3. Click eye icon to review
4. Check entrance scores and board percentage
5. Add note: "Thank you for applying. Your application is under review."
6. Click "Mark Under Review"

### Scenario 2: Accepting a Strong Candidate
1. Open application details
2. Verify all information is complete
3. Add note: "Congratulations! You have been selected for [Programme]. Please check your email for admission instructions and fee payment details."
4. Click "Accept"

### Scenario 3: Rejecting an Application
1. Open application details
2. Review why application doesn't meet criteria
3. Add note: "Thank you for your interest in GTM College. Unfortunately, we are unable to offer you admission at this time due to [reason: entrance score/limited seats/etc.]. We encourage you to apply again next year."
4. Click "Reject"

### Scenario 4: Waitlisting a Candidate
1. Open application details
2. Add note: "Your application is strong, but all seats are currently filled. You have been placed on our waitlist. We will contact you if a seat becomes available."
3. Click "Waitlist"

### Scenario 5: Requesting More Information
1. Open application details
2. Add note: "Please submit your 10+2 marksheet and entrance exam scorecard to [email]. Your application will remain under review until we receive these documents."
3. Click "Mark Under Review"

---

## 🔐 User Management

### Creating New Admin Users
1. Go to "Users" section
2. Click "Add User"
3. Enter email, name, password
4. Select role:
   - **SUPER_ADMIN**: Full access, can manage users
   - **EDITOR**: Can manage content and applications
5. Click "Create"

### Roles Explained

**SUPER_ADMIN**
- Can do everything
- Can create/delete admin users
- Can change passwords
- Full access to all sections

**EDITOR**
- Can manage applications
- Can manage content (news, events)
- Cannot manage users
- Cannot change system settings

---

## 📱 Content Management

### Managing News
1. Go to "News" section
2. Click "Add News" to create
3. Fill: Date, Category, Title, Excerpt
4. Toggle "Published" to make visible on website
5. Click "Save"

### Managing Events
1. Go to "Events" section
2. Click "Add Event"
3. Fill: Day, Month, Title, Venue, Time
4. Toggle "Published" to make visible
5. Click "Save"

### Managing Announcements
1. Go to "Announcements" section
2. Click "Add Announcement"
3. Enter announcement text
4. Set order (lower numbers appear first)
5. Toggle "Active" to show on website
6. Click "Save"

---

## ⚠️ Important Notes

### Security
- 🔒 Never share your admin password
- 🔒 Log out when leaving your computer
- 🔒 Session expires after 8 hours
- 🔒 Don't access admin panel on public WiFi

### Data Privacy
- 🔐 Student data is confidential
- 🔐 Don't share application details with unauthorized persons
- 🔐 Only access applications for legitimate review purposes

### System Limits
- ⚡ Students can submit only ONE application
- ⚡ Search is case-insensitive
- ⚡ All times are in IST (Indian Standard Time)

---

## 🆘 Troubleshooting

### Can't Login?
- Check email spelling
- Check password (case-sensitive)
- Clear browser cookies
- Contact super admin to reset password

### Application Not Showing?
- Check status filter (might be filtered out)
- Try searching by student name/email
- Refresh the page

### Status Update Not Working?
- Check internet connection
- Try again after a few seconds
- Refresh the page
- Contact technical support if persists

### Student Can't See Status Update?
- Ask student to refresh their dashboard
- Ask student to log out and log back in
- Status updates are immediate, no delay

---

## 📞 Support Contacts

**Technical Issues**
- Email: tech@gtmcollege.edu
- Phone: +91 XXXXX XXXXX

**Admission Queries**
- Email: admissions@gtmcollege.edu
- Phone: +91 XXXXX XXXXX

---

## 🎓 Tips for Efficient Management

1. **Start with Pending**: Always check pending applications first thing in the morning
2. **Use Search**: Don't scroll through hundreds of applications, use search
3. **Add Meaningful Notes**: Students appreciate clear communication
4. **Be Consistent**: Use similar language for similar situations
5. **Track Progress**: Check statistics daily to ensure you're on track
6. **Batch Process**: Review similar applications together (e.g., all B.Tech CSE)
7. **Set Deadlines**: Try to review applications within 3-5 days
8. **Follow Up**: If you requested documents, check back after a few days

---

**Remember**: Every application represents a student's dream. Handle with care! 🎓
