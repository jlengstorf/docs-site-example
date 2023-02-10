import { CodeBlock as CodeBlockProps } from '@/types';

export const CodeBlock: React.FC<CodeBlockProps> = (props) => {
    return (
        <div className="section bg-slate-50 my-8 rounded-sm border border-slate-200">
            {props.label && (
                <div className="border-b border-slate-200 py-1 px-4 bg-slate-200">
                    <span className="font-mono text-xs font-bold text-slate-500">{props.label}</span>
                </div>
            )}
            <pre className="pb-6 pt-4 px-4 overflow-x-scroll">
                <code className={`language-${props.code.language} bg-transparent border-none p-0`} dangerouslySetInnerHTML={{ __html: props.code.html }} />
            </pre>
        </div>
    );
};
