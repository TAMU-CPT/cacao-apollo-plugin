/**
 * Mixin with methods for parsing making default feature detail dialogs.
 */
define([
            'dojo/_base/declare',
            'dojo/_base/array',
            'dojo/dom-construct',
            'JBrowse/View/Track/_FeatureDetailMixin'
        ],
        function(
            declare,
            array,
            domConstruct,
            FeatureDetailMixin
        ) {

return declare(FeatureDetailMixin, {

    /**
     * Make a default feature detail page for the given feature.
     * @returns {HTMLElement} feature detail page HTML
     */
    cacaoFeatureDetail: function(/** JBrowse.Track */ track, /** Object */ f, /** HTMLElement */ featDiv, /** HTMLElement */ container) {
        container = container || dojo.create('div', { className: 'detail feature-detail feature-detail-'+track.name.replace(/\s+/g, '_').toLowerCase(), innerHTML: '' });

        this._renderAdditionalTagsDetail(track, f, featDiv, container);

        this._renderSubfeaturesDetail(track, f, featDiv, container);

        return container;
    },

    _renderAdditionalTagsDetail: function(track, f, featDiv, container) {
        var additionalTags = array.filter(f.tags(), function(t) {
            return ! this._isReservedTag(t);
        }, this);

        if(additionalTags.length) {
            var atElement = domConstruct.create(
                'div',
                { className: 'additional',
                  innerHTML: '<h2 class="sectiontitle">Attributes</h2>'
                },
                container
            );
            array.forEach(additionalTags.sort(), function(t) {
                var label = t;
                var value = f.get(t);

                if(t === 'go'){
                    label = "GO Term";
                    value = '<a href="https://cpt.tamu.edu/cacao/#/goid/' + value +'?hideNav=1" target="_blank">' + value + '</a>';
                } else if (t === 'pmid'){
                    label = "PMID";
                    value = '<a href="https://cpt.tamu.edu/cacao/#/pmid/' + value +'?hideNav=1" target="_blank">' + value + '</a>';
                } else if (t === 'state'){
                    label = "Review State";
                    if(value === 0){
                        value = 'External';
                    } else if (value === 1) {
                        value = 'Unreviewed';
                    } else if (value === 2){
                         value = 'Accepted';
                    } else if (value === 3){
                         value = 'Rejected';
                    }
                }

                this.renderDetailField(container, label, value, f);
            }, this);
        }
    },
});
});
