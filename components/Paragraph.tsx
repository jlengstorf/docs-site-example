import { Paragraph as ParagraphProps } from '@/types';

export const Paragraph: React.FC<ParagraphProps> = (props) => {
    return <p dangerouslySetInnerHTML={{ __html: props.body }} className="mb-4 last:mb-0" />;
};
