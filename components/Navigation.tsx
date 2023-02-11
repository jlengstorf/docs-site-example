import { SiteConfig } from '@/types';
import Link from 'next/link';

export const Navigation: React.FC<{ items: SiteConfig['mainNavigation'] }> = (props) => {
    return (
        <div>
            {props.items.map((item, index) => {
                return (
                    <Link href={item.page.slug} key={index}>
                        {item.label || item.page.title}
                    </Link>
                );
            })}
        </div>
    );
};
