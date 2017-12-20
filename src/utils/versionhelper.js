import React from 'react';
import version from '../../package.json'

/**
 * Provides access to the information in package.json
 */

/**
 * Gets Package.json
 */
export const versionInfo = () => version;

/**
 * Shows the version number in a component
 */
export const Version = () =>
    <div style={ {"textAlign": "center", "width":"100%", "color": "red"} }>{
        "current version = " + versionInfo().version
    }
    </div>;