import {
    defineWidget,
    log,
    runCallback,
} from 'widget-base-helpers';
import aspect from 'dojo/aspect';
import registry from 'dijit/registry';
import q from 'dojo/query';
import construct from 'dojo/dom-construct';
import 'dojo/NodeList-traverse';

export default defineWidget('ListCountTabBadge', false, {

    _obj: null,
    listNode: null,
    list: null,

    constructor() {
        this.log = log.bind(this);
        this.runCallback = runCallback.bind(this);
    },

    postCreate() {
        log.call(this, 'postCreate', this._WIDGET_VERSION);
        this.listNode = this.domNode.previousSibling;
        this.list = registry.byNode(this.listNode);
        const tabName = this.tabName;
        const badgeClass = this.badgeClass;
        aspect.after(this.list, '_onLoad', function() {
            const count =  this._datasource._setSize;
            const wrapperNode = q(this.domNode).closest(".mx-placeholder")[ 0 ];
            const tab = q(".mx-name-" + tabName, wrapperNode)[ 0 ];
            if (tab) {
                const badge = q(".count-badge", tab)[ 0 ];
                if (badge) {
                    badge.innerHTML = count;
                } else {
                    const newBadge = construct.toDom('<span class="' + badgeClass + '"><span>');
                    newBadge.innerHTML = count;
                    construct.place(newBadge, tab);
                }
            }
        });

    },
});
