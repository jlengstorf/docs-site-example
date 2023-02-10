import { Image as ImageProps } from '@/types';
import NextImage from 'next/image';

export const Image: React.FC<ImageProps> = (props) => {
    return (
        <div className="section my-8">
            <NextImage
                src={props.image.file.url}
                alt={props.title}
                width={props.image.file.details.image?.width}
                height={props.image.file.details.image?.height}
            />
            {!props.hideCaption && <span className="block max-w-md mx-auto text-center mt-2 text-xs text-slate-500">{props.title}</span>}
        </div>
    );
};
