import { SectionType } from '@/types';
import dynamic from 'next/dynamic';

const components = {
    heading: dynamic(() => import('../components/Heading').then((mod) => mod.Heading)),
    paragraph: dynamic(() => import('../components/Paragraph').then((mod) => mod.Paragraph))
};

export function getComponent(type: SectionType): any {
    return components[type];
}
