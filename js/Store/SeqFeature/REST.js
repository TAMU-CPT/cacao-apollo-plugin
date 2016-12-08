/**
 * Store that gets data from any set of web services that implement
 * the JBrowse REST API.
 */
define([
           'dojo/_base/declare',
           'JBrowse/Store/SeqFeature/REST'
       ],
       function(
           declare,
           REST
       ) {

return declare( REST,
{
    // The only difference in this code is query.organism is automatically set. The rest is 100% as-is from REST.js
    getFeatures: function( query, featureCallback, endCallback, errorCallback ) {
        var thisB = this;
        //query.organism = this.browser.config.datasets[this.browser.config.dataset_id].name;
        query.organism = 'asdf';
        query = this._assembleQuery( query );
        var url = this._makeURL( 'features', query );

        // look for cached feature regions if configured to do so
        var cachedFeatureRegions;
        if( this.config.feature_range_cache
            && ! this.config.noCache
            && ( cachedFeatureRegions = this._getCachedFeatureRegions( query ) )
          ) {
            this.region_cache_hits++;
            this._makeFeaturesFromCachedRegions( cachedFeatureRegions, query, featureCallback, endCallback, errorCallback );
        }
        // otherwise just fetch and cache like all the other requests
        else {
            this._get( { url: url, query: query, type: 'features' },
                       dojo.hitch( this, '_makeFeatures',
                                   featureCallback, endCallback, errorCallback
                                 ),
                       errorCallback
                     );
        }
    },

});
});
