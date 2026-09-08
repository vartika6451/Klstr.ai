export function chunkText(text: string, chunkSize: number = 800, overlap: number = 120): string[] {
  if (chunkSize <= overlap) {
    throw new Error("chunkSize must be greater than overlap");
  }

  const chunks: string[] = [];
  let i = 0;
  
  while (i < text.length) {
    let end = i + chunkSize;
    
    if (end >= text.length) {
      chunks.push(text.slice(i).trim());
      break;
    }
    
    // Try to find a natural break near the end of the chunk size
    let breakIndex = end;
    for (const sep of ["\n\n", "\n", ". ", " "]) {
      const lastSep = text.lastIndexOf(sep, end);
      if (lastSep > i + chunkSize / 2) { // only break if it's reasonably far into the chunk
        breakIndex = lastSep + sep.length;
        break;
      }
    }
    
    const chunk = text.slice(i, breakIndex).trim();
    if (chunk) {
      chunks.push(chunk);
    }
    
    // Advance index, moving back by 'overlap' amount to ensure continuity
    i = breakIndex - overlap;
    
    // Safety check to prevent infinite loop if overlap is somehow larger than progression
    if (breakIndex - i <= 0) {
        i = breakIndex; // force forward movement
    }
  }
  
  return chunks;
}
