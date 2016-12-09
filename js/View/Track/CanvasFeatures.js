/**
 * Feature track that draws features using HTML5 canvas elements.
 */

define( [
            'dojo/_base/declare',
            'dojo/_base/event',
            'JBrowse/Util',
            'CACAO/View/Track/_FeatureDetailMixin',
            'JBrowse/View/Track/CanvasFeatures'
        ],
        function(
            declare,
            domEvent,
            Util,
            FeatureDetailMixin,
            CanvasFeatures
        ) {

return declare([CanvasFeatures, FeatureDetailMixin],
{

    // Again, entirely the same as  JBrowse/View/Track/CanvasFeatures.js except with additions to the menu.
    _defaultConfig: function() {
        return Util.deepUpdate(
            dojo.clone( this.inherited(arguments) ),
            {
            maxFeatureScreenDensity: 0.5,

            // default glyph class to use
            glyph: dojo.hitch( this, 'guessGlyphType' ),

            // maximum number of pixels on each side of a
            // feature's bounding coordinates that a glyph is
            // allowed to use
            maxFeatureGlyphExpansion: 500,

            // maximum height of the track, in pixels
            maxHeight: 600,

            histograms: {
                description: 'feature density',
                min: 0,
                height: 100,
                color: 'goldenrod',
                clip_marker_color: 'red'
            },

            style: {
                // not configured by users
                _defaultHistScale: 4,
                _defaultLabelScale: 30,
                _defaultDescriptionScale: 120,

                showLabels: true,
                showTooltips: true,
                label: 'name,id',
                description: 'note, description',
                color: function(feature){
                    if(feature.data.state == 1){
                        // yellow
                        return '#fbf77d';
                    } else if(feature.data.state == 2){
                        // green
                        return '#98d789';
                    } else {
                        // red
                        return '#f77e75'
                    }
                },

            },

            displayMode: 'normal',

            events: {
                contextmenu: function( feature, fRect, block, track, evt ) {
                    evt = domEvent.fix( evt );
                    if( fRect && fRect.contextMenu )
                        fRect.contextMenu._openMyself({ target: block.featureCanvas, coords: { x: evt.pageX, y: evt.pageY }} );
                    domEvent.stop( evt );
                }
            },

            menuTemplate: [
                {
                   "iconClass" : "dijitIconDatabase",
                   "action" : "iframeDialog",
                   "url" : function( track, feature, featureDiv ){ return 'https://cpt.tamu.edu/cacao/#/gaf/' + feature._uniqueID; },
                   "label" : "See Annotation",
                   "title" : "CACAO - {name}"
                },
                { label: 'View details',
                  title: '{type} {name}',
                  action: 'contentDialog',
                  iconClass: 'dijitIconTask',
                  content: dojo.hitch(this, 'cacaoFeatureDetail' )
                }
            ]
        });
    },

});
});
