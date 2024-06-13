import{app}from"../../scripts/app.js";import{api}from"../../scripts/api.js";const oldApiGetNodeDefs=api.getNodeDefs;var IoDirection,PassThroughFollowing;api.getNodeDefs=async function(){var o=await oldApiGetNodeDefs.call(api);return this.dispatchEvent(new CustomEvent("fresh-node-defs",{detail:o})),o},function(o){o[o.INPUT=0]="INPUT",o[o.OUTPUT=1]="OUTPUT"}(IoDirection=IoDirection||{});const PADDING=0,LAYOUT_LABEL_TO_DATA={Left:[LiteGraph.LEFT,[0,.5],[PADDING,0]],Right:[LiteGraph.RIGHT,[1,.5],[-PADDING,0]],Top:[LiteGraph.UP,[.5,0],[0,PADDING]],Bottom:[LiteGraph.DOWN,[.5,1],[0,-PADDING]]},LAYOUT_LABEL_OPPOSITES={Left:"Right",Right:"Left",Top:"Bottom",Bottom:"Top"},LAYOUT_CLOCKWISE=["Top","Right","Bottom","Left"];function addMenuItem(o,e,t,n="Shape"){const i=o.prototype.getExtraMenuOptions;o.prototype.getExtraMenuOptions=function(o,e){i&&i.apply(this,[o,e]),addMenuItemOnExtraMenuOptions(this,t,e,n)}}function addMenuItemOnExtraMenuOptions(l,r,o,e="Shape"){let t=o.slice().reverse().findIndex(o=>null==o?void 0:o.isRgthree);-1==t?(t=(t=o.findIndex(o=>null==o?void 0:o.content.includes(e))+1)||o.length-1,o.splice(t,0,null),t++):t=o.length-t;const s="function"==typeof r.subMenuOptions?r.subMenuOptions(l):r.subMenuOptions;o.splice(t,0,{content:"function"==typeof r.name?r.name(l):r.name,has_submenu:!(null===s||void 0===s||!s.length),isRgthree:!0,callback:(o,e,t,n,i)=>{null!==s&&void 0!==s&&s.length?new LiteGraph.ContextMenu(s.map(o=>o?{content:o}:null),{event:t,parentMenu:n,callback:(o,e,t,n,i)=>{r.property&&(l.properties=l.properties||{},l.properties[r.property]=r.prepareValue?r.prepareValue(o.content,l):o.content),r.callback&&r.callback(l,null==o?void 0:o.content)}}):(r.property&&(l.properties=l.properties||{},l.properties[r.property]=r.prepareValue?r.prepareValue(l.properties[r.property],l):!l.properties[r.property]),r.callback&&r.callback(l,null==o?void 0:o.content))}})}function addConnectionLayoutSupport(o,e,t=[["Left","Right"],["Right","Left"]],n){addMenuItem(o,e,{name:"Connections Layout",property:"connections_layout",subMenuOptions:t.map(o=>o[0]+(o[1]?" -> "+o[1]:"")),prepareValue:(o,e)=>{o=o.split(" -> ");if(o[1]||null!=(e=e.outputs)&&e.length||(o[1]=LAYOUT_LABEL_OPPOSITES[o[0]]),LAYOUT_LABEL_TO_DATA[o[0]]&&LAYOUT_LABEL_TO_DATA[o[1]])return o;throw new Error(`New Layout invalid: [${o[0]}, ${o[1]}]`)},callback:o=>{n&&n(o),e.graph.setDirtyCanvas(!0,!0)}}),o.prototype.getConnectionPos=function(o,e,t){return getConnectionPosForLayout(this,o,e,t)}}function setConnectionsLayout(o,e){var t;if((e=e||o.defaultConnectionsLayout||["Left","Right"])[1]||null!=(t=o.outputs)&&t.length||(e[1]=LAYOUT_LABEL_OPPOSITES[e[0]]),!LAYOUT_LABEL_TO_DATA[e[0]]||!LAYOUT_LABEL_TO_DATA[e[1]])throw new Error(`New Layout invalid: [${e[0]}, ${e[1]}]`);o.properties=o.properties||{},o.properties.connections_layout=e}function setConnectionsCollapse(o,e=null){o.properties=o.properties||{},e=null!==e?e:!o.properties.collapse_connections,o.properties.collapse_connections=e}function getConnectionPosForLayout(o,e,n,t){t=t||new Float32Array(2),o.properties=o.properties||{};var i,l=o.properties.connections_layout||o.defaultConnectionsLayout||["Left","Right"],r=o.properties.collapse_connections||!1,s=null!=(s=o.constructor.layout_slot_offset)?s:.5*LiteGraph.NODE_SLOT_HEIGHT,a=e?l[0]:l[1],l=(e?l[1]:l[0],LAYOUT_LABEL_TO_DATA[a]),p=o[e?"inputs":"outputs"],u=p[n];return u?(u.disabled?("#666665"!==u.color_on&&(u._color_on_org=u._color_on_org||u.color_on,u._color_off_org=u._color_off_org||u.color_off),u.color_on="#666665",u.color_off="#666665"):"#666665"===u.color_on&&(u.color_on=u._color_on_org||void 0,u.color_off=u._color_off_org||void 0),p=r?0:n-p.reduce((o,e,t)=>o+=t<n&&e.hidden?1:0,0),u.dir=l[0],10!=o.size[0]&&10!=o.size[1]||!o.properties.connections_dir||(u.dir=o.properties.connections_dir[e?0:1]),"Left"===a?o.flags.collapsed?(i=o._collapsed_width||LiteGraph.NODE_COLLAPSED_WIDTH,t[0]=o.pos[0],t[1]=o.pos[1]-.5*LiteGraph.NODE_TITLE_HEIGHT):(toggleConnectionLabel(u,!e||r||!!o.hideSlotLabels),t[0]=o.pos[0]+s,null!=(l=o.constructor)&&l.type.includes("Reroute")?t[1]=o.pos[1]+.5*o.size[1]:t[1]=o.pos[1]+(.7+p)*LiteGraph.NODE_SLOT_HEIGHT+(o.constructor.slot_start_y||0)):"Right"===a?o.flags.collapsed?(i=o._collapsed_width||LiteGraph.NODE_COLLAPSED_WIDTH,t[0]=o.pos[0]+i,t[1]=o.pos[1]-.5*LiteGraph.NODE_TITLE_HEIGHT):(toggleConnectionLabel(u,e||r||!!o.hideSlotLabels),t[0]=o.pos[0]+o.size[0]+1-s,null!=(l=o.constructor)&&l.type.includes("Reroute")?t[1]=o.pos[1]+.5*o.size[1]:t[1]=o.pos[1]+(.7+p)*LiteGraph.NODE_SLOT_HEIGHT+(o.constructor.slot_start_y||0)):"Top"===a?(u.has_old_label||(u.has_old_label=!0,u.old_label=u.label,u.label=" "),t[0]=o.pos[0]+.5*o.size[0],t[1]=o.pos[1]+s):"Bottom"===a&&(u.has_old_label||(u.has_old_label=!0,u.old_label=u.label,u.label=" "),t[0]=o.pos[0]+.5*o.size[0],t[1]=o.pos[1]+o.size[1]-s)):console.log("No connection found.. weird",e,n),t}function toggleConnectionLabel(o,e=!0){return e?(o.has_old_label||(o.has_old_label=!0,o.old_label=o.label),o.label=" "):!e&&o.has_old_label&&(o.has_old_label=!1,o.label=o.old_label,o.old_label=void 0),o}function shouldPassThrough(o,e=PassThroughFollowing.ALL){o=null==(o=null==o?void 0:o.constructor)?void 0:o.type;return!(!o||e===PassThroughFollowing.NONE)&&(e===PassThroughFollowing.REROUTE_ONLY?o.includes("Reroute"):o.includes("Reroute")||o.includes("Node Combiner")||o.includes("Node Collector"))}function filterOutPassthroughNodes(o,e=PassThroughFollowing.ALL){return o.filter(o=>!shouldPassThrough(o,e))}function getConnectedInputNodes(o,e,t,n=PassThroughFollowing.ALL){return getConnectedNodes(o,IoDirection.INPUT,e,t,n).map(o=>o.node)}function getConnectedInputNodesAndFilterPassThroughs(o,e,t,n=PassThroughFollowing.ALL){return filterOutPassthroughNodes(getConnectedInputNodes(o,e,t,n),n)}function getConnectedOutputNodes(o,e,t,n=PassThroughFollowing.ALL){return getConnectedNodes(o,IoDirection.OUTPUT,e,t,n).map(o=>o.node)}function getConnectedOutputNodesAndFilterPassThroughs(o,e,t,n=PassThroughFollowing.ALL){return filterOutPassthroughNodes(getConnectedOutputNodes(o,e,t,n),n)}function getConnectedNodes(e,t=IoDirection.INPUT,n,i,l=PassThroughFollowing.ALL){var r,s=[];if(e===(n=n||e)||shouldPassThrough(n,l)){let o;if(o=t==IoDirection.OUTPUT?(null==(r=n.outputs)?void 0:r.flatMap(o=>o.links))||[]:(null==(r=n.inputs)?void 0:r.map(o=>o.link))||[],"number"==typeof i&&-1<i){if(!o[i])return[];o=[o[i]]}var a=app.graph;for(const d of o){var p=null!=d&&a.links[d];if(p){var u=t==IoDirection.OUTPUT?p.target_id:p.origin_id,c=t==IoDirection.OUTPUT?p.target_slot:p.origin_slot;const g=a.getNodeById(u);if(p){if(s.some(o=>o.node==g))console.log(`${e.title} (${e.id}) seems to have two links to ${g.title} (${g.id}). One may be stale: `+o.join(", "));else if(s.push({node:g,slot:c}),shouldPassThrough(g,l))for(const h of getConnectedNodes(e,t,g))s.includes(h)||s.push(h)}else console.error("No connected node found... weird")}}}return s}function followConnectionUntilType(o,e,t,n=!1){o=e===IoDirection.OUTPUT?o.outputs:o.inputs;if(!o||!o.length)return null;let i=null;if(t){if(!o[t])return null;i=getTypeFromSlot(o[t],e,n)}else for(const l of o)if(i=getTypeFromSlot(l,e,n))break;return i}function getTypeFromSlot(o,e,t=!1){var n=app.graph,i=null==o?void 0:o.type;if(!t&&null!=i&&"*"!=i)return{type:i,label:(null==o?void 0:o.label)||(null==o?void 0:o.name)};for(const s of getSlotLinks(o)){var l=e==IoDirection.OUTPUT?s.link.target_id:s.link.origin_id,r=e==IoDirection.OUTPUT?s.link.target_slot:s.link.origin_slot,l=n.getNodeById(l),r=(e===IoDirection.OUTPUT?l.inputs:l.outputs)[r];if(null!=(null==r?void 0:r.type)&&"*"!=(null==r?void 0:r.type))return{type:r.type,label:(null==r?void 0:r.label)||(null==r?void 0:r.name)};if("*"==(null==r?void 0:r.type))return followConnectionUntilType(l,e)}return null}function getOriginNodeByLink(o){let e=null;return null!=o&&(o=app.graph.links[o],e=null!=o&&app.graph.getNodeById(o.origin_id)),e}function applyMixins(t,o){o.forEach(e=>{Object.getOwnPropertyNames(e.prototype).forEach(o=>{Object.defineProperty(t.prototype,o,Object.getOwnPropertyDescriptor(e.prototype,o)||Object.create(null))})})}function getSlotLinks(o){var e,t=[];if(o){if(null!=(e=o.links)&&e.length)for(const i of o.links||[]){var n=app.graph.links[i];n&&t.push({id:i,link:n})}o.link&&(e=app.graph.links[o.link])&&t.push({id:o.link,link:e})}return t}async function matchLocalSlotsToServer(e,t,o){var n,i;const l=t==IoDirection.INPUT?Object.keys((null==(n=o.input)?void 0:n.optional)||{}):o.output_name;var r=t==IoDirection.INPUT?Object.values((null==(n=o.input)?void 0:n.optional)||{}).map(o=>o[0]):o.output,s=t==IoDirection.INPUT?e.inputs:e.outputs;if(-1<s.findIndex((o,e)=>e!==l.indexOf(o.name))){const f={};s.map(o=>{var e;f[o.name]=f[o.name]||[],null!=(e=f[o.name])&&e.push(...getSlotLinks(o))});for(var[a,p]of l.entries()){var u,c=s.map(o=>o.name).indexOf(p);-1<c?c!=a&&(u=s.splice(c,1)[0],s.splice(a,0,u)):-1===c&&(u={name:p,type:r[a],links:[]},s.splice(a,0,u))}if(s.length>l.length)for(let o=s.length-1;o>l.length-1;o--)t==IoDirection.INPUT?(e.disconnectInput(o),e.removeInput(o)):(e.disconnectOutput(o),e.removeOutput(o));for(var[d,g]of Object.entries(f)){var h,_=s.map(o=>o.name).indexOf(d);if(-1<_)for(const L of g)t==IoDirection.INPUT?L.link.target_slot=_:(L.link.origin_slot=_,(h=app.graph.getNodeById(L.link.target_id))&&null!=(i=h.constructor)&&i.type.includes("Reroute")&&h.stabilize&&h.stabilize())}}}function isValidConnection(o,e){if(!o||!e)return!1;var t=String(o.type),n=String(e.type);let i=LiteGraph.isValidConnection(t,n);return i||(t.includes(",")&&"COMBO"===n||"COMBO"===t&&n.includes(","))&&(t=o.name.toUpperCase().replace("_NAME","").replace("CKPT","MODEL"),n=e.name.toUpperCase().replace("_NAME","").replace("CKPT","MODEL"),i=t.includes(n)||n.includes(t)),i}!function(o){o[o.ALL=0]="ALL",o[o.NONE=1]="NONE",o[o.REROUTE_ONLY=2]="REROUTE_ONLY"}(PassThroughFollowing=PassThroughFollowing||{});const oldIsValidConnection=LiteGraph.isValidConnection;LiteGraph.isValidConnection=function(o,e){let t=oldIsValidConnection.call(LiteGraph,o,e);return t||(o=String(o),e=String(e),o=o.includes(",")&&"COMBO"===e||"COMBO"===o&&e.includes(","),t=o),t};export{IoDirection,LAYOUT_LABEL_TO_DATA,LAYOUT_LABEL_OPPOSITES,LAYOUT_CLOCKWISE,addMenuItem,addMenuItemOnExtraMenuOptions,addConnectionLayoutSupport,setConnectionsLayout,setConnectionsCollapse,getConnectionPosForLayout,PassThroughFollowing,shouldPassThrough,filterOutPassthroughNodes,getConnectedInputNodes,getConnectedInputNodesAndFilterPassThroughs,getConnectedOutputNodes,getConnectedOutputNodesAndFilterPassThroughs,getConnectedNodes,followConnectionUntilType,getOriginNodeByLink,applyMixins,getSlotLinks,matchLocalSlotsToServer,isValidConnection};