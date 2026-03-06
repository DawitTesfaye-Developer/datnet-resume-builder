import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPTS: Record<string, string> = {
  generate_summary: `You are a professional resume writer. Generate a compelling professional summary/objective statement based on the user's resume data. Keep it 2-4 sentences. Be specific, use strong action-oriented language, and highlight the candidate's unique value. Return ONLY the summary text, no labels or quotes.`,

  improve_text: `You are a professional resume editor. Improve the given text to be more impactful, concise, and professional. Use strong action verbs, quantify achievements where possible, and remove filler words. Return ONLY the improved text, no explanations.`,

  generate_bullets: `You are a professional resume writer. Generate 3-5 impactful achievement bullet points for the given role. Each bullet should start with a strong action verb, include quantifiable results where possible, and demonstrate impact. Return each bullet on a new line, starting with "• ". No other text.`,

  generate_from_job: `You are an expert resume consultant. Based on the provided job description, generate tailored resume content that would be a strong match. Return a JSON object with this exact structure:
{
  "summary": "A tailored professional summary",
  "skills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "experienceTips": ["tip1 for tailoring experience section", "tip2", "tip3"]
}
Return ONLY valid JSON, no markdown code blocks.`,

  review_resume: `You are an expert resume reviewer and career coach. Analyze the provided resume data and return a JSON object with this exact structure:
{
  "score": <number 1-100>,
  "grade": "<A+, A, B+, B, C+, C, D, F>",
  "strengths": ["strength1", "strength2", "strength3"],
  "improvements": ["actionable improvement 1", "actionable improvement 2", "actionable improvement 3", "actionable improvement 4"],
  "missingSecions": ["section that should be added"],
  "tips": ["specific tip 1", "specific tip 2"]
}
Score criteria: completeness (25%), impact of language (25%), quantified achievements (20%), relevance (15%), formatting/structure (15%). Return ONLY valid JSON, no markdown code blocks.`,

  generate_cover_letter: `You are a professional cover letter writer. Generate a compelling, personalized cover letter based on the provided resume data and job description. The letter should:
- Have a strong opening hook
- Highlight 2-3 most relevant experiences/achievements
- Show enthusiasm for the specific role/company
- Be 3-4 paragraphs, professional but personable
- End with a clear call to action
Return ONLY the cover letter text. Do not include "[Your Name]" placeholders - use the actual name provided.`,

  parse_resume_text: `You are a resume data extraction expert. Parse the provided raw text (from a resume, LinkedIn profile, or job description) and extract structured data. Return a JSON object with this exact structure:
{
  "personalInfo": {
    "fullName": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedIn": "",
    "github": "",
    "portfolio": "",
    "summary": ""
  },
  "experiences": [
    {
      "company": "",
      "position": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "current": false,
      "description": "",
      "achievements": []
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "gpa": "",
      "achievements": []
    }
  ],
  "skills": [{"name": "", "level": "intermediate"}],
  "certifications": [{"name": "", "issuer": "", "date": ""}],
  "languages": [{"name": "", "proficiency": ""}]
}
Only include fields that are found in the text. Use empty arrays for missing sections. Dates should be in YYYY-MM format when possible. Return ONLY valid JSON, no markdown code blocks.`,

  inline_improve: `You are a professional resume editor. Improve the given text to be more impactful and professional for a resume. Use strong action verbs and quantify where possible. Return ONLY the improved text, nothing else.`,

  inline_bullets: `You are a professional resume writer. Generate 3-4 impactful achievement bullet points for the given role context. Each bullet should start with a strong action verb and include quantifiable results. Return each bullet on its own line, starting with "• ". No other text.`,

  suggest_skills: `You are a career advisor. Based on the provided context (field, role, existing skills), suggest 5-8 additional relevant skills the candidate should add. Return ONLY a JSON array of skill name strings, no markdown code blocks. Example: ["Skill 1", "Skill 2"]`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const { action, context } = await req.json();

    const systemPrompt = SYSTEM_PROMPTS[action];
    if (!systemPrompt) {
      return new Response(JSON.stringify({ error: "Invalid action" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: context },
          ],
          stream: false,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits in Settings." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "";

    return new Response(JSON.stringify({ result: content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-resume error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
