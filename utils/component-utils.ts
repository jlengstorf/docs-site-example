import dynamic from 'next/dynamic';

export type SectionType = 'heading' | 'paragraph';

const components = {
    heading: dynamic(() => import('../components/Heading').then((mod) => mod.Heading)),
    paragraph: dynamic(() => import('../components/Paragraph').then((mod) => mod.Paragraph))
};

export function getComponent(type: SectionType): any {
    return components[type];
}
