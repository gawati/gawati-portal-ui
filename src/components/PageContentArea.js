import React from 'react';

import PageContentColumn from '../containers/PageContentColumn';
import Section from './Section';

class PageContentArea extends React.Component {

    

    render() {
        return (
            <Section>
                <PageContentColumn {...this.props} />
            </Section>
        );
    
    }
}

export default PageContentArea;