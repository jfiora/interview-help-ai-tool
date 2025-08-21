import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { auth } from '@clerk/nextjs/server';

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
    try {
        // Get the authenticated user
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        const { jobTitle, jobDescription, userEmail } = await request.json();

        if (!jobTitle || !jobDescription) {
            return NextResponse.json(
                { error: 'Job title and description are required' },
                { status: 400 }
            );
        }

        // Sanitize inputs
        const sanitizedJobTitle = jobTitle.trim();
        const sanitizedJobDescription = jobDescription.trim();
        const sanitizedUserEmail = userEmail?.trim() || '';

        // Create the prompt using the user's specific format
        const prompt = `Based on the following job description, create the profile of the ideal candidate for this role. Provide:

A short LinkedIn 'About' description (3–4 sentences) that highlights expertise, impact, and personality in a way optimized for recruiters. Also add the email contact from the profile of the user that generates this prompt.

A 1-sentence LinkedIn headline/job title that is concise, keyword-rich, and attractive for hiring managers.

Here is the job description: ${sanitizedJobDescription}

Please format your response as JSON with the following structure:
{
  "linkedinAbout": "The LinkedIn About section with email contact",
  "linkedinHeadline": "The concise LinkedIn headline/job title"
}`;

        // Generate content using OpenAI
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content:
                        'You are a professional career coach and LinkedIn optimization expert. Generate concise, professional LinkedIn profile content that will help candidates stand out to recruiters.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        const responseContent = completion.choices[0]?.message?.content;

        if (!responseContent) {
            throw new Error('No response from OpenAI');
        }

        // Parse the JSON response
        let parsedResponse;
        try {
            // Extract JSON from markdown if wrapped in code blocks
            const jsonMatch = responseContent.match(
                /```json\s*([\s\S]*?)\s*```/
            );
            const jsonContent = jsonMatch ? jsonMatch[1] : responseContent;
            parsedResponse = JSON.parse(jsonContent);
        } catch (parseError) {
            console.error('Failed to parse OpenAI response:', parseError);
            // Fallback: try to extract content manually
            const aboutMatch = responseContent.match(
                /linkedinAbout["\s]*:["\s]*"([^"]+)"/i
            );
            const headlineMatch = responseContent.match(
                /linkedinHeadline["\s]*:["\s]*"([^"]+)"/i
            );

            parsedResponse = {
                linkedinAbout: aboutMatch
                    ? aboutMatch[1]
                    : 'Professional profile description',
                linkedinHeadline: headlineMatch
                    ? headlineMatch[1]
                    : 'Professional Title',
            };
        }

        // Add email to the about section if provided
        if (
            sanitizedUserEmail &&
            !parsedResponse.linkedinAbout.includes(sanitizedUserEmail)
        ) {
            parsedResponse.linkedinAbout += `\n\nContact: ${sanitizedUserEmail}`;
        }

        return NextResponse.json({
            success: true,
            data: {
                linkedinAbout: parsedResponse.linkedinAbout,
                linkedinHeadline: parsedResponse.linkedinHeadline,
                jobTitle: sanitizedJobTitle,
            },
        });
    } catch (error) {
        console.error('Error generating LinkedIn profile:', error);
        return NextResponse.json(
            { error: 'Failed to generate LinkedIn profile content' },
            { status: 500 }
        );
    }
}
