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
            timeline_bar: {},
            timeline_pie: {},
            timeline_scatter: {},
            timeline_bar_doctype: {}
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

    timelineOptions_bar = (xElements_bar, yElements_bar) => {
       return {
            title: {
                show: true,
                text: "Country vs Number of Results",
                left: "center",
                top: 20,
                textStyle: {
                    color: "#D3D3D3",
                    fontSize: 12,
                    fontStyle: "italic",
                    align: "center"
                }
            },
            xAxis: {
               data: xElements_bar
            },
            series: [{
                name: "Country vs Results",
                type: "bar",
                itemStyle: {
                    color: "#FFC733"
                },
                data: yElements_bar
            }]
        };
    };

    timelineOptions_pie = (xElements_pie, yElements_pie) => {
       return {
            title: {
                text: "Language vs Number of Results",
                left: "center",
                textStyle: {
                align: "center"
                }
            },
            series: [{
                type: "pie",
                radius: [0, "70%"],
                data: yElements_pie
           }]
        };
    };

    timelineOptions_scatter = (xElements_scatter,yElements_scatter,yElements_scatter_data) => {
        var yUniqueElements = yElements_scatter.filter(function(item, pos) {
        return yElements_scatter.indexOf(item) == pos;
        });
        return {
            tooltip: {
                position: "top",
                formatter: function(params) {
                    return (params.value[2] + " results containing " + xElements_scatter[params.value[0]]);
                }
            },
            xAxis: {
                data: xElements_scatter
            },
            yAxis: {
                data: yUniqueElements.sort(function(a, b) {
                    return a - b;
                })
            },
            dataZoom: [
              {
                type: "slider",
                show: true,
                xAxisIndex: [0],
                start: 1,
                end: 100
             },
             {
                type: "slider",
                show: true,
                yAxisIndex: [0],
                left: "93%",
                start: 1,
                end: 100
             },
             {
                type: "inside",
                xAxisIndex: [0],
                 start: 1,
                 end: 100
             },
             {
                type: "inside",
                yAxisIndex: [0],
                start: 1,
                end: 100
             }
            ],
            series: [{
                name: "Keywords vs Results",
                type: "scatter",
                symbolSize: function(val) {
                    return val[2];
                },
                itemStyle: {
                    color: "#3377FF"
                },
                data: yElements_scatter_data
            }]
        };
    };

    timelineOptions_bar_doctype = (xElements_bar_doctype, yElements_bar_doctype) => {
        return {
            title: {
                show: true,
                text: `Document Type vs Results`,
                left: "center",
                top: 20,
                textStyle: {
                    color: "#FD1A23",
                    fontSize: 12,
                    fontStyle: "italic",
                    align: "center"
                }
            },
            xAxis: {
                data: xElements_bar_doctype
            },
            series: [{
                type: "bar",
                itemStyle: {
                    color: "#22CC3E"
                },
                data: yElements_bar_doctype
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
                const countries = response.data.countries;
                const languages = response.data.langs;
                const keywords = response.data.keywords;
                const docType = response.data.docType;

                var xElements = [];
                var yElements = [];
                var xElements_bar = [];
                var yElements_bar = [];
                var xElements_pie = [];
                var yElements_pie = [];
                var xElements_scatter = [];
                var yElements_scatter = [];
                var yElements_scatter_data = [];
                var xElements_bar_doctype = [];
                var yElements_bar_doctype = [];

                var option = {};
                var option_bar = {};
                var option_pie = {};
                var option_scatter = {};
                var option_bar_doctype = {};

                if (typeof(years.year) !== "undefined") {
                    if (years.year.constructor === Array) {
                        for (var i = 0; i < years.year.length; i++) {
                            xElements.push(years.year[i].year);
                            yElements.push(parseInt(years.year[i].count, 10));
                        }
                    } else {
                        xElements.push(years.year.year);
                        yElements.push(parseInt(years.year.count, 10));
                    }
                } else {
                    option = null;
                }

                if (typeof(countries.country) !== "undefined") {
                    if (countries.country.constructor === Array) {
                        for (var j = 0; j < countries.country.length; j++) {
                            xElements_bar.push(countries.country[j].name);
                            yElements_bar.push(parseInt(countries.country[j].count, 10));
                        }
                    } else {
                        xElements_bar.push(countries.country.name);
                        yElements_bar.push(parseInt(countries.country.count, 10));
                  }
                } else {
                    option_bar = null;
                }

                if (typeof(languages.language) !== "undefined") {
                    if (languages.language.constructor === Array) {
                        for (var k = 0; k < languages.language.length; k++) {
                            xElements_pie.push(languages.language[k].lang);
                            yElements_pie.push({
                                value: parseInt(languages.language[k].count, 10),
                                name: languages.language[k].lang
                            });
                        }
                    } else {
                        xElements_pie.push(languages.language.lang);
                        yElements_pie.push({
                            value: parseInt(languages.language.count, 10),
                            name: languages.language.lang
                        });
                    }
                } else {
                    option_pie = null;
                }

                if (typeof(keywords.key) !== "undefined") {
                    if (keywords.key.constructor === Array) {
                        for (var l = 0; l < keywords.key.length; l++) {
                            xElements_scatter.push(keywords.key[l].key);
                            yElements_scatter.push(parseInt(keywords.key[l].count, 10));
                            yElements_scatter_data.push([l + 1,parseInt(keywords.key[l].count, 10),parseInt(keywords.key[l].count, 10)]);
                        }
                    } else {
                        xElements_scatter.push(keywords.key.key);
                        yElements_scatter.push(parseInt(keywords.key.count, 10));
                        yElements_scatter_data.push([1,parseInt(keywords.key.count, 10),parseInt(keywords.key.count, 10)]);
                    }
                } else {
                    option_scatter = null;
                }

                if (typeof(docType.type) !== "undefined") {
                    if (docType.type.constructor === Array) {
                        for (var m = 0; m < docType.type.length; m++) {
                            xElements_bar_doctype.push(docType.type[m].type);
                            yElements_bar_doctype.push(parseInt(docType.type[m].count, 10));
                        }
                    } else {
                        xElements_bar_doctype.push(docType.type.type);
                        yElements_bar_doctype.push(parseInt(docType.type.count, 10));
                    }
                } else {
                    option_bar_doctype = null;
                }

                option = option ? this.timelineOptions(xElements, yElements) : {};
                option_bar = option_bar ? this.timelineOptions_bar(xElements_bar, yElements_bar) : {};
                option_pie = option_pie ? this.timelineOptions_pie(xElements_pie, yElements_pie) : {};
                option_scatter = option_scatter ? this.timelineOptions_scatter(xElements_scatter,yElements_scatter,yElements_scatter_data) : {};
                option_bar_doctype = option_bar_doctype ? this.timelineOptions_bar_doctype(xElements_bar_doctype, yElements_bar_doctype) : {};

                this.setState({
                    timeline: option,
                    timeline_bar: option_bar,
                    timeline_pie: option_pie,
                    timeline_scatter: option_scatter,
                    timeline_bar_doctype: option_bar_doctype
                });
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

    keywordFilter = (keyword, q) => {
        q.keywords = [keyword.toString()];
        return q;
    };

    languageFilter = (language, q) => {
        q.langs = [language.toString()];
        return q;
    };

    countryFilter = (country, q) => {
        q.countries = [country.toString()];
        return q;
    };

    docTypeFilter = (doctype, q) => {
        q.type = [doctype.toString()];
        return q;
    };


    onChartClick = (chartParams) =>{
        let pageLang = this.props.lang || this.props.match.params.lang; 
        
        let query = this.props.match === undefined || this.props.match.params.q===undefined ? {} : convertEncodedStringToObject(this.props.match.params.q);
        
        let yearLink = this.filterLink(this.props.match, pageLang, this.yearFilter(chartParams.name, query));
        
        this.props.history.push(yearLink);
    } 

    onChartClickBar = (chartParams) =>{
        let pageLang = this.props.lang || this.props.match.params.lang; 
        
        let query = this.props.match === undefined || this.props.match.params.q===undefined ? {} : convertEncodedStringToObject(this.props.match.params.q);
        
        let countryLink = this.filterLink(this.props.match, pageLang, this.countryFilter(chartParams.name, query));
        
        this.props.history.push(countryLink);
    } 

    onChartClickPie = (chartParams) =>{
        let pageLang = this.props.lang || this.props.match.params.lang; 
        
        let query = this.props.match === undefined || this.props.match.params.q===undefined ? {} : convertEncodedStringToObject(this.props.match.params.q);
        
        let languageLink = this.filterLink(this.props.match, pageLang, this.languageFilter(chartParams.name, query));
        
        this.props.history.push(languageLink);
    } 

    onChartClickScatter = (chartParams) =>{
        let pageLang = this.props.lang || this.props.match.params.lang; 
        
        let query = this.props.match === undefined || this.props.match.params.q===undefined ? {} : convertEncodedStringToObject(this.props.match.params.q);
        
        let keywordLink = this.filterLink(this.props.match, pageLang, this.keywordFilter(chartParams.name, query));
        
        this.props.history.push(keywordLink);
    }  

    onChartClickBarDocType = (chartParams) =>{
        let pageLang = this.props.lang || this.props.match.params.lang; 
        
        let query = this.props.match === undefined || this.props.match.params.q===undefined ? {} : convertEncodedStringToObject(this.props.match.params.q);
        
        let doctypeLink = this.filterLink(this.props.match, pageLang, this.docTypeFilter(chartParams.name, query));
        
        this.props.history.push(doctypeLink);
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

    renderChartBar = () => {
        let content;
        let onEvents = {
            'click': this.onChartClickBar,
        }
        if(Object.keys(this.state.timeline_bar).length !== 0){
            content = <ReactEcharts
                    option={this.state.timeline_bar}
                    style={{height: '300px', width: '100%'}}
                    className='echarts-for-echarts-bar'
                    onEvents={onEvents} />;
        }else{
            content = <div></div>;
        }
        return content;
    }

    renderChartPie = () => {
        let content;
        let onEvents = {
            'click': this.onChartClickPie,
        }
        if(Object.keys(this.state.timeline_pie).length !== 0){
            content = <ReactEcharts
                    option={this.state.timeline_pie}
                    className='echarts-for-echarts-pie'
                    onEvents={onEvents} />;
        }else{
            content = <div></div>;
        }
        return content;
    }

    renderChartScatter = () => {
        let content;
        let onEvents = {
            'click': this.onChartClickScatter,
        }
        if(Object.keys(this.state.timeline_scatter).length !== 0){
            content = <ReactEcharts
                    option={this.state.timeline_scatter}
                    className='echarts-for-echarts'
                    onEvents={onEvents} />;
        }else{
            content = <div></div>;
        }
        return content;
    }            

    renderChartBarDocType = () => {
        let content;
        let onEvents = {
            'click': this.onChartClickBarDocType,
        }
        if(Object.keys(this.state.timeline_bar_doctype).length !== 0){
            content = <ReactEcharts
                    option={this.state.timeline_bar_doctype}
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
        let graph_bar = this.renderChartBar();
        let graph_pie = this.renderChartPie();
        let graph_scatter = this.renderChartScatter();
        let graph_bar_doctype = this.renderChartBarDocType();

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
                        {graph_bar}
                        {graph_pie}
                        {graph_scatter}
                        {graph_bar_doctype}
                    </div>
                </TabPanel>
            </Tabs>
        </div> 
        return content;  
    }
}


export default SearchContentColumnFilter;

