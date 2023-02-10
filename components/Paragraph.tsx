import { Paragraph as ParagraphProps } from '@/types';

export const Paragraph: React.FC<ParagraphProps> = (props) => {
    return <p dangerouslySetInnerHTML={{ __html: props.body }} className="section" />;
};
