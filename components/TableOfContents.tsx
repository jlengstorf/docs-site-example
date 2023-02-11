import { PageHeading } from '@/types';
import Link from 'next/link';
import { Icon } from './Icon';

const headingLevelClassMap: {
    [K in PageHeading['level']]: string;
} = {
    '1': '',
    '2': '',
    '3': 'ml-3',
    '4': 'ml-6',
    '5': 'ml-9',
    '6': 'ml-12'
};

export const TableOfContents: React.FC<{ items: PageHeading[] }> = (props) => {
    if ((props.items || []).length === 0) return null;

    return (
        <div>
            <p className="mb-3 text-sm font-semibold tracking-widest uppercase">On This Page</p>
            <ul>
                {props.items.map((item, index) => {
                    return (
                        <li key={index} className={`mb-1 text-sm ${headingLevelClassMap[item.level]}`}>
                            <Link href={item.href}>{item.title}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
