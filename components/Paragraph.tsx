import { TypeParagraphFields } from '@/types';

export const Paragraph: React.FC<TypeParagraphFields> = (props) => {
    return <p>{props.body}</p>;
};
