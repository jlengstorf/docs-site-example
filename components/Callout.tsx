import { Callout as CalloutProps } from '@/types';

export const Callout: React.FC<CalloutProps> = (props) => {
    return (
        <p>
            <code>Callout</code>: {props.body}
        </p>
    );
};
