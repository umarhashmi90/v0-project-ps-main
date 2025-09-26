'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { motion } from 'framer-motion';
import { contentResearch } from '@/ai/flows/content-research';
import { summarizeText } from '@/ai/flows/text-summarization';
import { generateContentIdeas } from '@/ai/flows/content-ideas';
import { Loader2 } from 'lucide-react';

export default function AiToolsPage() {
  const [researchTopic, setResearchTopic] = useState('');
  const [researchResult, setResearchResult] = useState<any>(null);
  const [isResearching, setIsResearching] = useState(false);

  const [textToSummarize, setTextToSummarize] = useState('');
  const [summaryResult, setSummaryResult] = useState<string>('');
  const [isSummarizing, setIsSummarizing] = useState(false);

  const [ideasTopic, setIdeasTopic] = useState('');
  const [ideasResult, setIdeasResult] = useState<string[]>([]);
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);

  const handleResearch = async () => {
    setIsResearching(true);
    setResearchResult(null);
    try {
      const result = await contentResearch({ topic: researchTopic });
      setResearchResult(result);
    } catch (error) {
      console.error("Error during content research:", error);
    } finally {
      setIsResearching(false);
    }
  };

  const handleSummarize = async () => {
    setIsSummarizing(true);
    setSummaryResult('');
    try {
      const result = await summarizeText({ text: textToSummarize });
      setSummaryResult(result.summary);
    } catch (error) {
      console.error("Error during text summarization:", error);
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleGenerateIdeas = async () => {
    setIsGeneratingIdeas(true);
    setIdeasResult([]);
    try {
      const result = await generateContentIdeas({ topic: ideasTopic });
      setIdeasResult(result.ideas);
    } catch (error) {
      console.error("Error generating content ideas:", error);
    } finally {
      setIsGeneratingIdeas(false);
    }
  };


  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex-1 pt-28 md:pt-32">
        <div className="container py-12">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                  <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
                      Textify AI Tools
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-muted-foreground">
                      Leverage the power of AI to streamline your content creation process. Research topics, summarize text, and generate new ideas with ease.
                  </p>
              </motion.div>
            </div>

            <div className="mt-16">
                <Tabs defaultValue="research" className="w-full max-w-3xl mx-auto">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="research">Content Research</TabsTrigger>
                        <TabsTrigger value="summarize">Text Summarization</TabsTrigger>
                        <TabsTrigger value="ideas">Content Ideas</TabsTrigger>
                    </TabsList>

                    {/* Content Research Tab */}
                    <TabsContent value="research">
                        <Card>
                            <CardHeader>
                                <CardTitle>AI Content Research</CardTitle>
                                <CardDescription>Enter a topic to find relevant resources and insights.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Textarea 
                                    placeholder="e.g., The future of renewable energy" 
                                    value={researchTopic}
                                    onChange={(e) => setResearchTopic(e.target.value)}
                                />
                                {researchResult && (
                                    <div className="p-4 border rounded-md bg-gray-50 space-y-4 max-h-96 overflow-y-auto">
                                        <h3 className="font-bold text-lg">Key Insights:</h3>
                                        <p>{researchResult.insights}</p>
                                        <h3 className="font-bold text-lg">Resources:</h3>
                                        <ul className="space-y-2">
                                            {researchResult.resources.map((res: any, index: number) => (
                                                <li key={index} className="border-b pb-2">
                                                    <a href={res.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">{res.title}</a>
                                                    <p className="text-sm text-muted-foreground">{res.description}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleResearch} disabled={isResearching}>
                                    {isResearching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isResearching ? 'Researching...' : 'Start Research'}
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* Text Summarization Tab */}
                    <TabsContent value="summarize">
                         <Card>
                            <CardHeader>
                                <CardTitle>Text Summarization</CardTitle>
                                <CardDescription>Paste your text below to get a concise summary.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Textarea 
                                    placeholder="Paste a long article or text here..." 
                                    className="min-h-40"
                                    value={textToSummarize}
                                    onChange={(e) => setTextToSummarize(e.target.value)}
                                />
                                {summaryResult && (
                                    <div className="p-4 border rounded-md bg-gray-50">
                                        <h3 className="font-bold text-lg mb-2">Summary:</h3>
                                        <p>{summaryResult}</p>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleSummarize} disabled={isSummarizing}>
                                    {isSummarizing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isSummarizing ? 'Summarizing...' : 'Summarize Text'}
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* Content Ideas Tab */}
                    <TabsContent value="ideas">
                         <Card>
                            <CardHeader>
                                <CardTitle>Content Idea Generation</CardTitle>
                                <CardDescription>Enter a topic to brainstorm content ideas.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Textarea 
                                    placeholder="e.g., Healthy breakfast recipes" 
                                    value={ideasTopic}
                                    onChange={(e) => setIdeasTopic(e.target.value)}
                                />
                                {ideasResult.length > 0 && (
                                    <div className="p-4 border rounded-md bg-gray-50">
                                        <h3 className="font-bold text-lg mb-2">Content Ideas:</h3>
                                        <ul className="list-disc pl-5 space-y-1">
                                            {ideasResult.map((idea, index) => (
                                                <li key={index}>{idea}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                <Button onClick={handleGenerateIdeas} disabled={isGeneratingIdeas}>
                                    {isGeneratingIdeas && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isGeneratingIdeas ? 'Generating...' : 'Generate Ideas'}
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
