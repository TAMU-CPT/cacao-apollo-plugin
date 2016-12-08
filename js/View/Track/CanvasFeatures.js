/**
 * Feature track that draws features using HTML5 canvas elements.
 */

define( [
            'dojo/_base/declare',
            'dojo/_base/array',
            'dojo/_base/lang',
            'dojo/_base/event',
            'dojo/mouse',
            'dojo/dom-construct',
            'dojo/Deferred',
            'dojo/on',
            'JBrowse/has',
            'JBrowse/Util',
            'JBrowse/View/GranularRectLayout',
            'JBrowse/View/Track/BlockBased',
            'JBrowse/View/Track/_ExportMixin',
            'JBrowse/Errors',
            'CACAO/View/Track/_FeatureDetailMixin',
            'JBrowse/View/Track/_FeatureContextMenusMixin',
            'JBrowse/View/Track/_YScaleMixin',
            'JBrowse/Model/Location',
            'JBrowse/Model/SimpleFeature',
            'JBrowse/View/Track/CanvasFeatures'
        ],
        function(
            declare,
            array,
            lang,
            domEvent,
            mouse,
            domConstruct,
            Deferred,
            on,
            has,
            Util,
            Layout,
            BlockBasedTrack,
            ExportMixin,
            Errors,
            FeatureDetailMixin,
            FeatureContextMenuMixin,
            YScaleMixin,
            Location,
            SimpleFeature,
            CanvasFeatures
        ) {

return declare([CanvasFeatures, FeatureDetailMixin],
{

    // Again, entirely the same as  JBrowse/View/Track/CanvasFeatures.js except with additions to the menu.
    _defaultConfig: function() {
        return Util.deepUpdate(
            lang.clone( this.inherited(arguments) ),
            {
            maxFeatureScreenDensity: 0.5,

            // default glyph class to use
            glyph: lang.hitch( this, 'guessGlyphType' ),

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
                        return 'yellow';
                    } else if(feature.data.state == 2){
                        return 'green';
                    } else {
                        return 'red'
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
                   "url" : function( track, feature, featureDiv ){ return 'https://cpt.tamu.edu/cacao/#/gaf/' + feature._uniqueID;  },
                   "label" : "See Annotation in CACAO",
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
