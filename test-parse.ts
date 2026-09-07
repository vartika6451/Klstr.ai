import { parseDocument } from './src/lib/rag/parse';
import * as fs from 'fs';

async function run() {
  try {
    const buffer = fs.readFileSync('test.txt');
    const txt = await parseDocument(buffer, 'text/plain', 'test.txt');
    console.log("TXT success:", txt.substring(0, 50));
    
    // We don't have a PDF, let's create a fake PDF buffer and see what happens
    // A fake PDF will fail parsing, but we want to see if `pdf-parse` is loaded properly
    const fakePdf = Buffer.from('%PDF-1.4\n%Fake PDF data\n%%EOF');
    const pdfTxt = await parseDocument(fakePdf, 'application/pdf', 'test.pdf');
    console.log("PDF success:", pdfTxt);
  } catch(e) {
    console.error("Error:", e);
  }
}
run();
