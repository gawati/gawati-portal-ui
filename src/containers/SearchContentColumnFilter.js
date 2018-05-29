import React from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Form, Input } from 'reactstrap';
import ReactEcharts from 'echarts-for-react';

import {apiGetCall} from '../api';
import {isInt, coerceIntoArray, isAuthEnabled} from '../utils/generalhelper';
import {xQueryFilterBuilder} from '../utils/xqueryhelper';
import {convertEncodedStringToObject, setInRoute, convertObjectToEncodedString, editInRoute} from '../utils/routeshelper';
import { ToastContainer, toast } from 'react-toastify';
import Popup from "reactjs-popup";

import {T} from '../utils/i18nhelper';
import { getUserInfo, getToken } from '../utils/GawatiAuthClient';
import DivFeed from '../components/DivFeed';
import DivTimelineListing from '../components/DivTimelineListing';
import ExprAbstract from './ExprAbstract';
import SearchListPaginator from '../components/SearchListPaginator';
import BaseSearchContentColumn from './BaseSearchContentColumn';
import TimelineListingLoading from '../components/TimelineListingLoading';
import SaveSearchAutoComplete from './SaveSearchAutoComplete';
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
            tabIndex: 0,
            timeline: {},
            timeline_bar: {},
            timeline_pie: {},
            timeline_scatter: {},
            timeline_pie_doctype: {},
            save_name:'',
            username:'guest'
        };
        this.state.q = this.convertRoutePropToXQuery(this.props.match.params.q);
        this.onChangePage = this.onChangePage.bind(this);
        this.handleSubmitSave = this.handleSubmitSave.bind(this);
        this.handleSaveName = this.handleSaveName.bind(this);
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
            yAxis: {},
            series: [{
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
                    color: "#D3D3D3",
                    fontSize: 12,
                    fontStyle: "italic",
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
        return yElements_scatter.indexOf(item) === pos;
        });
        return {
            title: {
                text: "Keywords vs Number of Results",
                left: "center",
                textStyle: {
                    color: "#D3D3D3",
                    fontSize: 12,
                    fontStyle: "italic",
                    align: "center"
                }
            },
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
                data: yElements_scatter_data
            }]
        };
    };

    timelineOptions_pie_doctype = (xElements_pie_doctype, yElements_pie_doctype) => {
       return {
            title: {
                text: "Document Type vs Number of Results",
                left: "center",
                textStyle: {
                    color: "#D3D3D3",
                    fontSize: 12,
                    fontStyle: "italic",
                    align: "center"
                }
            },
            series: [{
                type: "pie",
                radius: [0, "70%"],
                data: yElements_pie_doctype
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
                const {years, countries, languages, keywords, docType} = response.data;

                var xElements = [];
                var yElements = [];
                var xElements_bar = [];
                var yElements_bar = [];
                var xElements_pie = [];
                var yElements_pie = [];
                var xElements_scatter = [];
                var yElements_scatter = [];
                var yElements_scatter_data = [];
                var xElements_pie_doctype = [];
                var yElements_pie_doctype = [];

                var option = {};
                var option_bar = {};
                var option_pie = {};
                var option_scatter = {};
                var option_pie_doctype = {};

                var counter = 0;

                // != null converts undefined to null also and also covers null 
                if (years != null && years.year != null) {
                    // instead of checkig whether it is an object or an array,
                    // simply convert it to an array
                    const filterYears = coerceIntoArray(years.year);
                    // ES6 for-of syntatically simpler than for(;;)
                    for (var filterYear of filterYears) {
                        xElements.push(filterYear.year);
                        yElements.push(parseInt(filterYear.count, 10));
                    }
                } else {
                    option = null;
                }

                if (countries != null && countries.country != null) {
                    const filterCountries = coerceIntoArray(countries.country);
                    for (var filterCountry of filterCountries) {
                        xElements_bar.push(filterCountry.name);
                        yElements_bar.push(parseInt(filterCountry.count, 10));
                  }
                } else {
                    option_bar = null;
                }

                if (languages != null && languages.language != null) {
                    const filterLanguages = coerceIntoArray(languages.language);
                    for (var filterLanguage of filterLanguages){
                       xElements_pie.push(filterLanguage.lang);
                        yElements_pie.push({
                            value: parseInt(filterLanguage.count, 10),
                            name: filterLanguage.lang
                        });
                    }
                } else {
                    option_pie = null;
                }

                if (keywords != null && keywords.key != null) {
                    const filterKeywords = coerceIntoArray(keywords.key);
                    for (var filterKeyword of filterKeywords){
                        xElements_scatter.push(filterKeyword.key);
                        yElements_scatter.push(parseInt(filterKeyword.count, 10));
                        yElements_scatter_data.push([counter,parseInt(filterKeyword.count, 10),parseInt(filterKeyword.count, 10)]);
                        counter += 1;
                    }
                } else {
                    option_scatter = null;
                }

                if (docType != null && docType.type != null) {
                    const filterDocTypes = coerceIntoArray(docType.type);
                    for (var filterDocType of filterDocTypes) {
                        xElements_pie_doctype.push(filterDocType.type);
                        yElements_pie_doctype.push({
                            value: parseInt(filterDocType.count, 10),
                            name: filterDocType.type
                        });                        
                    }
                } else {
                    option_pie_doctype = null;
                }
                
                option = option ? this.timelineOptions(xElements, yElements) : {};
                option_bar = option_bar ? this.timelineOptions_bar(xElements_bar, yElements_bar) : {};
                option_pie = option_pie ? this.timelineOptions_pie(xElements_pie, yElements_pie) : {};
                option_scatter = option_scatter ? this.timelineOptions_scatter(xElements_scatter,yElements_scatter,yElements_scatter_data) : {};
                option_pie_doctype = option_pie_doctype ? this.timelineOptions_pie_doctype(xElements_pie_doctype, yElements_pie_doctype) : {};

                this.setState({
                    timeline: option,
                    timeline_bar: option_bar,
                    timeline_pie: option_pie,
                    timeline_scatter: option_scatter,
                    timeline_pie_doctype: option_pie_doctype
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

        if (isAuthEnabled()) {
            if (getToken() != null) {
                getUserInfo()
                .success( (data) => {
                    console.log(" getUserName (data) = ", data);
                    this.setState({username: data.preferred_username});
                })
                .error( (err) => {
                    this.setState({username: "guest"});
                    console.log(" getUserName (err) = ", err);
                });
            }
        }
        
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

        if (isAuthEnabled()) {
            if (getToken() != null) {
                getUserInfo()
                .success( (data) => {
                    console.log(" getUserName (data) = ", data);
                    this.setState({username: data.preferred_username});
                })
                .error( (err) => {
                    this.setState({username: "guest"});
                    console.log(" getUserName (err) = ", err);
                });
            }
        }
        
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
        q.types = [doctype.toString()];
        return q;
    };


    onChartClick = (chartParams) =>{
        let pageLang = this.props.lang || this.props.match.params.lang; 
        
        let query = this.props.match === undefined || this.props.match.params.q===undefined ? {} : convertEncodedStringToObject(this.props.match.params.q);
        
        let yearLink = this.filterLink(this.props.match, pageLang, this.yearFilter(chartParams.name, query));
        
        this.props.history.push(yearLink);
        this.setState({tabIndex : 0});
    } 

    onChartClickBar = (chartParams) =>{
        let pageLang = this.props.lang || this.props.match.params.lang; 
        
        let query = this.props.match === undefined || this.props.match.params.q===undefined ? {} : convertEncodedStringToObject(this.props.match.params.q);
        
        let countryLink = this.filterLink(this.props.match, pageLang, this.countryFilter(chartParams.name, query));
        
        this.props.history.push(countryLink);
        this.setState({tabIndex : 0});

    } 

    onChartClickPie = (chartParams) =>{
        let pageLang = this.props.lang || this.props.match.params.lang; 
        
        let query = this.props.match === undefined || this.props.match.params.q===undefined ? {} : convertEncodedStringToObject(this.props.match.params.q);
        
        let languageLink = this.filterLink(this.props.match, pageLang, this.languageFilter(chartParams.name, query));
        
        this.props.history.push(languageLink);

        this.setState({tabIndex : 0});

    } 

    onChartClickScatter = (chartParams) =>{

        for (var key in chartParams){
            console.log("key is " + key);
            console.log("value is " + chartParams[key]);
        }

        let pageLang = this.props.lang || this.props.match.params.lang; 
        
        let query = this.props.match === undefined || this.props.match.params.q===undefined ? {} : convertEncodedStringToObject(this.props.match.params.q);
        
        let keywordLink = this.filterLink(this.props.match, pageLang, this.keywordFilter(chartParams.name, query));
        
        this.props.history.push(keywordLink);

        this.setState({tabIndex : 0});

    }  

    onChartClickPieDocType = (chartParams) =>{
        let pageLang = this.props.lang || this.props.match.params.lang; 
        
        let query = this.props.match === undefined || this.props.match.params.q===undefined ? {} : convertEncodedStringToObject(this.props.match.params.q);
        
        let doctypeLink = this.filterLink(this.props.match, pageLang, this.docTypeFilter(chartParams.name, query));
        
        this.props.history.push(doctypeLink);
        this.setState({tabIndex : 0});

    }

    handleSubmitSave = (event) =>{
        event.preventDefault();
        let apiSaveSearch = apiGetCall(
            'save-search-name', {}
        );
        let query = this.props.match === undefined || this.props.match.params.q===undefined ? {} : convertEncodedStringToObject(this.props.match.params.q);

        axios.post(apiSaveSearch, {
            searchName: this.state.save_name,
            userName: this.state.username,
            data: JSON.stringify({query: query, count: this.state.count, from: this.state.from, to: this.state.to, lang:this.state.lang})
        })
        .then(response => {
            if(response.data.success==="true"){
                toast("Search saved successfully");
            }else if(response.data.error!==undefined){
                toast(response.data.data.message);
            }else{
                toast("There is some problem. Kindly try again");
            }
        })
        .catch(function(error) {
            console.log('There is some error' + error);
            toast("There is some problem. Kindly try again");
        });
    } 

    handleSaveName = (event) =>{
        this.setState({save_name: event.target.value});
    }    

    renderSaveModal = () =>{
    	return (
            <Popup
                trigger={ <a className="pointer" onClick={this.toggleSaveModal}><i className="fa fa-floppy-o" />&#160;Save</a> }
                position="bottom center"
                on="hover"
                closeOnDocumentClick
            >
                <div className="full-width">
                    <div className="header center">Save your search</div><hr className="search-line"></hr>
                    <div className="content">
                        <Form onSubmit={this.handleSubmitSave}>
                            <div className="row">
                                <Input type="text" value={this.state.save_name} placeholder="search name" autoFocus onChange={this.handleSaveName} bsSize="sm" />
                            </div>
                            <input type="submit" value="Save" color="primary" className="btn btn-primary btn-sm right" />
                        </Form>
                    </div>
                </div>
            </Popup>
        );
    }

    renderSearchModal = () =>{
    	return (
            <Popup
                trigger={ <a className="pointer">&#160;<i className="fa fa-search" />&#160;Search</a> }
                position="bottom center"
                on="hover"
                closeOnDocumentClick
            >
                <div className="full-width">
                    <div className="header center">Search from saved searches</div><hr className="search-line"></hr>
                    <div className="content">
                        <SaveSearchAutoComplete  lang="eng"/>
                    </div>
                </div>
            </Popup>
        );
    }

    renderSaveSearchModal = () =>{
        console.log('init');
        if(this.state.username==="guest"){
            return (<div>register/ login to save searches</div>);
        }else{
            let save_modal_content = this.renderSaveModal();
            let search_modal_content = this.renderSearchModal();
            let content = <div>{save_modal_content} | {search_modal_content}</div>;
            return content;
        }
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
        let pagination = this.generatePagination();
        let save_search_modal_content = this.renderSaveSearchModal();
        let content = 
            <DivTimelineListing lang={this.props.match.params.lang}>
                <div className="row col-12">
                    <div className="col-8">
                    <DivFeed>
                        <SearchListPaginator pagination={pagination} onChangePage={(this.onChangePage)} />
                    </DivFeed>
                    </div>
                    <div className="col-4 feed w-clearfix">
                    {save_search_modal_content}
                    </div>
                </div>
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
                    className='echarts-for-echarts-scatter'
                    onEvents={onEvents} />;
        }else{
            content = <div></div>;
        }
        return content;
    }            

    renderChartPieDocType = () => {
        let content;
        let onEvents = {
            'click': this.onChartClickPieDocType,
        }
        if(Object.keys(this.state.timeline_pie_doctype).length !== 0){
            content = <ReactEcharts
                    option={this.state.timeline_pie_doctype}
                    style={{height: '300px', width: '100%'}}
                    className='echarts-for-echarts-pie-doctype'
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
        let graph_pie_doctype = this.renderChartPieDocType();

        let content = 
        <div className={ `main-col col-xs-12 col-lg-9 col-md-9 col-sm-12` }>
            <ToastContainer />
            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
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
                        {graph_pie_doctype}
                    </div>
                </TabPanel>
            </Tabs>
        </div> 
        return content;  
    }
}


export default SearchContentColumnFilter;

