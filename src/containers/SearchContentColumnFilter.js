import React from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactEcharts from 'echarts-for-react';

import {apiGetCall} from '../api';
import {isInt, coerceIntoArray} from '../utils/generalhelper';
import {xQueryFilterBuilder} from '../utils/xqueryhelper';
import {convertEncodedStringToObject, setInRoute, convertObjectToEncodedString, editInRoute} from '../utils/routeshelper';

import {T} from '../utils/i18nhelper';

import DivFeed from '../components/DivFeed';
import DivTimelineListing from '../components/DivTimelineListing';
import ExprAbstract from './ExprAbstract';
import SearchListPaginator from '../components/SearchListPaginator';
import BaseSearchContentColumn from './BaseSearchContentColumn';
import TimelineListingLoading from '../components/TimelineListingLoading';
import '../css/ListingContentColumn.css';

class SearchContentColumnFilter extends BaseSearchContentColumn {
    
    constructor(props) {
        super(props);
        this.state = {
            lang: this.props.match.params['lang'],
            from: this.props.match.params['from'],
            to: this.props.match.params['to'],
            count: this.props.match.params['count'],
            totalPages: 0,
            loading: true,
            listing: undefined,
            timeline: {},
        };
        this.state.q = this.convertRoutePropToXQuery(this.props.match.params.q);
        this.onChangePage = this.onChangePage.bind(this);
    }

    convertRoutePropToXQuery = (paramQ) => 
        xQueryFilterBuilder(convertEncodedStringToObject(paramQ)).join(''); 

    componentWillUnmount() {
        this._mounted = false;
    }

    getSearch(paramsObj) {
        console.log( " GET SEARCH ", paramsObj);
        let apiRecent = apiGetCall(
            'filter', 
            paramsObj
        );
        // cancel the previous request
        if (typeof this.source !== typeof undefined) {
            this.source.cancel('Operation canceled due to new request.')
        }

        // save the new request for cancellation
        this.source = axios.CancelToken.source();

        axios.request({
            method: "GET",
            url: apiRecent,
            debounce: 600,
            cancelToken:this.source.token
        })
            .then(response => {
                const items = response.data.exprAbstracts;
                if (this._mounted) {
                    if (parseInt(items.records, 10) === 0) {
                        this.setState({
                            loading: false,
                            from:0,
                            count:0,
                            to:0,
                            records: parseInt(items.records, 10),
                            q: paramsObj.q
                        })
                    } else {
                        this.setState({
                            loading: false,
                            from: parseInt(items.itemsfrom, 10),
                            count: parseInt(items.pagesize, 10),
                            to: parseInt(items.itemsfrom, 10) + parseInt(items.pagesize, 10) - 1,
                            records: parseInt(items.records, 10),
                            q: JSON.stringify(paramsObj.q),
                            totalPages: parseInt(items.totalpages, 10),
                            orderedBy: items.orderedby,
                            currentPage: parseInt(items.currentpage, 10),
                            listing: coerceIntoArray(items.exprAbstract)
                        });
                    }
                }

            })
            .catch(function(error) {
                console.log("error in getSearch()", error);
            });
    }

    timelineOptions = (xElements, yElements) => {
        const yearRange = [xElements[0], xElements[xElements.length - 1]];
        return {
            title: {
               show: true,
               text: `${T('Timeline')} ${yearRange[0]}-${yearRange[1]}`,
               left: 'center',
               top: 20,
               textStyle: {
                   color: "#D3D3D3",    
                   fontSize: 12,
                   fontStyle: "italic",
                   align: "center"
               }
           },
           tooltip: {},
           legend: {
               data:[T('Number of documents')]
           },
           xAxis: {
               data: xElements
           },
           yAxis: {},
           series: [{
               name: 'Numbers',
               type: 'bar',
               data: yElements
           }]
        };
    };

    getTimeline(paramsObj) {
        console.log( " GET Timeline ", paramsObj);
        let apiTimeline = apiGetCall(
            'timeline', 
            paramsObj
        );
        // cancel the previous request
        if (typeof this.timelineSource !== typeof undefined) {
            this.timelineSource.cancel('Operation canceled due to new request.')
        }

        // save the new request for cancellation
        this.timelineSource = axios.CancelToken.source();

        axios.request({
            method: "GET",
            url: apiTimeline,
            debounce: 600,
            cancelToken:this.timelineSource.token
        })
            .then(response => {
                const years = response.data.years;
                var xElements = [];
		    	var yElements = [];
		    	if(years.year!==undefined && years.year.length>0){
		    		for(var i =0; i<years.year.length;i++){
			    		xElements.push(years.year[i].year);
			    		yElements.push(parseInt(years.year[i].count, 10));
                    }
			        var option = this.timelineOptions(xElements, yElements);
			        this.setState({timeline : option});
		    	}else{
		    		this.setState({timeline : {}});
		    	}
            })
            .catch(function(error) {
                console.log("error in Timeline()", error);
            });
    }

    onChangePage(newPage) {
        this.setState({loading: true});
        this.getSearch(newPage);
        this.getTimeline(newPage);
    }

