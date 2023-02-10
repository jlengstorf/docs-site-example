import { Image as ImageProps } from '@/types';

export const Image: React.FC<ImageProps> = (props) => {
    return (
        <p>
            <code>Image</code>: {JSON.stringify(props.image)}
        </p>
    );
};
