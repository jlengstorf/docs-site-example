import Link from 'next/link';
import { Icon } from './Icon';

export const Footer: React.FC = () => {
    return (
        <div className="py-8 mt-12 border-t border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300">
            <span className="flex items-center justify-center space-x-2">
                <span className="block w-5">
                    <Icon.Heart />
                </span>
                <span className="text-sm">
                    Built by{' '}
                    <Link href="https://www.stackbit.com/" className="text-indigo-500 hover:text-indigo-800" target="_blank">
                        Stackbit
                    </Link>
                </span>
            </span>
        </div>
    );
};
