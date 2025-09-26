'use server';
/**
 * @fileOverview Generates content ideas based on a given topic.
 *
 * - generateContentIdeas - A function that generates content ideas.
 * - ContentIdeasInput - The input type for the generateContentIdeas function.
 * - ContentIdeasOutput - The return type for the generateContentIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContentIdeasInputSchema = z.object({
  topic: z.string().describe('The topic to generate content ideas for.'),
});
export type ContentIdeasInput = z.infer<typeof ContentIdeasInputSchema>;

const ContentIdeasOutputSchema = z.object({
  ideas: z.array(z.string()).describe('A list of content ideas.'),
});
export type ContentIdeasOutput = z.infer<typeof ContentIdeasOutputSchema>;

export async function generateContentIdeas(input: ContentIdeasInput): Promise<ContentIdeasOutput> {
  return generateContentIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contentIdeasPrompt',
  input: {schema: ContentIdeasInputSchema},
  output: {schema: ContentIdeasOutputSchema},
  prompt: `You are a content creation expert. Generate a list of content ideas based on the following topic:\n\nTopic: {{{topic}}}\n\nIdeas:`, // Ensure correct Handlebars syntax
});

const generateContentIdeasFlow = ai.defineFlow(
  {
    name: 'generateContentIdeasFlow',
    inputSchema: ContentIdeasInputSchema,
    outputSchema: ContentIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
