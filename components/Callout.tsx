import { Callout as CalloutProps } from '@/types';
import { Icon } from './Icon';

export const Callout: React.FC<CalloutProps> = (props) => {
    return (
        <div className="section flex space-x-3 justify-start items-baseline p-4 bg-slate-100 border border-slate-200 rounded-md my-8">
            <span className="w-6 block relative top-[.5rem] flex-shrink-0 text-slate-400">
                <Icon.Info />
            </span>
            <span className="block" dangerouslySetInnerHTML={{ __html: props.body }} />
        </div>
    );
};
