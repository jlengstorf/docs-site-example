import { SiteConfig } from '@/types';
import Link from 'next/link';

export const Header: React.FC<SiteConfig> = (props) => {
    return (
        <div className="border-b border-slate-200">
            <div className="flex items-center justify-between px-6 py-4">
                <Link href="/" className="font-black">
                    {props.title}
                </Link>
            </div>
        </div>
    );
};
