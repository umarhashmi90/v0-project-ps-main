// This file holds the Genkit flow for content research.

'use server';

/**
 * @fileOverview An AI agent that provides relevant resources and insights to aid in content research.
 *
 * - contentResearch - A function that handles the content research process.
 * - ContentResearchInput - The input type for the contentResearch function.
 * - ContentResearchOutput - The return type for the contentResearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContentResearchInputSchema = z.object({
  topic: z.string().describe('The topic to research.'),
});
export type ContentResearchInput = z.infer<typeof ContentResearchInputSchema>;

const ContentResearchOutputSchema = z.object({
  resources: z.array(
    z.object({
      title: z.string().describe('The title of the resource.'),
      url: z.string().describe('The URL of the resource.'),
      description: z.string().describe('A brief description of the resource.'),
    })
  ).describe('A list of relevant resources for the topic.'),
  insights: z.string().describe('Key insights and information related to the topic.'),
});
export type ContentResearchOutput = z.infer<typeof ContentResearchOutputSchema>;

export async function contentResearch(input: ContentResearchInput): Promise<ContentResearchOutput> {
  return contentResearchFlow(input);
}

const contentResearchPrompt = ai.definePrompt({
  name: 'contentResearchPrompt',
  input: {schema: ContentResearchInputSchema},
  output: {schema: ContentResearchOutputSchema},
  prompt: `You are an AI research assistant.  Your task is to research the given topic and provide a list of resources and key insights.

Topic: {{{topic}}}

Provide a list of relevant resources with their titles, URLs, and descriptions. Also, provide key insights and information related to the topic.
`,
});

const contentResearchFlow = ai.defineFlow(
  {
    name: 'contentResearchFlow',
    inputSchema: ContentResearchInputSchema,
    outputSchema: ContentResearchOutputSchema,
  },
  async input => {
    const {output} = await contentResearchPrompt(input);
    return output!;
  }
);
