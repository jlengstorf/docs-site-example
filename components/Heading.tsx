import { TypeHeadingFields } from '@/types';

const headingTagMap: {
    [K in TypeHeadingFields['level']]: React.ElementType;
} = {
    '1': 'h1',
    '2': 'h2',
    '3': 'h3',
    '4': 'h4',
    '5': 'h5',
    '6': 'h6'
};

export const Heading: React.FC<TypeHeadingFields> = (props) => {
    const TagName = headingTagMap[props.level];
    return <TagName>{props.body}</TagName>;
};
