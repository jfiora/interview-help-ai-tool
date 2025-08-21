# Database Integration for Interview Help AI Tool

This document explains how to set up and use the new database features that allow you to save and manage Q&A sessions.

## 🗄️ Database Features

### What's New

-   **Q&A Session Storage**: Automatically save generated questions and answers to the database
-   **Session History**: View all your previous Q&A sessions with pagination
-   **Session Management**: Delete sessions, view complete Q&A details
-   **Cost Tracking**: Monitor estimated costs for each session
-   **Job Description Templates**: Pre-built job descriptions for common roles

### Database Schema

The application now includes these new tables:

-   `qa_sessions` - Stores session metadata (job title, description, model used, costs)
-   `session_questions` - Stores individual questions for each session
-   `session_answers` - Stores answers with key points and tips
-   `job_description_templates` - Pre-built job descriptions
-   `user_preferences` - User settings and preferences

## 🚀 Quick Setup

### 1. Supabase Setup

1. Go to [Supabase](https://supabase.com) and create a new project
2. Get your project URL and service role key from the project settings
3. Add these to your `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 2. Database Schema

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `database/schema.sql`
4. Run the SQL to create all tables, views, and functions

### 3. Install Dependencies

```bash
npm install @supabase/supabase-js
```

## 📱 How to Use

### Creating Q&A Sessions

1. **Generate Questions**: Go to the home page and generate questions as usual
2. **Automatic Saving**: Questions and answers are automatically saved to the database
3. **Session Created**: You'll see a notification that the session was saved

### Viewing History

1. **History Page**: Click "View History" from any page
2. **Session List**: See all your Q&A sessions with pagination
3. **Session Details**: Click "View" to see the complete Q&A for a session

### Managing Sessions

-   **Delete Sessions**: Remove sessions you no longer need
-   **Session Info**: View creation date, model used, and estimated costs
-   **Complete Q&A**: See all questions and answers in a structured format

## 🔧 API Endpoints

### Sessions Management

-   `POST /api/sessions/create` - Create a new Q&A session
-   `POST /api/sessions/save-questions` - Save questions to a session
-   `POST /api/sessions/save-answers` - Save answers to a session
-   `GET /api/sessions/list` - List all sessions with pagination
-   `GET /api/sessions/[id]` - Get complete session details
-   `DELETE /api/sessions/[id]` - Delete a session

### Data Flow

1. User generates questions → `POST /api/ai/generate-questions`
2. Questions are saved → `POST /api/sessions/save-questions`
3. Answers are generated → `POST /api/ai/generate-answer`
4. Answers are saved → `POST /api/sessions/save-answers`
5. Session is complete and viewable in history

## 💰 Cost Tracking

### What's Tracked

-   **Model Used**: Which AI model was used (e.g., gpt-4o-mini)
-   **Tokens Used**: Estimated token consumption
-   **Estimated Cost**: Calculated cost based on model pricing

### Cost Calculation

The system estimates costs using:

-   GPT-4o-mini: $0.0006 per 1K tokens
-   Automatic calculation when sessions are created

## 🎯 Job Description Templates

### Pre-built Templates

The database includes templates for common roles:

-   Full Stack Developer
-   Data Analyst
-   Product Manager
-   UX/UI Designer
-   Software Engineer

### Using Templates

1. Templates are automatically loaded from the database
2. Users can select from these or create custom descriptions
3. All templates are public and reusable

## 🔒 Security Features

### Row Level Security (RLS)

-   All tables have RLS enabled
-   Basic policies allow public read/write access
-   Can be customized for user authentication

### Data Validation

-   Input sanitization for all API endpoints
-   Type checking with TypeScript
-   Database constraints and validation

## 📊 Database Views

### Available Views

-   `complete_qa_sessions` - Full Q&A data with questions and answers
-   `session_summaries` - Session metadata for listing pages

### Functions

-   `create_qa_session()` - Creates new sessions
-   `add_session_questions()` - Adds questions to sessions
-   `add_session_answers()` - Adds answers to sessions
-   `calculate_session_cost()` - Estimates session costs

## 🚨 Troubleshooting

### Common Issues

#### "Module not found: @supabase/supabase-js"

```bash
npm install @supabase/supabase-js
```

#### Database Connection Errors

-   Check your Supabase URL and service role key
-   Ensure the database schema has been created
-   Verify your Supabase project is active

#### Session Not Saving

-   Check browser console for errors
-   Verify API endpoints are working
-   Check database permissions and RLS policies

### Debug Mode

Enable detailed logging by checking the browser console and server logs for:

-   API request/response details
-   Database operation results
-   Error messages and stack traces

## 🔮 Future Enhancements

### Planned Features

-   **User Authentication**: Secure user accounts and private sessions
-   **Session Sharing**: Share Q&A sessions with team members
-   **Export Options**: Download sessions as PDF or Word documents
-   **Analytics Dashboard**: Usage statistics and cost analysis
-   **Template Management**: Create and manage custom job description templates

### Customization Options

-   **Custom RLS Policies**: Implement user-specific access control
-   **Additional Fields**: Add custom metadata to sessions
-   **Integration APIs**: Connect with other HR tools and systems

## 📚 Additional Resources

-   [Supabase Documentation](https://supabase.com/docs)
-   [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
-   [TypeScript with Supabase](https://supabase.com/docs/guides/api/typescript-support)

## 🤝 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the browser console and server logs
3. Verify your environment variables and database setup
4. Check that all dependencies are installed correctly

---

**Note**: This database integration is designed to work alongside the existing AI features. All Q&A generation still uses OpenAI's API, but now the results are persistently stored for future reference and analysis.
