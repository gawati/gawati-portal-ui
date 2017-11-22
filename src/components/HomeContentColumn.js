import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ThemeOfTheMonth from '../containers/ThemeOfTheMonth';
import '../css/react-tabs.css';
import linkIcon from '../images/export.png';

function getHomeTabs() {
    return (
        <Tabs selectedTabClassName="home-active-tab">
                <div className="d-tabs">
                    <TabList className="tab-menu">
                    <Tab><a href="javascript:;" className={ `tab` }>In Focus</a></Tab>
                    <Tab><a href="javascript:;" className={ `tab` }>Latest</a></Tab>
                    </TabList>
                </div>
                <div className={ `tabs-content w-tab-content` }>
                    <TabPanel className={ `tab-pane` }>
                        <ThemeOfTheMonth />
                    </TabPanel>
                    <TabPanel  className={ `tab-pane` }>
                        <h2>Any content 2</h2>
                        </TabPanel>
                </div>
         </Tabs>
    )
}

function HomeContentColumn() {
    return (
<div className={ `left col-9` }>
      {getHomeTabs()}
        {/*
    <div className="d-tabs">
        <ul className="tab-menu">
            <li>
                <a href="#" className={ `tab active` }>In focus</a>
            </li>
            <li>
                <a href="#" className="tab">Latest</a>
            </li>
            <li>
                <a href="#" className="tab">Popular</a>
            </li>
        </ul>
    </div>
    <div className={ `tabs-content w-tab-content` }>
        <div className={ `tab-pane tab-active` } data-tab="t1">
            <div className={ `feed w-clearfix` }>
                <h2>Theme of the month</h2>
                <div className="text-block">
                    <a href="#"> AUTOR NAME </a>
                    <a> &#160;| &#160; </a>
                    <a href="#">CATEGORY</a>
                    <a> &#160;| &#160;</a>
                    <a href="#">July 25, 2017 </a>
                    <a> </a>
                </div>
                <a>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
                        enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                        dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
                        nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                        tristique posuere.</p>
                </a>
                <a className="more-button" href="#">
                    <img src="images/export.png"/>
                </a>
                <div className="grey-rule"/>
            </div>
            <div className={ `feed w-clearfix` }>
                <h2>This is the second tittle.</h2>
                <div className="text-block">
                    <a href="#"> AUTOR NAME </a>
                    <a> &#160;| &#160; </a>
                    <a href="#">CATEGORY</a>
                    <a> &#160;| &#160;</a>
                    <a href="#">July 25, 2017 </a>
                    <a> </a>
                </div>
                <a>
                    <img src="images/thumbnail.jpg"/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
                        enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                        dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
                        nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                        tristique posuere.</p>
                </a>
                <div className={ `div-block-18 w-clearfix` }>
                    <a> </a>
                    <a className="more-button" href="#">
                        <img src="images/export.png"/>
                    </a>
                </div>
                <div className="grey-rule"/>
            </div>
            <div className={ `feed w-clearfix` }>
                <h2>This is the tittle after the second</h2>
                <div className="text-block">
                    <a href="#"> AUTOR NAME </a>
                    <a> &#160;| &#160; </a>
                    <a href="#">CATEGORY</a>
                    <a> &#160;| &#160;</a>
                    <a href="#">July 25, 2017 </a>
                    <a> </a>
                </div>
                <a>
                    <img src="images/thumbnail.jpg"/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
                        enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                        dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
                        nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                        tristique posuere.</p>
                </a>
                <div className={ `div-block-18 w-clearfix` }>
                    <a> </a>
                    <a className="more-button" href="#">
                        <img src="images/export.png"/>
                    </a>
                </div>
                <div className="grey-rule"/>
            </div>
            <div className="button-wrapper">
                <a className={ `button w-button` } href="/all-posts">More posts&#160;→</a>
            </div>
        </div>

        <div className="tab-pane" data-tab="t2" style={{ display: 'none' }}>
            <div className={ `feed w-clearfix` }>
                <h2>Latest Theme of the month</h2>
                <div className="text-block">
                    <a href="#"> AUTOR NAME </a>
                    <a> &#160;| &#160; </a>
                    <a href="#">CATEGORY</a>
                    <a> &#160;| &#160;</a>
                    <a href="#">July 25, 2017 </a>
                    <a> </a>
                </div>
                <a>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
                        enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                        dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
                        nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                        tristique posuere.</p>
                </a>
                <a className="more-button" href="#">
                    <img src="images/export.png"/>
                </a>
                <div className="grey-rule"/>
            </div>
            <div className={ `feed w-clearfix` }>
                <h2>This is the second tittle.</h2>
                <div className="text-block">
                    <a href="#"> AUTOR NAME </a>
                    <a> &#160;| &#160; </a>
                    <a href="#">CATEGORY</a>
                    <a> &#160;| &#160;</a>
                    <a href="#">July 25, 2017 </a>
                    <a> </a>
                </div>
                <a>
                    <img src="images/thumbnail.jpg"/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
                        enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                        dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
                        nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                        tristique posuere.</p>
                </a>
                <div className={ `div-block-18 w-clearfix` }>
                    <a> </a>
                    <a className="more-button" href="#">
                        <img src="images/export.png"/>
                    </a>
                </div>
                <div className="grey-rule"/>
            </div>
            <div className={ `feed w-clearfix` }>
                <h2>This is the tittle after the second</h2>
                <div className="text-block">
                    <a href="#"> AUTOR NAME </a>
                    <a> &#160;| &#160; </a>
                    <a href="#">CATEGORY</a>
                    <a> &#160;| &#160;</a>
                    <a href="#">July 25, 2017 </a>
                    <a> </a>
                </div>
                <a>
                    <img src="images/thumbnail.jpg"/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
                        enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                        dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
                        nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                        tristique posuere.</p>
                </a>
                <div className={ `div-block-18 w-clearfix` }>
                    <a> </a>
                    <a className="more-button" href="#">
                        <img src="images/export.png"/>
                    </a>
                </div>
                <div className="grey-rule"/>
            </div>
            <div className="button-wrapper">
                <a className={ `button w-button` } href="/all-posts">More posts&#160;→</a>
            </div>
        </div>

        <div className="tab-pane" data-tab="t3" style={{ display: 'none'}}>
            <div className={ `feed w-clearfix` }>
                <h2>Popular Theme of the month</h2>
                <div className="text-block">
                    <a href="#"> AUTOR NAME </a>
                    <a> &#160;| &#160; </a>
                    <a href="#">CATEGORY</a>
                    <a> &#160;| &#160;</a>
                    <a href="#">July 25, 2017 </a>
                    <a> </a>
                </div>
                <a>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
                        enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                        dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
                        nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                        tristique posuere.</p>
                </a>
                <a className="more-button" href="#">
                    <img src="images/export.png"/>
                </a>
                <div className="grey-rule"/>
            </div>
            <div className={ `feed w-clearfix` }>
                <h2>This is the second tittle.</h2>
                <div className="text-block">
                    <a href="#"> AUTOR NAME </a>
                    <a> &#160;| &#160; </a>
                    <a href="#">CATEGORY</a>
                    <a> &#160;| &#160;</a>
                    <a href="#">July 25, 2017 </a>
                    <a> </a>
                </div>
                <a>
                    <img src="images/thumbnail.jpg"/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
                        enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                        dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
                        nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                        tristique posuere.</p>
                </a>
                <div className={ `div-block-18 w-clearfix` }>
                    <a> </a>
                    <a className="more-button" href="#">
                        <img src="images/export.png"/>
                    </a>
                </div>
                <div className="grey-rule"/>
            </div>
            <div className={ `feed w-clearfix` }>
                <h2>This is the tittle after the second</h2>
                <div className="text-block">
                    <a href="#"> AUTOR NAME </a>
                    <a> &#160;| &#160; </a>
                    <a href="#">CATEGORY</a>
                    <a> &#160;| &#160;</a>
                    <a href="#">July 25, 2017 </a>
                    <a> </a>
                </div>
                <a>
                    <img src="images/thumbnail.jpg"/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius
                        enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros
                        dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus
                        nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                        tristique posuere.</p>
                </a>
                <div className={ `div-block-18 w-clearfix` }>
                    <a> </a>
                    <a className="more-button" href="#">
                        <img src="images/export.png"/>
                    </a>
                </div>
                <div className="grey-rule"/>
            </div>
            <div className="button-wrapper">
                <a className={ `button w-button` } href="/all-posts">More posts&#160;→</a>
            </div>
        </div>
    </div>
        */ }


</div>
    );
}

export default HomeContentColumn;