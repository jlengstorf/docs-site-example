import { Callout as CalloutProps } from '@/types';
import { Icon } from './Icon';

export const Callout: React.FC<CalloutProps> = (props) => {
    return (
        <div className="flex items-baseline justify-start p-4 my-8 space-x-3 border rounded-md section bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-600">
            <span className="w-6 block relative top-[.5rem] flex-shrink-0 text-slate-400">
                <Icon.Info />
            </span>
            <span className="block" dangerouslySetInnerHTML={{ __html: props.body }} />
        </div>
    );
};
