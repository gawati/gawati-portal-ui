import routeConfigs from '../configs/routes.json';

/**
 * This is the default Route
 */
export const defaultRoute = () => (
    {
        name: "404",
        route: "/404"
    }
);

/**
 * Gets the route configuration for a specific route
 * @param {string} routeName 
 */
export const getRoute = (routeName) => {
    let routeConfig = routeConfigs.routes.find( route => route.name === routeName) ;
    if (routeConfig === undefined) {
        return defaultRoute();
    } else {
        return routeConfig.route;
    }
};

/**
 * Sets values in a route based on the provided map and produces a link
 * e.g. for the route
 * /search/_lang/:lang/_count/:count/_from/:from/_to/:to/_bycountry/:country
 * an object with {lang:..., count:..., from:..., }
 * will set those parameters in route and produce a link
 * @param {string} routeName 
 * @param {object} params 
 */
export const setInRoute = (routeName, params) => {
    let route = getRoute(routeName);
    let routeArr = route.split("/");
    let updatedRouteArr = routeArr.map( part => {
        if (part.startsWith(":")) {
            let partName = part.replace(":", "").replace("*", "");
            return params[partName]
        } else {
            return part;
        }
    });
    return updatedRouteArr.join("/");
};