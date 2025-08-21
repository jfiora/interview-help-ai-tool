# User Authentication Setup for Interview Help AI Tool

This document explains how to set up user authentication so that each user only sees their own Q&A sessions.

## 🔐 **What's Been Implemented**

### **1. Database Schema Updates**

-   Added `user_id` field to `qa_sessions` table
-   Updated `create_qa_session` function to include user authentication
-   Added Row Level Security (RLS) policies for user-based access
-   Created indexes for performance

### **2. API Security Updates**

-   All session APIs now require authentication
-   Users can only access their own sessions
-   Session creation, viewing, updating, and deletion are user-scoped

### **3. Authentication Flow**

-   Users must sign in with Clerk (Google/LinkedIn)
-   Each Q&A session is automatically associated with the authenticated user
-   History page only shows the current user's sessions

## 🚀 **Setup Instructions**

### **Step 1: Update Your Database**

If you have an existing database, run the migration script:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `database/migration_add_user_auth.sql`
4. Run the SQL to update your existing database

**OR** if you're setting up a fresh database:

1. Run the complete `database/schema.sql` file
2. This will create all tables with user authentication already included

### **Step 2: Configure Clerk Authentication**

1. Go to [clerk.com](https://clerk.com) and create your application
2. Enable Google and LinkedIn authentication methods
3. Get your API keys and add them to `.env.local`:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YXBwYXJlbnQtc2hyZXctNC5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_dGg5XL8jzT97F54AYkKP5FUhpuQbT963bM14ZHLZBl
```

### **Step 3: Test the Authentication**

1. Start your development server: `npm run dev`
2. Visit `/sign-up` to create an account
3. Sign in and try to access the dashboard
4. Generate some Q&A sessions
5. Check that the history only shows your sessions

## 🗄️ **Database Changes Explained**

### **Before (No User Isolation)**

```sql
-- All users could see all sessions
SELECT * FROM qa_sessions;
```

### **After (User Isolation)**

```sql
-- Users only see their own sessions
SELECT * FROM qa_sessions WHERE user_id = 'current-user-id';
```

### **Row Level Security Policies**

-   **qa_sessions**: Users can only CRUD their own sessions
-   **session_questions**: Users can only access questions from their sessions
-   **session_answers**: Users can only access answers from their sessions

## 🔒 **Security Features**

### **1. Authentication Required**

-   All dashboard routes require authentication
-   Unauthenticated users are redirected to `/sign-in`

### **2. User Ownership Verification**

-   API endpoints verify user owns the session before allowing access
-   Database RLS policies enforce user isolation at the database level

### **3. Session Scoping**

-   Session creation automatically includes user ID
-   Session listing only returns current user's sessions
-   Session deletion only works for user-owned sessions

## 📱 **User Experience**

### **For New Users**

1. Visit landing page
2. Click "Get Started" → redirected to sign-up
3. Sign up with Google or LinkedIn
4. Automatically redirected to dashboard

### **For Existing Users**

1. Visit landing page
2. Click "Sign In" → redirected to sign-in
3. Sign in with Google or LinkedIn
4. Redirected to dashboard with their sessions

### **Session Management**

-   Each user sees only their own Q&A sessions
-   Sessions are automatically associated with the authenticated user
-   No more cross-user session visibility

## 🐛 **Troubleshooting**

### **Common Issues**

1. **"Authentication required" error**

    - Make sure you're signed in
    - Check that Clerk is properly configured

2. **"Session not found or access denied" error**

    - Verify the session belongs to the current user
    - Check that the user_id field is properly set

3. **Sessions not appearing in history**
    - Ensure the session was created while authenticated
    - Check that the user_id field is not null

### **Database Verification**

To verify your setup, run this query in Supabase:

```sql
-- Check if user_id field exists
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'qa_sessions' AND column_name = 'user_id';

-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename IN ('qa_sessions', 'session_questions', 'session_answers');
```

## 🎯 **Next Steps**

After setting up user authentication:

1. **Test thoroughly** with multiple user accounts
2. **Monitor database performance** with the new indexes
3. **Consider adding user preferences** for AI model selection
4. **Implement user profile management** features

## 📚 **Additional Resources**

-   [Clerk Documentation](https://clerk.com/docs)
-   [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
-   [Next.js App Router](https://nextjs.org/docs/app)

---

**Note**: This implementation ensures complete user isolation while maintaining the existing functionality. Each user will have their own private Q&A session library.
