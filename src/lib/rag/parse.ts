// @ts-ignore
import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';

export async function parseDocument(buffer: Buffer, mimetype: string, filename: string): Promise<string> {
  let text = '';
  
  if (mimetype === 'application/pdf' || filename.endsWith('.pdf')) {
    try {
      const parser = new PDFParse({ data: buffer });
      const data = await parser.getText();
      text = data.text;
      await parser.destroy();
    } catch (e: any) {
      throw new Error(`PDF parsing error: ${e.message || e}`);
    }
  } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || filename.endsWith('.docx')) {
    try {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } catch (e: any) {
      throw new Error(`DOCX parsing error: ${e.message || e}`);
    }
  } else if (mimetype === 'text/plain' || mimetype === 'text/markdown' || filename.endsWith('.txt') || filename.endsWith('.md')) {
    text = buffer.toString('utf-8');
  } else {
    throw new Error(`Unsupported file type: ${mimetype} (${filename})`);
  }

  if (!text.trim()) {
    throw new Error("No extractable text found in this file.");
  }

  return text;
}
