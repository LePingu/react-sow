import { type ReactNode } from 'react';
import './Layout.less';
import { ParticleBackground } from '../background/ParticleBackground';
import Header from './Header'; // Corrected import based on index.ts export

interface LayoutProps {
    children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            {/* The ParticleBackground and grid-background might need to be children of the content area
                or styled to ensure they are behind the Header and the main content.
                For now, placing them before the main content area.
            */}
            <div className="main-content-wrapper"> {/* Added a wrapper for content + backgrounds */}
                <div className="grid-background" />
                <ParticleBackground />
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    );
};
