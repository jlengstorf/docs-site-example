import { NavLink as NavLinkProps, SiteConfig } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavLink: React.FC<NavLinkProps & { topLevel?: boolean }> = (props) => {
    const router = useRouter();
    const isActive = props.page.urlPath === router.asPath;

    return (
        <li className={props.topLevel ? 'mb-6 last:mb-0 tracking-widest font-semibold uppercase' : 'tracking-normal normal-case font-normal mb-1 last:mb-0'}>
            <Link href={props.page.urlPath} className={`text-sm ${isActive ? 'text-indigo-500' : ''}`}>
                {props.label || props.page.title}
            </Link>
            {props.children && (
                <ul className="mt-1">
                    {props.children.map((child, index) => (
                        <NavLink key={index} {...child} />
                    ))}
                </ul>
            )}
        </li>
    );
};

export const Navigation: React.FC<{ items: SiteConfig['mainNavigation'] }> = (props) => {
    return (
        <div className="h-full px-4 py-8 border-r border-slate-200">
            <ul>
                {props.items.map((item, index) => (
                    <NavLink key={index} {...item} topLevel={true} />
                ))}
            </ul>
        </div>
    );
};
