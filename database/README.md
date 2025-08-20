# Database Setup for Interview Help AI Tool

This directory contains the complete database setup for the Interview Help AI Tool, designed to work with Supabase (PostgreSQL).

## 📋 **Overview**

The database is designed to support:

-   **Job Management**: Store job titles, categories, and detailed descriptions
-   **Interview Questions**: Comprehensive Q&A database for each job role
-   **User Management**: Future user authentication and Pro features
-   **Session Tracking**: Track user job selections and custom descriptions
-   **Scalability**: Built for growth with proper indexing and relationships

## 🗄️ **Database Schema**

### **Core Tables**

| Table                 | Purpose                         | Key Fields                                                   |
| --------------------- | ------------------------------- | ------------------------------------------------------------ |
| `jobs`                | Job titles and basic info       | `id`, `title`, `slug`, `category`                            |
| `job_descriptions`    | Detailed job descriptions       | `job_id`, `role_summary`, `responsibilities`, `requirements` |
| `interview_questions` | Questions for each job          | `job_id`, `question`, `type`, `difficulty`, `category`       |
| `sample_answers`      | Model answers for questions     | `question_id`, `answer_text`, `type`, `key_points`           |
| `users`               | User accounts and subscriptions | `email`, `is_pro_member`, `subscription_tier`                |
| `user_sessions`       | Track user interactions         | `session_token`, `selected_job_id`, `custom_description`     |

### **Lookup Tables**

| Table                 | Purpose                                              |
| --------------------- | ---------------------------------------------------- |
| `job_categories`      | Job role categories (Tech, Business, Creative, etc.) |
| `question_categories` | Question types (Technical, Behavioral, etc.)         |

### **Views**

| View               | Purpose                      |
| ------------------ | ---------------------------- |
| `job_details`      | Jobs with their descriptions |
| `question_answers` | Questions with their answers |

### **Functions**

| Function                       | Purpose                            |
| ------------------------------ | ---------------------------------- |
| `get_job_questions(job_title)` | Get all Q&A for a specific job     |
| `search_jobs(search_term)`     | Search jobs with relevance scoring |

## 🚀 **Quick Setup**

### **1. Supabase Project Setup**

1. **Create Supabase Project**

    ```bash
    # Go to https://supabase.com
    # Create new project
    # Note your project URL and anon key
    ```

2. **Install Supabase CLI** (optional)
    ```bash
    npm install -g supabase
    supabase login
    supabase init
    ```

### **2. Environment Variables**

Create `.env.local` in your Next.js project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### **3. Install Dependencies**

```bash
npm install @supabase/supabase-js
```

### **4. Run Database Schema**

1. **Via Supabase Dashboard**:

    - Go to SQL Editor
    - Copy and paste `schema.sql`
    - Execute the script

2. **Via CLI** (if using Supabase CLI):
    ```bash
    supabase db reset
    ```

### **5. Verify Setup**

Run these queries in Supabase SQL Editor:

```sql
-- Check tables
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Check sample data
SELECT COUNT(*) as job_count FROM jobs;
SELECT COUNT(*) as question_count FROM interview_questions;
```

## 🔧 **Schema Features**

### **Row Level Security (RLS)**

-   Public read access for jobs, descriptions, questions, and answers
-   User-specific access for personal data
-   Secure by default

### **Performance Optimization**

-   Strategic indexes on frequently queried fields
-   Efficient foreign key relationships
-   Optimized views for common queries

### **Data Integrity**

-   Foreign key constraints
-   Unique constraints where appropriate
-   Automatic timestamp updates

### **Extensibility**

-   UUID primary keys for scalability
-   Flexible JSON-like arrays for dynamic content
-   Category-based organization

## 📊 **Sample Data**

The schema includes sample data for:

-   **11 Job Roles**: From Data Analyst to HR Specialist
-   **Job Categories**: Technology, Business, Creative, HR, Sales, Data & Analytics
-   **Interview Questions**: Technical, behavioral, and situational questions
-   **Sample Answers**: Model responses with key points

## 🔍 **Common Queries**

### **Get All Jobs**

```sql
SELECT * FROM jobs WHERE is_active = true ORDER BY title;
```

### **Get Job with Description**

```sql
SELECT * FROM job_details WHERE title = 'Data Analyst';
```

### **Get Questions for a Job**

```sql
SELECT * FROM get_job_questions('Data Analyst');
```

### **Search Jobs**

```sql
SELECT * FROM search_jobs('analyst');
```

### **Get Questions by Category**

```sql
SELECT * FROM interview_questions
WHERE job_id = (SELECT id FROM jobs WHERE title = 'Software Engineer')
AND category = 'Technical Skills';
```

## 🛡️ **Security Features**

### **Authentication Ready**

-   User table structure for Supabase Auth
-   Session tracking for anonymous users
-   Pro member subscription support

### **Data Access Control**

-   Public read access for job content
-   User-specific access for personal data
-   Secure session management

### **Input Validation**

-   Proper data types and constraints
-   SQL injection prevention
-   XSS protection through proper escaping

## 📈 **Scaling Considerations**

### **Performance**

-   Indexes on frequently queried fields
-   Efficient view definitions
-   Optimized function implementations

### **Storage**

-   Text fields for long content
-   Array fields for structured data
-   UUIDs for distributed systems

### **Future Features**

-   Resume upload storage
-   User analytics tracking
-   Advanced search capabilities
-   AI-powered question generation

## 🔄 **Migration Strategy**

### **Schema Changes**

1. Create migration files: `supabase migration new feature_name`
2. Test locally: `supabase start`
3. Deploy to staging
4. Deploy to production

### **Data Migrations**

-   Use Supabase dashboard for data imports
-   Leverage the provided functions for data manipulation
-   Test with small datasets first

## 🧪 **Testing**

### **Unit Tests**

-   Test database functions
-   Verify constraints and triggers
-   Check RLS policies

### **Integration Tests**

-   Test with Supabase client
-   Verify data flow end-to-end
-   Performance testing with realistic data

## 📚 **Additional Resources**

-   [Supabase Documentation](https://supabase.com/docs)
-   [PostgreSQL Documentation](https://www.postgresql.org/docs/)
-   [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## 🆘 **Troubleshooting**

### **Common Issues**

1. **Connection Errors**

    - Verify environment variables
    - Check Supabase project status
    - Ensure proper network access

2. **Permission Errors**

    - Verify RLS policies
    - Check user authentication
    - Review table permissions

3. **Performance Issues**
    - Check query execution plans
    - Verify indexes are being used
    - Monitor database metrics

### **Support**

-   Check Supabase status page
-   Review application logs
-   Use Supabase dashboard for debugging

## 📝 **Contributing**

When modifying the database schema:

1. Update the main schema file
2. Update TypeScript types
3. Create migration files
4. Update this documentation
5. Test thoroughly

---

**Note**: This database is designed to work seamlessly with the Next.js frontend. All TypeScript types are automatically generated to match the database schema for type safety.
