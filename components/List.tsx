import { List as ListProps } from '@/types';

export const List: React.FC<ListProps> = (props) => {
    return (
        <p>
            <code>List</code>: {JSON.stringify(props.items)}
        </p>
    );
};
