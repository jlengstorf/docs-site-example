import { Paragraph as ParagraphProps } from '@/types';

export const Paragraph: React.FC<ParagraphProps> = (props) => {
    return <p>{props.body}</p>;
};
