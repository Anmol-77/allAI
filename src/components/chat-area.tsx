"use client";

import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Image, AlertCircle, Mic, PenLine, Sun, Lightbulb } from "lucide-react";

type Message = {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
};

interface ModelOption {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export function ChatArea() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showModelSelector, setShowModelSelector] = useState(false);

  const modelOptions: ModelOption[] = [
    { id: "gemini-flash", name: "Gemini 2.0 Flash", icon: <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">G</div> },
    { id: "o1", name: "deepseek r1", icon: <div className="w-5 h-5 rounded-full bg-zinc-600 flex items-center justify-center text-white text-xs">D</div> },
  ];

  const [selectedModel, setSelectedModel] = useState<ModelOption>(modelOptions[0]); // Default to Claude

  const handleSendMessage = async() => {
    if (!input.trim()) return;

    const newUserMessage: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sender: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, newUserMessage]);
    setInput("");

    const res = await fetch(`http://localhost:8000/api/chat`,{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: input,
        model: selectedModel.name,
      })
    });
    const data = await res.json();
    const contents: string = data.response;

    const aiResponse: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sender: "ai",
      content: contents,
      timestamp: new Date(),
    };
    setMessages(prevMessages => [...prevMessages, aiResponse]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Custom markdown components for styling
  const markdownComponents = {
    code({ inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          className="rounded-md"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="bg-zinc-700 text-pink-300 px-1 py-0.5 rounded text-sm" {...props}>
          {children}
        </code>
      );
    },
    pre({ children }: any) {
      return <div className="my-2">{children}</div>;
    },
    h1({ children }: any) {
      return <h1 className="text-xl font-bold mb-2 text-white">{children}</h1>;
    },
    h2({ children }: any) {
      return <h2 className="text-lg font-semibold mb-2 text-white">{children}</h2>;
    },
    h3({ children }: any) {
      return <h3 className="text-md font-medium mb-2 text-white">{children}</h3>;
    },
    p({ children }: any) {
      return <p className="mb-2 text-zinc-100 leading-relaxed">{children}</p>;
    },
    // FIXED: Changed from list-inside to list-outside with proper padding
    ul({ children }: any) {
      return <ul className="list-disc list-outside mb-2 text-zinc-100 space-y-1 pl-6">{children}</ul>;
    },
    ol({ children }: any) {
      return <ol className="list-decimal list-outside mb-2 text-zinc-100 space-y-1 pl-6">{children}</ol>;
    },
    // FIXED: Removed redundant text color since it's inherited from ul
    li({ children }: any) {
      return <li className="leading-relaxed">{children}</li>;
    },
    blockquote({ children }: any) {
      return (
        <blockquote className="border-l-4 border-zinc-600 pl-4 py-2 my-2 bg-zinc-800 rounded-r">
          {children}
        </blockquote>
      );
    },
    a({ href, children }: any) {
      return (
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          {children}
        </a>
      );
    },
    strong({ children }: any) {
      return <strong className="font-semibold text-white">{children}</strong>;
    },
    em({ children }: any) {
      return <em className="italic text-zinc-200">{children}</em>;
    },
  };

  return (
    <div className="flex flex-col h-full bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between  p-4">
        <div>
          <h2 className="text-xl font-semibold">Chat</h2>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 border border-zinc-700">
           
          </Avatar>
          <span className="text-zinc-400">0</span>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
            <AlertCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
            <Sun className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main chat area */}
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="mb-4">
              <Lightbulb className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
              <h2 className="text-2xl font-bold mb-2">Good evening, Anmol</h2>
              <p className="text-zinc-400 max-w-md">Ask anything or start with one of the suggestions below</p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full max-w-md">
              {[
                "Explain centrally symmetric distributions",
                "How do I fix MongoDB validation errors?",
                "Create a custom unpickling module for Torch",
                "Best practices for HTML/CSS/JS separation"
              ].map((suggestion, i) => (
                <Button
                  key={`suggestion-${i}`}
                  variant="outline"
                  className="bg-zinc-800 border-zinc-700 text-left justify-start h-auto py-2 px-3"
                  onClick={() => {
                    setInput(suggestion);
                  }}
                >
                  <span className="truncate text-sm">{suggestion}</span>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex ${message.sender === "user" ? "flex-row-reverse" : "flex-row"} gap-3 max-w-[80%]`}>
                  <Avatar className={`h-8 w-8 ${message.sender === "user" ? "bg-blue-600" : "bg-white"} flex-shrink-0`}>
                    {message.sender === "user" ? (
                      <span></span>
                    ) : (
                      <span></span>
                    )}
                  </Avatar>

                  <div className={`rounded-lg py-3 px-4 ${message.sender === "user" ? "bg-blue-600" : "bg-black-800"}`}>
                    {message.sender === "ai" ? (
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown 
                          components={markdownComponents}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Model selector */}
      {showModelSelector && (
        <div className="border border-zinc-800 bg-zinc-900 m-4 ">
          <div className="p-5">
            <p className="text-xs text-zinc-500 px-2 py-1">Explore models</p>
            <div className="grid grid-cols-1 max-h-[280px] overflow-y-auto w-1/4">
              {modelOptions.map((model) => (
                <Button
                  key={model.id}
                  variant="ghost"
                  className={`justify-start h-auto py-2 px-3 ${
                    selectedModel.id === model.id ? "bg-zinc-800" : ""
                  }`}
                  onClick={() => {
                    setSelectedModel(model);
                    setShowModelSelector(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    {model.icon}
                    <span className="text-sm">{model.name}</span>
                  </div>
                  {selectedModel.id === model.id && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-green-500" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="p-4">
        <div className="relative">
          <Card className="bg-zinc-800 border-zinc-700">
            <div className="flex items-end">
              <Button
                variant="ghost"
                className="h-8 w-8 text-zinc-400 absolute left-2 bottom-2"
                onClick={() => setShowModelSelector(!showModelSelector)}
              >
                {selectedModel.icon}
              </Button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask anything..."
                className="bg-transparent border-0 focus:ring-0 text-white resize-none py-3 pl-10 pr-16 w-full focus:outline-none"
                style={{ minHeight: "46px", maxHeight: "120px" }}
              />
              <div className="absolute right-2 bottom-2 flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
                  <Image className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
                  <PenLine className="h-5 w-5" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  size="icon"
                  className={`h-8 w-8 rounded-full ${
                    input.trim() ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-zinc-700 text-zinc-500"
                  }`}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}