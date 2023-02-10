import { Image as ImageProps } from '@/types';
import NextImage from 'next/image';

export const Image: React.FC<ImageProps> = (props) => {
    let src = props.image.file.url;
    if (src.startsWith('//')) src = `https:${src}`;

    return (
        <div className="section my-8">
            <NextImage
                src={src}
                alt={props.title}
                width={props.image.file.details.image?.width}
                height={props.image.file.details.image?.height}
                className="rounded-md overflow-hidden"
            />
            {props.showCaption && props.image.description && (
                <span className="block max-w-md mx-auto text-center mt-2 text-xs text-slate-500">{props.image.description}</span>
            )}
        </div>
    );
};