    generatePagination = () => {
        const { count, from, to, lang, totalPages, records } = this.state ;
        const { q } = this.props.match.params ; 
        var pagination = {
            q: q,
            count: count,
            from: from,
            to: to,
            lang: lang,
            totalPages: totalPages,
            records: records
        };
        Object.keys(pagination).map(k => pagination[k] = !isInt(pagination[k]) ? pagination[k] : parseInt(pagination[k], 10));
        // we set the linkUrl prop on the pagination object, so the paginator knows how to render the URLs
        /** 
         *  !+LINK_ROUTE(KOHSAH, 2017-12-31)
         *  use config based route instead
         */
        /** 
        let linkUrl = "/search/_lang/{lang}/_count/{count}/_from/{from}/_to/{to}/_bycountry/{country}";
        pagination.linkUrl = linkUrl; 
        **/

        let linkRoute = "filter";
        pagination.linkRoute = linkRoute;

        return pagination;  
    }

    componentDidMount() {
        this._mounted = true;
        this.getSearch({
            q: this.state.q,
            count: this.state.count,
            from: this.state.from,
            to: this.state.to
        });

        this.getTimeline({
            q: this.state.q,
            count: this.state.count,
            from: this.state.from,
            to: this.state.to
        });
        
    }

    componentWillReceiveProps(nextProps) {
        // we need to always convert the url query to a back-end XQuery
        this.getSearch({
            q: this.convertRoutePropToXQuery(nextProps.match.params.q),
            count: parseInt(nextProps.match.params.count, 10),
            from: parseInt(nextProps.match.params.from, 10),
            to: parseInt(nextProps.match.params.to, 10)
        });
        this.getTimeline({
            q: this.convertRoutePropToXQuery(nextProps.match.params.q),
            count: parseInt(nextProps.match.params.count, 10),
            from: parseInt(nextProps.match.params.from, 10),
            to: parseInt(nextProps.match.params.to, 10)
        });
        
    }

    filterLink = (match, pageLang, query) => {
        if (match === undefined || match.params === undefined || ! match.params.q) {
            return setInRoute("filter", {
                from: 1,
                to: 10,
                count: 10,
                lang: pageLang,
                q: convertObjectToEncodedString(
                    query
                )
            });
        } else {
            return editInRoute({q: convertObjectToEncodedString(query)}, match);
        } 
    }

    yearFilter = (year, q) => {
        q.years = [year.toString()];
        return q;
    }

    onChartClick = (chartParams) =>{
        let pageLang = this.props.lang || this.props.match.params.lang; 
        
        let query = this.props.match === undefined || this.props.match.params.q===undefined ? {} : convertEncodedStringToObject(this.props.match.params.q);
        
        let yearLink = this.filterLink(this.props.match, pageLang, this.yearFilter(chartParams.name, query));
        
        this.props.history.push(yearLink);
    } 


    renderDocumentLoading = () =>
        <TimelineListingLoading>
            <h1 className="listingHeading">{T("Document Results")}</h1>
        </TimelineListingLoading> ;

    renderNoDocumentsFound = () =>
        <DivTimelineListing>
            <h1 className="listingHeading">{T("Document Results")}</h1>
            <div>No Documents Found</div>
        </DivTimelineListing> ;

    renderListing = () => {
       	let pagination = this.generatePagination() ;
        let content = 
            <DivTimelineListing lang={this.props.match.params.lang}>
                <DivFeed>
                    <SearchListPaginator pagination={pagination} onChangePage={(this.onChangePage)} />
                </DivFeed>
                {
                this.state.listing.map(abstract => {
                    return (
                    <ExprAbstract key={abstract['expr-iri']} match={this.props.match} abstract={abstract} />   
                    )
                })
                }
                <DivFeed>
                    <SearchListPaginator pagination={pagination} onChangePage={this.onChangePage} />
                </DivFeed>
            </DivTimelineListing>
        ;
        return content;

    };

    renderChart = () => {
    	let content;
    	let onEvents = {
            'click': this.onChartClick,
        }
    	if(Object.keys(this.state.timeline).length !== 0){
        	content = <ReactEcharts
                    option={this.state.timeline}
                    style={{height: '300px', width: '100%'}}
                    className='echarts-for-echarts'
                    onEvents={onEvents} />;
        }else{
        	content = <div></div>;
        }
        return content;
    }

    render() {
        const { loading, listing, records } = this.state;
        let result;

        if (loading === true || listing === undefined ) {
            result = this.renderDocumentLoading();
        } else if (parseInt(records, 10) === 0 || listing === undefined) {
            result = this.renderNoDocumentsFound();
        } else {
            result = this.renderListing();
        }

        let graph = this.renderChart();

        let content = 
        <div className={ `main-col col-xs-12 col-lg-9 col-md-9 col-sm-12` }>
            <Tabs>
                <TabList>
                    <Tab>{ T("Document Results") }</Tab>
                    <Tab>{ T("Timeline") }</Tab>
                </TabList>
                <TabPanel>
                    <div className="tab-pane tab-active" data-tab="1">
                        {result}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="tab-pane tab-active" data-tab="2">
                    	{graph}
                        {result}
                    </div>
                </TabPanel>
            </Tabs>
        </div> 
        return content;  
    }
}


export default SearchContentColumnFilter;

