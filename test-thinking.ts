import fs from 'fs';
const envFile = fs.readFileSync('.env', 'utf8');
const envMatch = envFile.match(/GEMINI_API_KEY=\s*["']?([^"'\n\r]+)["']?/);
const apiKey = envMatch ? envMatch[1].trim() : '';

async function test() {
  const model = 'gemini-3.7-flash';
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  // With maxOutputTokens: 1024 (current setting)
  console.log("=== Testing with maxOutputTokens: 1024 ===");
  const res1 = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: 'Give an in detail summary of a 2-page resume with all sections, education, skills, projects, and achievements.' }] }],
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.3,
      }
    })
  });
  const data1 = await res1.json();
  console.log("Candidate 1:", JSON.stringify({
    finishReason: data1.candidates?.[0]?.finishReason,
    usageMetadata: data1.usageMetadata,
    partsLength: data1.candidates?.[0]?.content?.parts?.length,
    partsSample: data1.candidates?.[0]?.content?.parts?.map((p: any) => ({
      thought: !!p.thought,
      textLength: p.text?.length,
      textSample: p.text?.slice(0, 100)
    }))
  }, null, 2));

  // With maxOutputTokens: 4096 and thinkingConfig disabled / budgeted
  console.log("\n=== Testing with maxOutputTokens: 4096 ===");
  const res2 = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: 'Give an in detail summary of a 2-page resume with all sections, education, skills, projects, and achievements.' }] }],
      generationConfig: {
        maxOutputTokens: 4096,
        temperature: 0.3,
        thinkingConfig: {
          thinkingBudget: 0 // turn off or limit thinking tokens so all tokens go to output!
        }
      }
    })
  });
  const data2 = await res2.json();
  console.log("Candidate 2 (thinkingBudget: 0):", JSON.stringify({
    finishReason: data2.candidates?.[0]?.finishReason,
    usageMetadata: data2.usageMetadata,
    partsLength: data2.candidates?.[0]?.content?.parts?.length,
    partsSample: data2.candidates?.[0]?.content?.parts?.map((p: any) => ({
      thought: !!p.thought,
      textLength: p.text?.length,
      textSample: p.text?.slice(0, 100)
    }))
  }, null, 2));
}

test().catch(console.error);
