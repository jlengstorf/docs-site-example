import { SectionType } from '@/types';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

const components: { [K in SectionType]: ComponentType<any> } = {
    heading: dynamic(() => import('../components/Heading').then((mod) => mod.Heading)),
    paragraph: dynamic(() => import('../components/Paragraph').then((mod) => mod.Paragraph))
};

export function getComponent(type: SectionType): any {
    return components[type];
}
