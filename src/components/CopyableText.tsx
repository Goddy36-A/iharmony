import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyableTextProps {
  text: string;
  className?: string;
}

const CopyableText = ({ text, className = '' }: CopyableTextProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className={`w-full flex items-center justify-between gap-2 text-left text-xs text-primary/80 font-mono p-1.5 rounded hover:bg-primary/10 transition-colors group ${className}`}
    >
      <span>{text}</span>
      {copied ? (
        <Check className="w-3.5 h-3.5 text-accent shrink-0" />
      ) : (
        <Copy className="w-3.5 h-3.5 opacity-40 group-hover:opacity-80 shrink-0 transition-opacity" />
      )}
    </button>
  );
};

export default CopyableText;
