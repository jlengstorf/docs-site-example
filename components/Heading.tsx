import { Heading as HeadingProps } from '@/types';

const headingTagMap: {
    [K in HeadingProps['level']]: { tagName: React.ElementType; className: string };
} = {
    '1': { tagName: 'h1', className: '' },
    '2': { tagName: 'h2', className: 'mb-3 mt-8' },
    '3': { tagName: 'h3', className: 'mb-2' },
    '4': { tagName: 'h4', className: '' },
    '5': { tagName: 'h5', className: '' },
    '6': { tagName: 'h6', className: '' }
};

export const Heading: React.FC<HeadingProps> = (props) => {
    const TagName = headingTagMap[props.level].tagName;
    return <TagName className={headingTagMap[props.level].className}>{props.body}</TagName>;
};
