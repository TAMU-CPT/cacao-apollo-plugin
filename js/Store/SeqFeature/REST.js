/**
 * Store that gets data from any set of web services that implement
 * the JBrowse REST API.
 */
define([
           'dojo/_base/declare',
           'dojo/_base/lang',
           'dojo/_base/array',
           'dojo/io-query',
           'dojo/request',
           'dojo/Deferred',
           'JBrowse/Store/LRUCache',
           'JBrowse/Store/SeqFeature',
           'JBrowse/Store/DeferredFeaturesMixin',
           'JBrowse/Store/DeferredStatsMixin',
           'JBrowse/Util',
           'JBrowse/Model/SimpleFeature',
		   'JBrowse/Store/SeqFeature/REST'
       ],
       function(
           declare,
           lang,
           array,
           ioquery,
           dojoRequest,
           Deferred,
           LRUCache,
           SeqFeatureStore,
           DeferredFeaturesMixin,
           DeferredStatsMixin,
           Util,
           SimpleFeature,
		   REST
       ) {

return declare( REST,
{

    getFeatures: function( query, featureCallback, endCallback, errorCallback ) {
        var thisB = this;
        query = this._assembleQuery( query );
		console.log(query)
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

	// Nothing yet
});
});
