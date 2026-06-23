export function renderCustomMarkdown(text: string) {
  if (!text) return null;

  // Split lines
  const lines = text.split("\n");
  const renderedElements: React.ReactNode[] = [];
  let currentTableRows: string[][] = [];
  let inTable = false;
  let keyCounter = 0;

  const flushTable = () => {
    if (currentTableRows.length > 0) {
      // Find headers (row 0)
      const headers = currentTableRows[0];
      // Skip row 1 (separator i.e. |---|)
      const dataRows = currentTableRows.slice(2);

      renderedElements.push(
        <div key={`table-${keyCounter++}`} className="my-6 overflow-x-auto border border-purple-950/20 rounded-xl bg-slate-950/40">
          <table className="w-full text-left font-sans text-xs border-collapse">
            <thead>
              <tr className="border-b border-purple-950/25 bg-purple-950/20">
                {headers.map((h, i) => (
                  <th key={i} className="p-3 font-bold text-purple-300 uppercase tracking-wider font-mono text-[10px]">
                    {h.trim().replace(/\*\*/g, "")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, ri) => (
                <tr key={ri} className="border-b border-purple-950/10 hover:bg-purple-950/5 transition-colors">
                  {row.map((cell, ci) => {
                    const cleanCell = cell.trim();
                    const isBold = cleanCell.startsWith("**") && cleanCell.endsWith("**");
                    const cellContent = isBold ? cleanCell.replace(/\*\*/g, "") : cleanCell;
                    return (
                      <td key={ci} className={`p-3 text-slate-300 leading-relaxed ${isBold ? "font-bold text-white" : ""}`}>
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTableRows = [];
    }
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check table line
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      inTable = true;
      // Parse columns
      const cells = line.split("|").slice(1, -1);
      currentTableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable();
    }

    const trimmed = line.trim();

    // Headers
    if (trimmed.startsWith("###")) {
      renderedElements.push(
        <h4 key={keyCounter++} className="text-sm font-black text-white tracking-tight mt-6 mb-3 uppercase font-mono text-purple-400">
          {trimmed.replace("###", "").trim()}
        </h4>
      );
    } else if (trimmed.startsWith("##")) {
      renderedElements.push(
        <h3 key={keyCounter++} className="text-base font-black text-white tracking-tight mt-8 mb-4 border-b border-purple-950/10 pb-2">
          {trimmed.replace("##", "").trim()}
        </h3>
      );
    } else if (trimmed.startsWith("#")) {
      renderedElements.push(
        <h2 key={keyCounter++} className="text-lg font-black text-white tracking-tight mt-4 mb-4">
          {trimmed.replace("#", "").trim()}
        </h2>
      );
    } else if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
      // List items
      renderedElements.push(
        <div key={keyCounter++} className="flex items-start space-x-2 my-1.5 pl-2 font-sans text-xs text-slate-300">
          <span className="text-purple-400 mt-1.5 font-bold">•</span>
          <span className="leading-relaxed">
            {trimmed.substring(1).trim().replace(/\*\*/g, "")}
          </span>
        </div>
      );
    } else if (trimmed.length > 0) {
      // Regular paragraph
      // Check for inline strong markers **
      renderedElements.push(
        <p key={keyCounter++} className="text-xs font-sans font-light leading-relaxed text-slate-300 my-3">
          {trimmed.split("**").map((part, index) => {
            return index % 2 === 1 ? <strong key={index} className="font-bold text-white">{part}</strong> : part;
          })}
        </p>
      );
    }
  }

  if (inTable) {
    flushTable();
  }

  return <div className="space-y-2">{renderedElements}</div>;
}
