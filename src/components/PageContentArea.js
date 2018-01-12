import React from 'react';

import PageContentColumn from '../containers/PageContentColumn';
import Section from './Section';
import DivRow from './DivRow';

class PageContentArea extends React.Component {

    render() {
        return (
            <Section>
                <div className="container">
                    <DivRow>
                        <PageContentColumn {...this.props} />
                    </DivRow>
                </div>
            </Section>
        );
    
    }
}

export default PageContentArea;