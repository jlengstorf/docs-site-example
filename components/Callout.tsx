import { Callout as CalloutProps } from '@/types';
import { Icon } from './Icon';

export const Callout: React.FC<CalloutProps> = (props) => {
    return (
        <div className="flex space-x-3 justify-start items-baseline p-4 bg-slate-100 border border-slate-200 mb-4 last-mb-0 rounded-sm">
            <span className="w-4 block relative top-[.125rem]">
                <Icon.Info />
            </span>
            <span className="block">{props.body}</span>
        </div>
    );
};
