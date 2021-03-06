import React from 'react';
import '../css/Section.css';
import DivRow from './DivRow';

function Section({children, setFlexDirection, altClasses}) {
    return (
        <section className={`section ${altClasses}`}>
            <div className="container-fluid second-header-row">
                <DivRow setFlexDirection={setFlexDirection} altClasses={altClasses}>
                    {children}
                </DivRow>
            </div>
        </section>
    );
}

export default Section;