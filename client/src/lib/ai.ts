import type { LogEntry } from "@/pages/experiments/experiment-detail";

interface AIInsightParams {
  experimentId: string;
  experimentTitle: string;
  logs: LogEntry[];
  date: string;
}

export async function generateAIInsight(params: AIInsightParams): Promise<string> {
  try {
    const response = await fetch("/api/ai/insight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error("Failed to generate AI insight");
    }

    const data = await response.json();
    return data.insight || "AI insights will appear soon.";
  } catch (error) {
    console.error("Error generating AI insight:", error);
    return "Unable to generate insights at this time.";
  }
}
