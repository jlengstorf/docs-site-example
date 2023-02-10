import { CodeBlock as CodeBlockProps } from '@/types';

export const CodeBlock: React.FC<CodeBlockProps> = (props) => {
    return (
        <p>
            <code>CodeBlock</code>: {props.body}
        </p>
    );
};
