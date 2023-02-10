import { List as ListProps } from '@/types';
import { Paragraph } from './Paragraph';

const listTagMap: {
    [K in ListProps['listType']]: { tagName: React.ElementType; className: string };
} = {
    ordered: { tagName: 'ol', className: 'list-decimal' },
    unordered: { tagName: 'ul', className: 'list-disc' }
};

export const List: React.FC<ListProps> = (props) => {
    const TagName = listTagMap[props.listType].tagName;

    return (
        <TagName className={`section ml-6 marker:text-slate-400 ${listTagMap[props.listType].className}`}>
            {props.items.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item.body }} className="mb-1 last:mb-0" />
            ))}
        </TagName>
    );
};
