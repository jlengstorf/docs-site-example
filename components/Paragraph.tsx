import { Paragraph as ParagraphProps } from '@/types';

export const Paragraph: React.FC<ParagraphProps> = (props) => {
    return (
        <p>
            <code>Paragraph</code>: {props.body}
        </p>
    );
};
