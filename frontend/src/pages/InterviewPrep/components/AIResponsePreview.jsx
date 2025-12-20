import React, { useState } from "react";
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const AIResponsePreview = ({ content }) => {
  if (!content) return null;

  // Clean and format the content
  const cleanContent = (text) => {
    if (!text) return "";
    
    let cleaned = String(text);
    
    // First, protect code blocks from being modified
    const codeBlockRegex = /```[\s\S]*?```/g;
    const codeBlocks = [];
    let codeBlockIndex = 0;
    
    cleaned = cleaned.replace(codeBlockRegex, (match) => {
      codeBlocks.push(match);
      return `__CODE_BLOCK_${codeBlockIndex++}__`;
    });
    
    // Remove any JSON object patterns that might be showing as raw text
    // Try to extract content from JSON if it exists
    const jsonObjectMatch = cleaned.match(/\{\s*"title"\s*:\s*"[^"]*"\s*,\s*"explanation"\s*:\s*"([^"]*(?:\\.[^"]*)*)"\s*\}/);
    if (jsonObjectMatch && jsonObjectMatch[1]) {
      // Extract the explanation from JSON structure
      cleaned = jsonObjectMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n');
    } else {
      // Remove standalone JSON-like text patterns
      cleaned = cleaned.replace(/\{\s*"title"\s*:[\s\S]*?"explanation"\s*:[\s\S]*?\}/g, "");
      cleaned = cleaned.replace(/\{\s*"explanation"\s*:[\s\S]*?"title"\s*:[\s\S]*?\}/g, "");
    }
    
    // Convert <br> and <br/> tags to line breaks
    cleaned = cleaned.replace(/<br\s*\/?>/gi, "\n\n");
    
    // Handle escaped characters that might be showing as literal text
    cleaned = cleaned.replace(/\\n/g, "\n");
    cleaned = cleaned.replace(/\\t/g, "  "); // Convert tabs to spaces
    cleaned = cleaned.replace(/\\r/g, "");
    cleaned = cleaned.replace(/\\"/g, '"');
    cleaned = cleaned.replace(/\\'/g, "'");
    
    // Remove any remaining JSON artifacts (like escaped braces)
    cleaned = cleaned.replace(/\\\{/g, "");
    cleaned = cleaned.replace(/\\\}/g, "");
    
    // Restore code blocks
    codeBlocks.forEach((block, index) => {
      cleaned = cleaned.replace(`__CODE_BLOCK_${index}__`, block);
    });
    
    // Clean up multiple consecutive newlines (more than 2) but preserve code blocks
    cleaned = cleaned.replace(/\n{3,}/g, "\n\n");
    
    // Remove any remaining JSON artifacts at the start/end
    cleaned = cleaned.replace(/^[\s\n]*\{[\s\S]*?"explanation"\s*:\s*"([\s\S]*?)"[\s\S]*?\}[\s\n]*$/m, '$1');
    
    // Clean up any remaining escaped quotes and newlines
    cleaned = cleaned.replace(/\\"/g, '"');
    cleaned = cleaned.replace(/\\n/g, '\n');
    
    return cleaned.trim();
  };

  const formattedContent = cleanContent(content);

  return (
    <div className="max-w-4xl mx-auto py-4">
      <div className="text-[15px] prose prose-slate dark:prose-invert max-w-none leading-relaxed">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";

              const isInLine = !className;

              return !isInLine ? (
                <CodeBlock
                  code={String(children).replace(/\n$/, "")}
                  language={language}
                />
              ) : (
                <code
                  className="px-1 py-0.5 bg-gray-100 rounded text-sm"
                  {...props}
                >
                  {children}
                </code>
              );
            },

            p({ children }) {
              return <p className="mb-5 leading-7 text-gray-700">{children}</p>;
            },
            strong({ children }) {
              return <strong>{children}</strong>;
            },
            em({ children }) {
              return <em>{children}</em>;
            },
            ul({ children }) {
              return (
                <ul className="list-disc pl-6 space-y-3 my-5">{children}</ul>
              );
            },
            ol({ children }) {
              return (
                <ol className="list-decimal pl-6 space-y-3 my-5">{children}</ol>
              );
            },
            li({ children }) {
              return <li className="mb-2 leading-6">{children}</li>;
            },
            blockquote({ children }) {
              return (
                <blockquote className="border-l-4 border-gray-300 pl-5 italic my-5 text-gray-600">
                  {children}
                </blockquote>
              );
            },
            h1({ children }) {
              return (
                <h1 className="text-2xl font-bold mt-8 mb-5">{children}</h1>
              );
            },
            h2({ children }) {
              return (
                <h2 className="text-xl font-bold mt-7 mb-4">{children}</h2>
              );
            },
            h3({ children }) {
              return (
                <h3 className="text-lg font-bold mt-6 mb-3">{children}</h3>
              );
            },
            h4({ children }) {
              return <h4 className="text-base font-bold mt-5 mb-3">{children}</h4>;
            },
            a({ children, href }) {
              return (
                <a className="text-blue-600 hover:underline" href={href}>
                  {children}
                </a>
              );
            },
            table({ children }) {
              return (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full divide-y divide-gray-300 border border-gray-200">
                    {children}
                  </table>
                </div>
              );
            },
            thead({ children }) {
              return <thead className="bg-gray-50">{children}</thead>;
            },
            tbody({ children }) {
              return (
                <tbody className="divide-y divide-gray-200">{children}</tbody>
              );
            },
            tr({ children }) {
              return <tr>{children}</tr>;
            },
            th({ children }) {
              return (
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide ">
                  {children}
                </th>
              );
            },
            td({ children }) {
              return (
                <td className="px-3 py-2 whitespace-nowrap text-sm">
                  {children}
                </td>
              );
            },
            hr() {
              return <hr className="my-6 border-gray-200" />;
            },
            img({ src, alt }) {
              if (!src || src === "") return null;
              return (
                <img src={src} alt={alt || ""} className="my-4 max-w-full rounded " />
              );
            },
          }}
        >
          {formattedContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-7 rounded-lg overflow-hidden bg-gray-50 border border-gray-200 ">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <LuCode size={16} className="text-gray-500" />
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            {language || "Code"}
          </span>
        </div>
        <button
          onClick={copyCode}
          className="text-gray-500 cursor-pointer hover:text-gray-700 focus:outline-none relative group "
          aria-label="Copy Code"
        >
          {copied ? (
            <LuCheck size={16} className="text-green-600" />
          ) : (
            <LuCopy size={16} className="" />
          )}
          {copied && (
            <span className="absolute -top-8 right-0 bg-black text-white text-xs rounded-md px-2 py-1 opacity-80 group-hover:opacity-100 transition">
              Copied!
            </span>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{
          fontSize: 12.5,
          margin: 0,
          padding: "1rem",
          background: "transparent",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default AIResponsePreview;
