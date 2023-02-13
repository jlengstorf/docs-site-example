import { DynamicComponent } from '@/components/DynamicComponent';
import { Footer } from '@/components/Footer';
import { TableOfContents } from '@/components/TableOfContents';
import { LayoutProps } from '@/pages/[[...slug]]';

export const DocLayout: React.FC<LayoutProps> = (props) => {
    return (
        <div className="flex max-w-4xl pt-12 mx-auto">
            <div className="px-6">
                <div className="mb-6">
                    <h1 className="mb-2">{props.page.title}</h1>
                    <p className="text-2xl font-normal text-slate-700 dark:text-slate-400">{props.page.description}</p>
                </div>

                {props.page.sections?.map((section, index) => (
                    <DynamicComponent key={index} {...section} />
                ))}

                <Footer />
            </div>

            <div className="flex-shrink-0 w-72 pl-10 max-h-[calc(100vh-8rem)] sticky top-12">
                <TableOfContents items={props.tableOfContents} scrollTop={props.scrollOffset} bodyRef={props.scrollableRef} scrollOffset={64} />
            </div>
        </div>
    );
};
