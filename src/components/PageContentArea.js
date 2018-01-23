import React from 'react';

import NotifBar from './NotifBar';
import PageContentColumn from '../containers/PageContentColumn';
import Section from './Section';
import DivRow from './DivRow';

class PageContentArea extends React.Component {

    render() {
        return (
            <Section>
                <div className="container">
                    <DivRow>
                        <NotifBar />
                        <PageContentColumn {...this.props} />
                    </DivRow>
                </div>
            </Section>
        );
    
    }
}

export default PageContentArea;