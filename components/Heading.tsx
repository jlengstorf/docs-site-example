import { Heading as HeadingProps } from '@/types';

const headingTagMap: {
    [K in HeadingProps['level']]: React.ElementType;
} = {
    '1': 'h1',
    '2': 'h2',
    '3': 'h3',
    '4': 'h4',
    '5': 'h5',
    '6': 'h6'
};

export const Heading: React.FC<HeadingProps> = (props) => {
    const TagName = headingTagMap[props.level];
    return <TagName>{props.body}</TagName>;
};
