(function(I,d){typeof exports=="object"&&typeof module<"u"?module.exports=d(require("vue"),require("three"),require("simplex-noise")):typeof define=="function"&&define.amd?define(["vue","three","simplex-noise"],d):(I=typeof globalThis<"u"?globalThis:I||self,I.VueTerrainGenerator=d(I.Vue,I.THREE,I.SimplexNoise))})(this,function(I,d,X){"use strict";function J(a){const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(a){for(const t in a)if(t!=="default"){const n=Object.getOwnPropertyDescriptor(a,t);Object.defineProperty(e,t,n.get?n:{enumerable:!0,get:()=>a[t]})}}return e.default=a,Object.freeze(e)}const _=J(d),k={POSITION:["byte","byte normalized","unsigned byte","unsigned byte normalized","short","short normalized","unsigned short","unsigned short normalized"],NORMAL:["byte normalized","short normalized"],TANGENT:["byte normalized","short normalized"],TEXCOORD:["byte","byte normalized","unsigned byte","short","short normalized","unsigned short"]};class B{constructor(){this.textureUtils=null,this.pluginCallbacks=[],this.register(function(e){return new oe(e)}),this.register(function(e){return new ae(e)}),this.register(function(e){return new fe(e)}),this.register(function(e){return new he(e)}),this.register(function(e){return new pe(e)}),this.register(function(e){return new de(e)}),this.register(function(e){return new ce(e)}),this.register(function(e){return new ue(e)}),this.register(function(e){return new le(e)}),this.register(function(e){return new xe(e)}),this.register(function(e){return new ge(e)}),this.register(function(e){return new ye(e)}),this.register(function(e){return new me(e)}),this.register(function(e){return new we(e)})}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}setTextureUtils(e){return this.textureUtils=e,this}parse(e,t,n,s){const i=new re,r=[];for(let o=0,c=this.pluginCallbacks.length;o<c;o++)r.push(this.pluginCallbacks[o](i));i.setPlugins(r),i.setTextureUtils(this.textureUtils),i.writeAsync(e,t,s).catch(n)}parseAsync(e,t){const n=this;return new Promise(function(s,i){n.parse(e,s,i,t)})}}const m={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497},P="KHR_mesh_quantization",L={};L[d.NearestFilter]=m.NEAREST,L[d.NearestMipmapNearestFilter]=m.NEAREST_MIPMAP_NEAREST,L[d.NearestMipmapLinearFilter]=m.NEAREST_MIPMAP_LINEAR,L[d.LinearFilter]=m.LINEAR,L[d.LinearMipmapNearestFilter]=m.LINEAR_MIPMAP_NEAREST,L[d.LinearMipmapLinearFilter]=m.LINEAR_MIPMAP_LINEAR,L[d.ClampToEdgeWrapping]=m.CLAMP_TO_EDGE,L[d.RepeatWrapping]=m.REPEAT,L[d.MirroredRepeatWrapping]=m.MIRRORED_REPEAT;const V={scale:"scale",position:"translation",quaternion:"rotation",morphTargetInfluences:"weights"},Z=new d.Color,j=12,Q=1179937895,$=2,Y=8,ee=1313821514,te=5130562;function U(a,e){return a.length===e.length&&a.every(function(t,n){return t===e[n]})}function se(a){return new TextEncoder().encode(a).buffer}function ne(a){return U(a.elements,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}function ie(a,e,t){const n={min:new Array(a.itemSize).fill(Number.POSITIVE_INFINITY),max:new Array(a.itemSize).fill(Number.NEGATIVE_INFINITY)};for(let s=e;s<e+t;s++)for(let i=0;i<a.itemSize;i++){let r;a.itemSize>4?r=a.array[s*a.itemSize+i]:(i===0?r=a.getX(s):i===1?r=a.getY(s):i===2?r=a.getZ(s):i===3&&(r=a.getW(s)),a.normalized===!0&&(r=d.MathUtils.normalize(r,a.array))),n.min[i]=Math.min(n.min[i],r),n.max[i]=Math.max(n.max[i],r)}return n}function K(a){return Math.ceil(a/4)*4}function D(a,e=0){const t=K(a.byteLength);if(t!==a.byteLength){const n=new Uint8Array(t);if(n.set(new Uint8Array(a)),e!==0)for(let s=a.byteLength;s<t;s++)n[s]=e;return n.buffer}return a}function q(){return typeof document>"u"&&typeof OffscreenCanvas<"u"?new OffscreenCanvas(1,1):document.createElement("canvas")}function W(a,e){if(a.toBlob!==void 0)return new Promise(n=>a.toBlob(n,e));let t;return e==="image/jpeg"?t=.92:e==="image/webp"&&(t=.8),a.convertToBlob({type:e,quality:t})}class re{constructor(){this.plugins=[],this.options={},this.pending=[],this.buffers=[],this.byteOffset=0,this.buffers=[],this.nodeMap=new Map,this.skins=[],this.extensionsUsed={},this.extensionsRequired={},this.uids=new Map,this.uid=0,this.json={asset:{version:"2.0",generator:"THREE.GLTFExporter r"+d.REVISION}},this.cache={meshes:new Map,attributes:new Map,attributesNormalized:new Map,materials:new Map,textures:new Map,images:new Map},this.textureUtils=null}setPlugins(e){this.plugins=e}setTextureUtils(e){this.textureUtils=e}async writeAsync(e,t,n={}){this.options=Object.assign({binary:!1,trs:!1,onlyVisible:!0,maxTextureSize:1/0,animations:[],includeCustomExtensions:!1},n),this.options.animations.length>0&&(this.options.trs=!0),await this.processInputAsync(e),await Promise.all(this.pending);const s=this,i=s.buffers,r=s.json;n=s.options;const o=s.extensionsUsed,c=s.extensionsRequired,f=new Blob(i,{type:"application/octet-stream"}),g=Object.keys(o),l=Object.keys(c);if(g.length>0&&(r.extensionsUsed=g),l.length>0&&(r.extensionsRequired=l),r.buffers&&r.buffers.length>0&&(r.buffers[0].byteLength=f.size),n.binary===!0){const w=new FileReader;w.readAsArrayBuffer(f),w.onloadend=function(){const u=D(w.result),p=new DataView(new ArrayBuffer(Y));p.setUint32(0,u.byteLength,!0),p.setUint32(4,te,!0);const h=D(se(JSON.stringify(r)),32),x=new DataView(new ArrayBuffer(Y));x.setUint32(0,h.byteLength,!0),x.setUint32(4,ee,!0);const T=new ArrayBuffer(j),N=new DataView(T);N.setUint32(0,Q,!0),N.setUint32(4,$,!0);const z=j+x.byteLength+h.byteLength+p.byteLength+u.byteLength;N.setUint32(8,z,!0);const y=new Blob([T,x,h,p,u],{type:"application/octet-stream"}),M=new FileReader;M.readAsArrayBuffer(y),M.onloadend=function(){t(M.result)}}}else if(r.buffers&&r.buffers.length>0){const w=new FileReader;w.readAsDataURL(f),w.onloadend=function(){const u=w.result;r.buffers[0].uri=u,t(r)}}else t(r)}serializeUserData(e,t){if(Object.keys(e.userData).length===0)return;const n=this.options,s=this.extensionsUsed;try{const i=JSON.parse(JSON.stringify(e.userData));if(n.includeCustomExtensions&&i.gltfExtensions){t.extensions===void 0&&(t.extensions={});for(const r in i.gltfExtensions)t.extensions[r]=i.gltfExtensions[r],s[r]=!0;delete i.gltfExtensions}Object.keys(i).length>0&&(t.extras=i)}catch(i){console.warn("THREE.GLTFExporter: userData of '"+e.name+"' won't be serialized because of JSON.stringify error - "+i.message)}}getUID(e,t=!1){if(this.uids.has(e)===!1){const s=new Map;s.set(!0,this.uid++),s.set(!1,this.uid++),this.uids.set(e,s)}return this.uids.get(e).get(t)}isNormalizedNormalAttribute(e){if(this.cache.attributesNormalized.has(e))return!1;const n=new d.Vector3;for(let s=0,i=e.count;s<i;s++)if(Math.abs(n.fromBufferAttribute(e,s).length()-1)>5e-4)return!1;return!0}createNormalizedNormalAttribute(e){const t=this.cache;if(t.attributesNormalized.has(e))return t.attributesNormalized.get(e);const n=e.clone(),s=new d.Vector3;for(let i=0,r=n.count;i<r;i++)s.fromBufferAttribute(n,i),s.x===0&&s.y===0&&s.z===0?s.setX(1):s.normalize(),n.setXYZ(i,s.x,s.y,s.z);return t.attributesNormalized.set(e,n),n}applyTextureTransform(e,t){let n=!1;const s={};(t.offset.x!==0||t.offset.y!==0)&&(s.offset=t.offset.toArray(),n=!0),t.rotation!==0&&(s.rotation=t.rotation,n=!0),(t.repeat.x!==1||t.repeat.y!==1)&&(s.scale=t.repeat.toArray(),n=!0),n&&(e.extensions=e.extensions||{},e.extensions.KHR_texture_transform=s,this.extensionsUsed.KHR_texture_transform=!0)}async buildMetalRoughTextureAsync(e,t){if(e===t)return e;function n(u){return u.colorSpace===d.SRGBColorSpace?function(h){return h<.04045?h*.0773993808:Math.pow(h*.9478672986+.0521327014,2.4)}:function(h){return h}}e instanceof d.CompressedTexture&&(e=await this.decompressTextureAsync(e)),t instanceof d.CompressedTexture&&(t=await this.decompressTextureAsync(t));const s=e?e.image:null,i=t?t.image:null,r=Math.max(s?s.width:0,i?i.width:0),o=Math.max(s?s.height:0,i?i.height:0),c=q();c.width=r,c.height=o;const f=c.getContext("2d",{willReadFrequently:!0});f.fillStyle="#00ffff",f.fillRect(0,0,r,o);const g=f.getImageData(0,0,r,o);if(s){f.drawImage(s,0,0,r,o);const u=n(e),p=f.getImageData(0,0,r,o).data;for(let h=2;h<p.length;h+=4)g.data[h]=u(p[h]/256)*256}if(i){f.drawImage(i,0,0,r,o);const u=n(t),p=f.getImageData(0,0,r,o).data;for(let h=1;h<p.length;h+=4)g.data[h]=u(p[h]/256)*256}f.putImageData(g,0,0);const w=(e||t).clone();return w.source=new d.Source(c),w.colorSpace=d.NoColorSpace,w.channel=(e||t).channel,e&&t&&e.channel!==t.channel&&console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."),console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."),w}async decompressTextureAsync(e,t=1/0){if(this.textureUtils===null)throw new Error("THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.");return await this.textureUtils.decompress(e,t)}processBuffer(e){const t=this.json,n=this.buffers;return t.buffers||(t.buffers=[{byteLength:0}]),n.push(e),0}processBufferView(e,t,n,s,i){const r=this.json;r.bufferViews||(r.bufferViews=[]);let o;switch(t){case m.BYTE:case m.UNSIGNED_BYTE:o=1;break;case m.SHORT:case m.UNSIGNED_SHORT:o=2;break;default:o=4}let c=e.itemSize*o;i===m.ARRAY_BUFFER&&(c=Math.ceil(c/4)*4);const f=K(s*c),g=new DataView(new ArrayBuffer(f));let l=0;for(let p=n;p<n+s;p++){for(let h=0;h<e.itemSize;h++){let x;e.itemSize>4?x=e.array[p*e.itemSize+h]:(h===0?x=e.getX(p):h===1?x=e.getY(p):h===2?x=e.getZ(p):h===3&&(x=e.getW(p)),e.normalized===!0&&(x=d.MathUtils.normalize(x,e.array))),t===m.FLOAT?g.setFloat32(l,x,!0):t===m.INT?g.setInt32(l,x,!0):t===m.UNSIGNED_INT?g.setUint32(l,x,!0):t===m.SHORT?g.setInt16(l,x,!0):t===m.UNSIGNED_SHORT?g.setUint16(l,x,!0):t===m.BYTE?g.setInt8(l,x):t===m.UNSIGNED_BYTE&&g.setUint8(l,x),l+=o}l%c!==0&&(l+=c-l%c)}const w={buffer:this.processBuffer(g.buffer),byteOffset:this.byteOffset,byteLength:f};return i!==void 0&&(w.target=i),i===m.ARRAY_BUFFER&&(w.byteStride=c),this.byteOffset+=f,r.bufferViews.push(w),{id:r.bufferViews.length-1,byteLength:0}}processBufferViewImage(e){const t=this,n=t.json;return n.bufferViews||(n.bufferViews=[]),new Promise(function(s){const i=new FileReader;i.readAsArrayBuffer(e),i.onloadend=function(){const r=D(i.result),o={buffer:t.processBuffer(r),byteOffset:t.byteOffset,byteLength:r.byteLength};t.byteOffset+=r.byteLength,s(n.bufferViews.push(o)-1)}})}processAccessor(e,t,n,s){const i=this.json,r={1:"SCALAR",2:"VEC2",3:"VEC3",4:"VEC4",9:"MAT3",16:"MAT4"};let o;if(e.array.constructor===Float32Array)o=m.FLOAT;else if(e.array.constructor===Int32Array)o=m.INT;else if(e.array.constructor===Uint32Array)o=m.UNSIGNED_INT;else if(e.array.constructor===Int16Array)o=m.SHORT;else if(e.array.constructor===Uint16Array)o=m.UNSIGNED_SHORT;else if(e.array.constructor===Int8Array)o=m.BYTE;else if(e.array.constructor===Uint8Array)o=m.UNSIGNED_BYTE;else throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: "+e.array.constructor.name);if(n===void 0&&(n=0),(s===void 0||s===1/0)&&(s=e.count),s===0)return null;const c=ie(e,n,s);let f;t!==void 0&&(f=e===t.index?m.ELEMENT_ARRAY_BUFFER:m.ARRAY_BUFFER);const g=this.processBufferView(e,o,n,s,f),l={bufferView:g.id,byteOffset:g.byteOffset,componentType:o,count:s,max:c.max,min:c.min,type:r[e.itemSize]};return e.normalized===!0&&(l.normalized=!0),i.accessors||(i.accessors=[]),i.accessors.push(l)-1}processImage(e,t,n,s="image/png"){if(e!==null){const i=this,r=i.cache,o=i.json,c=i.options,f=i.pending;r.images.has(e)||r.images.set(e,{});const g=r.images.get(e),l=s+":flipY/"+n.toString();if(g[l]!==void 0)return g[l];o.images||(o.images=[]);const w={mimeType:s},u=q();u.width=Math.min(e.width,c.maxTextureSize),u.height=Math.min(e.height,c.maxTextureSize);const p=u.getContext("2d",{willReadFrequently:!0});if(n===!0&&(p.translate(0,u.height),p.scale(1,-1)),e.data!==void 0){t!==d.RGBAFormat&&console.error("GLTFExporter: Only RGBAFormat is supported.",t),(e.width>c.maxTextureSize||e.height>c.maxTextureSize)&&console.warn("GLTFExporter: Image size is bigger than maxTextureSize",e);const x=new Uint8ClampedArray(e.height*e.width*4);for(let T=0;T<x.length;T+=4)x[T+0]=e.data[T+0],x[T+1]=e.data[T+1],x[T+2]=e.data[T+2],x[T+3]=e.data[T+3];p.putImageData(new ImageData(x,e.width,e.height),0,0)}else if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas)p.drawImage(e,0,0,u.width,u.height);else throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");c.binary===!0?f.push(W(u,s).then(x=>i.processBufferViewImage(x)).then(x=>{w.bufferView=x})):u.toDataURL!==void 0?w.uri=u.toDataURL(s):f.push(W(u,s).then(x=>new FileReader().readAsDataURL(x)).then(x=>{w.uri=x}));const h=o.images.push(w)-1;return g[l]=h,h}else throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.")}processSampler(e){const t=this.json;t.samplers||(t.samplers=[]);const n={magFilter:L[e.magFilter],minFilter:L[e.minFilter],wrapS:L[e.wrapS],wrapT:L[e.wrapT]};return t.samplers.push(n)-1}async processTextureAsync(e){const n=this.options,s=this.cache,i=this.json;if(s.textures.has(e))return s.textures.get(e);i.textures||(i.textures=[]),e instanceof d.CompressedTexture&&(e=await this.decompressTextureAsync(e,n.maxTextureSize));let r=e.userData.mimeType;r==="image/webp"&&(r="image/png");const o={sampler:this.processSampler(e),source:this.processImage(e.image,e.format,e.flipY,r)};e.name&&(o.name=e.name),await this._invokeAllAsync(async function(f){f.writeTexture&&await f.writeTexture(e,o)});const c=i.textures.push(o)-1;return s.textures.set(e,c),c}async processMaterialAsync(e){const t=this.cache,n=this.json;if(t.materials.has(e))return t.materials.get(e);if(e.isShaderMaterial)return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."),null;n.materials||(n.materials=[]);const s={pbrMetallicRoughness:{}};e.isMeshStandardMaterial!==!0&&e.isMeshBasicMaterial!==!0&&console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");const i=e.color.toArray().concat([e.opacity]);if(U(i,[1,1,1,1])||(s.pbrMetallicRoughness.baseColorFactor=i),e.isMeshStandardMaterial?(s.pbrMetallicRoughness.metallicFactor=e.metalness,s.pbrMetallicRoughness.roughnessFactor=e.roughness):(s.pbrMetallicRoughness.metallicFactor=0,s.pbrMetallicRoughness.roughnessFactor=1),e.metalnessMap||e.roughnessMap){const o=await this.buildMetalRoughTextureAsync(e.metalnessMap,e.roughnessMap),c={index:await this.processTextureAsync(o),texCoord:o.channel};this.applyTextureTransform(c,o),s.pbrMetallicRoughness.metallicRoughnessTexture=c}if(e.map){const o={index:await this.processTextureAsync(e.map),texCoord:e.map.channel};this.applyTextureTransform(o,e.map),s.pbrMetallicRoughness.baseColorTexture=o}if(e.emissive){const o=e.emissive;if(Math.max(o.r,o.g,o.b)>0&&(s.emissiveFactor=e.emissive.toArray()),e.emissiveMap){const f={index:await this.processTextureAsync(e.emissiveMap),texCoord:e.emissiveMap.channel};this.applyTextureTransform(f,e.emissiveMap),s.emissiveTexture=f}}if(e.normalMap){const o={index:await this.processTextureAsync(e.normalMap),texCoord:e.normalMap.channel};e.normalScale&&e.normalScale.x!==1&&(o.scale=e.normalScale.x),this.applyTextureTransform(o,e.normalMap),s.normalTexture=o}if(e.aoMap){const o={index:await this.processTextureAsync(e.aoMap),texCoord:e.aoMap.channel};e.aoMapIntensity!==1&&(o.strength=e.aoMapIntensity),this.applyTextureTransform(o,e.aoMap),s.occlusionTexture=o}e.transparent?s.alphaMode="BLEND":e.alphaTest>0&&(s.alphaMode="MASK",s.alphaCutoff=e.alphaTest),e.side===d.DoubleSide&&(s.doubleSided=!0),e.name!==""&&(s.name=e.name),this.serializeUserData(e,s),await this._invokeAllAsync(async function(o){o.writeMaterialAsync&&await o.writeMaterialAsync(e,s)});const r=n.materials.push(s)-1;return t.materials.set(e,r),r}async processMeshAsync(e){const t=this.cache,n=this.json,s=[e.geometry.uuid];if(Array.isArray(e.material))for(let y=0,M=e.material.length;y<M;y++)s.push(e.material[y].uuid);else s.push(e.material.uuid);const i=s.join(":");if(t.meshes.has(i))return t.meshes.get(i);const r=e.geometry;let o;e.isLineSegments?o=m.LINES:e.isLineLoop?o=m.LINE_LOOP:e.isLine?o=m.LINE_STRIP:e.isPoints?o=m.POINTS:o=e.material.wireframe?m.LINES:m.TRIANGLES;const c={},f={},g=[],l=[],w={uv:"TEXCOORD_0",uv1:"TEXCOORD_1",uv2:"TEXCOORD_2",uv3:"TEXCOORD_3",color:"COLOR_0",skinWeight:"WEIGHTS_0",skinIndex:"JOINTS_0"},u=r.getAttribute("normal");u!==void 0&&!this.isNormalizedNormalAttribute(u)&&(console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."),r.setAttribute("normal",this.createNormalizedNormalAttribute(u)));let p=null;for(let y in r.attributes){if(y.slice(0,5)==="morph")continue;const M=r.attributes[y];if(y=w[y]||y.toUpperCase(),/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(y)||(y="_"+y),t.attributes.has(this.getUID(M))){f[y]=t.attributes.get(this.getUID(M));continue}p=null;const A=M.array;y==="JOINTS_0"&&!(A instanceof Uint16Array)&&!(A instanceof Uint8Array)?(console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'),p=new d.BufferAttribute(new Uint16Array(A),M.itemSize,M.normalized)):(A instanceof Uint32Array||A instanceof Int32Array)&&!y.startsWith("_")&&(console.warn(`GLTFExporter: Attribute "${y}" converted to type FLOAT.`),p=B.Utils.toFloat32BufferAttribute(M));const E=this.processAccessor(p||M,r);E!==null&&(y.startsWith("_")||this.detectMeshQuantization(y,M),f[y]=E,t.attributes.set(this.getUID(M),E))}if(u!==void 0&&r.setAttribute("normal",u),Object.keys(f).length===0)return null;if(e.morphTargetInfluences!==void 0&&e.morphTargetInfluences.length>0){const y=[],M=[],b={};if(e.morphTargetDictionary!==void 0)for(const A in e.morphTargetDictionary)b[e.morphTargetDictionary[A]]=A;for(let A=0;A<e.morphTargetInfluences.length;++A){const E={};let H=!1;for(const F in r.morphAttributes){if(F!=="position"&&F!=="normal"){H||(console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."),H=!0);continue}const R=r.morphAttributes[F][A],G=F.toUpperCase(),O=r.attributes[F];if(t.attributes.has(this.getUID(R,!0))){E[G]=t.attributes.get(this.getUID(R,!0));continue}const v=R.clone();if(!r.morphTargetsRelative)for(let S=0,Te=R.count;S<Te;S++)for(let C=0;C<R.itemSize;C++)C===0&&v.setX(S,R.getX(S)-O.getX(S)),C===1&&v.setY(S,R.getY(S)-O.getY(S)),C===2&&v.setZ(S,R.getZ(S)-O.getZ(S)),C===3&&v.setW(S,R.getW(S)-O.getW(S));E[G]=this.processAccessor(v,r),t.attributes.set(this.getUID(O,!0),E[G])}l.push(E),y.push(e.morphTargetInfluences[A]),e.morphTargetDictionary!==void 0&&M.push(b[A])}c.weights=y,M.length>0&&(c.extras={},c.extras.targetNames=M)}const h=Array.isArray(e.material);if(h&&r.groups.length===0)return null;let x=!1;if(h&&r.index===null){const y=[];for(let M=0,b=r.attributes.position.count;M<b;M++)y[M]=M;r.setIndex(y),x=!0}const T=h?e.material:[e.material],N=h?r.groups:[{materialIndex:0,start:void 0,count:void 0}];for(let y=0,M=N.length;y<M;y++){const b={mode:o,attributes:f};if(this.serializeUserData(r,b),l.length>0&&(b.targets=l),r.index!==null){let E=this.getUID(r.index);(N[y].start!==void 0||N[y].count!==void 0)&&(E+=":"+N[y].start+":"+N[y].count),t.attributes.has(E)?b.indices=t.attributes.get(E):(b.indices=this.processAccessor(r.index,r,N[y].start,N[y].count),t.attributes.set(E,b.indices)),b.indices===null&&delete b.indices}const A=await this.processMaterialAsync(T[N[y].materialIndex]);A!==null&&(b.material=A),g.push(b)}x===!0&&r.setIndex(null),c.primitives=g,n.meshes||(n.meshes=[]),await this._invokeAllAsync(function(y){y.writeMesh&&y.writeMesh(e,c)});const z=n.meshes.push(c)-1;return t.meshes.set(i,z),z}detectMeshQuantization(e,t){if(this.extensionsUsed[P])return;let n;switch(t.array.constructor){case Int8Array:n="byte";break;case Uint8Array:n="unsigned byte";break;case Int16Array:n="short";break;case Uint16Array:n="unsigned short";break;default:return}t.normalized&&(n+=" normalized");const s=e.split("_",1)[0];k[s]&&k[s].includes(n)&&(this.extensionsUsed[P]=!0,this.extensionsRequired[P]=!0)}processCamera(e){const t=this.json;t.cameras||(t.cameras=[]);const n=e.isOrthographicCamera,s={type:n?"orthographic":"perspective"};return n?s.orthographic={xmag:e.right*2,ymag:e.top*2,zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near}:s.perspective={aspectRatio:e.aspect,yfov:d.MathUtils.degToRad(e.fov),zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near},e.name!==""&&(s.name=e.type),t.cameras.push(s)-1}processAnimation(e,t){const n=this.json,s=this.nodeMap;n.animations||(n.animations=[]),e=B.Utils.mergeMorphTargetTracks(e.clone(),t);const i=e.tracks,r=[],o=[];for(let c=0;c<i.length;++c){const f=i[c],g=d.PropertyBinding.parseTrackName(f.name);let l=d.PropertyBinding.findNode(t,g.nodeName);const w=V[g.propertyName];if(g.objectName==="bones"&&(l.isSkinnedMesh===!0?l=l.skeleton.getBoneByName(g.objectIndex):l=void 0),!l||!w){console.warn('THREE.GLTFExporter: Could not export animation track "%s".',f.name);continue}const u=1;let p=f.values.length/f.times.length;w===V.morphTargetInfluences&&(p/=l.morphTargetInfluences.length);let h;f.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline===!0?(h="CUBICSPLINE",p/=3):f.getInterpolation()===d.InterpolateDiscrete?h="STEP":h="LINEAR",o.push({input:this.processAccessor(new d.BufferAttribute(f.times,u)),output:this.processAccessor(new d.BufferAttribute(f.values,p)),interpolation:h}),r.push({sampler:o.length-1,target:{node:s.get(l),path:w}})}return n.animations.push({name:e.name||"clip_"+n.animations.length,samplers:o,channels:r}),n.animations.length-1}processSkin(e){const t=this.json,n=this.nodeMap,s=t.nodes[n.get(e)],i=e.skeleton;if(i===void 0)return null;const r=e.skeleton.bones[0];if(r===void 0)return null;const o=[],c=new Float32Array(i.bones.length*16),f=new d.Matrix4;for(let l=0;l<i.bones.length;++l)o.push(n.get(i.bones[l])),f.copy(i.boneInverses[l]),f.multiply(e.bindMatrix).toArray(c,l*16);return t.skins===void 0&&(t.skins=[]),t.skins.push({inverseBindMatrices:this.processAccessor(new d.BufferAttribute(c,16)),joints:o,skeleton:n.get(r)}),s.skin=t.skins.length-1}async processNodeAsync(e){const t=this.json,n=this.options,s=this.nodeMap;t.nodes||(t.nodes=[]);const i={};if(n.trs){const o=e.quaternion.toArray(),c=e.position.toArray(),f=e.scale.toArray();U(o,[0,0,0,1])||(i.rotation=o),U(c,[0,0,0])||(i.translation=c),U(f,[1,1,1])||(i.scale=f)}else e.matrixAutoUpdate&&e.updateMatrix(),ne(e.matrix)===!1&&(i.matrix=e.matrix.elements);if(e.name!==""&&(i.name=String(e.name)),this.serializeUserData(e,i),e.isMesh||e.isLine||e.isPoints){const o=await this.processMeshAsync(e);o!==null&&(i.mesh=o)}else e.isCamera&&(i.camera=this.processCamera(e));if(e.isSkinnedMesh&&this.skins.push(e),e.children.length>0){const o=[];for(let c=0,f=e.children.length;c<f;c++){const g=e.children[c];if(g.visible||n.onlyVisible===!1){const l=await this.processNodeAsync(g);l!==null&&o.push(l)}}o.length>0&&(i.children=o)}await this._invokeAllAsync(function(o){o.writeNode&&o.writeNode(e,i)});const r=t.nodes.push(i)-1;return s.set(e,r),r}async processSceneAsync(e){const t=this.json,n=this.options;t.scenes||(t.scenes=[],t.scene=0);const s={};e.name!==""&&(s.name=e.name),t.scenes.push(s);const i=[];for(let r=0,o=e.children.length;r<o;r++){const c=e.children[r];if(c.visible||n.onlyVisible===!1){const f=await this.processNodeAsync(c);f!==null&&i.push(f)}}i.length>0&&(s.nodes=i),this.serializeUserData(e,s)}async processObjectsAsync(e){const t=new d.Scene;t.name="AuxScene";for(let n=0;n<e.length;n++)t.children.push(e[n]);await this.processSceneAsync(t)}async processInputAsync(e){const t=this.options;e=e instanceof Array?e:[e],await this._invokeAllAsync(function(s){s.beforeParse&&s.beforeParse(e)});const n=[];for(let s=0;s<e.length;s++)e[s]instanceof d.Scene?await this.processSceneAsync(e[s]):n.push(e[s]);n.length>0&&await this.processObjectsAsync(n);for(let s=0;s<this.skins.length;++s)this.processSkin(this.skins[s]);for(let s=0;s<t.animations.length;++s)this.processAnimation(t.animations[s],e[0]);await this._invokeAllAsync(function(s){s.afterParse&&s.afterParse(e)})}async _invokeAllAsync(e){for(let t=0,n=this.plugins.length;t<n;t++)await e(this.plugins[t])}}class oe{constructor(e){this.writer=e,this.name="KHR_lights_punctual"}writeNode(e,t){if(!e.isLight)return;if(!e.isDirectionalLight&&!e.isPointLight&&!e.isSpotLight){console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.",e);return}const n=this.writer,s=n.json,i=n.extensionsUsed,r={};e.name&&(r.name=e.name),r.color=e.color.toArray(),r.intensity=e.intensity,e.isDirectionalLight?r.type="directional":e.isPointLight?(r.type="point",e.distance>0&&(r.range=e.distance)):e.isSpotLight&&(r.type="spot",e.distance>0&&(r.range=e.distance),r.spot={},r.spot.innerConeAngle=(1-e.penumbra)*e.angle,r.spot.outerConeAngle=e.angle),e.decay!==void 0&&e.decay!==2&&console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."),e.target&&(e.target.parent!==e||e.target.position.x!==0||e.target.position.y!==0||e.target.position.z!==-1)&&console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."),i[this.name]||(s.extensions=s.extensions||{},s.extensions[this.name]={lights:[]},i[this.name]=!0);const o=s.extensions[this.name].lights;o.push(r),t.extensions=t.extensions||{},t.extensions[this.name]={light:o.length-1}}}class ae{constructor(e){this.writer=e,this.name="KHR_materials_unlit"}async writeMaterialAsync(e,t){if(!e.isMeshBasicMaterial)return;const s=this.writer.extensionsUsed;t.extensions=t.extensions||{},t.extensions[this.name]={},s[this.name]=!0,t.pbrMetallicRoughness.metallicFactor=0,t.pbrMetallicRoughness.roughnessFactor=.9}}class ce{constructor(e){this.writer=e,this.name="KHR_materials_clearcoat"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.clearcoat===0)return;const n=this.writer,s=n.extensionsUsed,i={};if(i.clearcoatFactor=e.clearcoat,e.clearcoatMap){const r={index:await n.processTextureAsync(e.clearcoatMap),texCoord:e.clearcoatMap.channel};n.applyTextureTransform(r,e.clearcoatMap),i.clearcoatTexture=r}if(i.clearcoatRoughnessFactor=e.clearcoatRoughness,e.clearcoatRoughnessMap){const r={index:await n.processTextureAsync(e.clearcoatRoughnessMap),texCoord:e.clearcoatRoughnessMap.channel};n.applyTextureTransform(r,e.clearcoatRoughnessMap),i.clearcoatRoughnessTexture=r}if(e.clearcoatNormalMap){const r={index:await n.processTextureAsync(e.clearcoatNormalMap),texCoord:e.clearcoatNormalMap.channel};e.clearcoatNormalScale.x!==1&&(r.scale=e.clearcoatNormalScale.x),n.applyTextureTransform(r,e.clearcoatNormalMap),i.clearcoatNormalTexture=r}t.extensions=t.extensions||{},t.extensions[this.name]=i,s[this.name]=!0}}class ue{constructor(e){this.writer=e,this.name="KHR_materials_dispersion"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.dispersion===0)return;const s=this.writer.extensionsUsed,i={};i.dispersion=e.dispersion,t.extensions=t.extensions||{},t.extensions[this.name]=i,s[this.name]=!0}}class le{constructor(e){this.writer=e,this.name="KHR_materials_iridescence"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.iridescence===0)return;const n=this.writer,s=n.extensionsUsed,i={};if(i.iridescenceFactor=e.iridescence,e.iridescenceMap){const r={index:await n.processTextureAsync(e.iridescenceMap),texCoord:e.iridescenceMap.channel};n.applyTextureTransform(r,e.iridescenceMap),i.iridescenceTexture=r}if(i.iridescenceIor=e.iridescenceIOR,i.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],i.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1],e.iridescenceThicknessMap){const r={index:await n.processTextureAsync(e.iridescenceThicknessMap),texCoord:e.iridescenceThicknessMap.channel};n.applyTextureTransform(r,e.iridescenceThicknessMap),i.iridescenceThicknessTexture=r}t.extensions=t.extensions||{},t.extensions[this.name]=i,s[this.name]=!0}}class fe{constructor(e){this.writer=e,this.name="KHR_materials_transmission"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;const n=this.writer,s=n.extensionsUsed,i={};if(i.transmissionFactor=e.transmission,e.transmissionMap){const r={index:await n.processTextureAsync(e.transmissionMap),texCoord:e.transmissionMap.channel};n.applyTextureTransform(r,e.transmissionMap),i.transmissionTexture=r}t.extensions=t.extensions||{},t.extensions[this.name]=i,s[this.name]=!0}}class he{constructor(e){this.writer=e,this.name="KHR_materials_volume"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;const n=this.writer,s=n.extensionsUsed,i={};if(i.thicknessFactor=e.thickness,e.thicknessMap){const r={index:await n.processTextureAsync(e.thicknessMap),texCoord:e.thicknessMap.channel};n.applyTextureTransform(r,e.thicknessMap),i.thicknessTexture=r}e.attenuationDistance!==1/0&&(i.attenuationDistance=e.attenuationDistance),i.attenuationColor=e.attenuationColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=i,s[this.name]=!0}}class pe{constructor(e){this.writer=e,this.name="KHR_materials_ior"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.ior===1.5)return;const s=this.writer.extensionsUsed,i={};i.ior=e.ior,t.extensions=t.extensions||{},t.extensions[this.name]=i,s[this.name]=!0}}class de{constructor(e){this.writer=e,this.name="KHR_materials_specular"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.specularIntensity===1&&e.specularColor.equals(Z)&&!e.specularIntensityMap&&!e.specularColorMap)return;const n=this.writer,s=n.extensionsUsed,i={};if(e.specularIntensityMap){const r={index:await n.processTextureAsync(e.specularIntensityMap),texCoord:e.specularIntensityMap.channel};n.applyTextureTransform(r,e.specularIntensityMap),i.specularTexture=r}if(e.specularColorMap){const r={index:await n.processTextureAsync(e.specularColorMap),texCoord:e.specularColorMap.channel};n.applyTextureTransform(r,e.specularColorMap),i.specularColorTexture=r}i.specularFactor=e.specularIntensity,i.specularColorFactor=e.specularColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=i,s[this.name]=!0}}class xe{constructor(e){this.writer=e,this.name="KHR_materials_sheen"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.sheen==0)return;const n=this.writer,s=n.extensionsUsed,i={};if(e.sheenRoughnessMap){const r={index:await n.processTextureAsync(e.sheenRoughnessMap),texCoord:e.sheenRoughnessMap.channel};n.applyTextureTransform(r,e.sheenRoughnessMap),i.sheenRoughnessTexture=r}if(e.sheenColorMap){const r={index:await n.processTextureAsync(e.sheenColorMap),texCoord:e.sheenColorMap.channel};n.applyTextureTransform(r,e.sheenColorMap),i.sheenColorTexture=r}i.sheenRoughnessFactor=e.sheenRoughness,i.sheenColorFactor=e.sheenColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=i,s[this.name]=!0}}class ge{constructor(e){this.writer=e,this.name="KHR_materials_anisotropy"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.anisotropy==0)return;const n=this.writer,s=n.extensionsUsed,i={};if(e.anisotropyMap){const r={index:await n.processTextureAsync(e.anisotropyMap)};n.applyTextureTransform(r,e.anisotropyMap),i.anisotropyTexture=r}i.anisotropyStrength=e.anisotropy,i.anisotropyRotation=e.anisotropyRotation,t.extensions=t.extensions||{},t.extensions[this.name]=i,s[this.name]=!0}}class ye{constructor(e){this.writer=e,this.name="KHR_materials_emissive_strength"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.emissiveIntensity===1)return;const s=this.writer.extensionsUsed,i={};i.emissiveStrength=e.emissiveIntensity,t.extensions=t.extensions||{},t.extensions[this.name]=i,s[this.name]=!0}}class me{constructor(e){this.writer=e,this.name="EXT_materials_bump"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.bumpScale===1&&!e.bumpMap)return;const n=this.writer,s=n.extensionsUsed,i={};if(e.bumpMap){const r={index:await n.processTextureAsync(e.bumpMap),texCoord:e.bumpMap.channel};n.applyTextureTransform(r,e.bumpMap),i.bumpTexture=r}i.bumpFactor=e.bumpScale,t.extensions=t.extensions||{},t.extensions[this.name]=i,s[this.name]=!0}}class we{constructor(e){this.writer=e,this.name="EXT_mesh_gpu_instancing"}writeNode(e,t){if(!e.isInstancedMesh)return;const n=this.writer,s=e,i=new Float32Array(s.count*3),r=new Float32Array(s.count*4),o=new Float32Array(s.count*3),c=new d.Matrix4,f=new d.Vector3,g=new d.Quaternion,l=new d.Vector3;for(let u=0;u<s.count;u++)s.getMatrixAt(u,c),c.decompose(f,g,l),f.toArray(i,u*3),g.toArray(r,u*4),l.toArray(o,u*3);const w={TRANSLATION:n.processAccessor(new d.BufferAttribute(i,3)),ROTATION:n.processAccessor(new d.BufferAttribute(r,4)),SCALE:n.processAccessor(new d.BufferAttribute(o,3))};s.instanceColor&&(w._COLOR_0=n.processAccessor(s.instanceColor)),t.extensions=t.extensions||{},t.extensions[this.name]={attributes:w},n.extensionsUsed[this.name]=!0,n.extensionsRequired[this.name]=!0}}return B.Utils={insertKeyframe:function(a,e){const n=a.getValueSize(),s=new a.TimeBufferType(a.times.length+1),i=new a.ValueBufferType(a.values.length+n),r=a.createInterpolant(new a.ValueBufferType(n));let o;if(a.times.length===0){s[0]=e;for(let c=0;c<n;c++)i[c]=0;o=0}else if(e<a.times[0]){if(Math.abs(a.times[0]-e)<.001)return 0;s[0]=e,s.set(a.times,1),i.set(r.evaluate(e),0),i.set(a.values,n),o=0}else if(e>a.times[a.times.length-1]){if(Math.abs(a.times[a.times.length-1]-e)<.001)return a.times.length-1;s[s.length-1]=e,s.set(a.times,0),i.set(a.values,0),i.set(r.evaluate(e),a.values.length),o=s.length-1}else for(let c=0;c<a.times.length;c++){if(Math.abs(a.times[c]-e)<.001)return c;if(a.times[c]<e&&a.times[c+1]>e){s.set(a.times.slice(0,c+1),0),s[c+1]=e,s.set(a.times.slice(c+1),c+2),i.set(a.values.slice(0,(c+1)*n),0),i.set(r.evaluate(e),(c+1)*n),i.set(a.values.slice((c+1)*n),(c+2)*n),o=c+1;break}}return a.times=s,a.values=i,o},mergeMorphTargetTracks:function(a,e){const t=[],n={},s=a.tracks;for(let i=0;i<s.length;++i){let r=s[i];const o=d.PropertyBinding.parseTrackName(r.name),c=d.PropertyBinding.findNode(e,o.nodeName);if(o.propertyName!=="morphTargetInfluences"||o.propertyIndex===void 0){t.push(r);continue}if(r.createInterpolant!==r.InterpolantFactoryMethodDiscrete&&r.createInterpolant!==r.InterpolantFactoryMethodLinear){if(r.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."),r=r.clone(),r.setInterpolation(d.InterpolateLinear)}const f=c.morphTargetInfluences.length,g=c.morphTargetDictionary[o.propertyIndex];if(g===void 0)throw new Error("THREE.GLTFExporter: Morph target name not found: "+o.propertyIndex);let l;if(n[c.uuid]===void 0){l=r.clone();const u=new l.ValueBufferType(f*l.times.length);for(let p=0;p<l.times.length;p++)u[p*f+g]=l.values[p];l.name=(o.nodeName||"")+".morphTargetInfluences",l.values=u,n[c.uuid]=l,t.push(l);continue}const w=r.createInterpolant(new r.ValueBufferType(1));l=n[c.uuid];for(let u=0;u<l.times.length;u++)l.values[u*f+g]=w.evaluate(l.times[u]);for(let u=0;u<r.times.length;u++){const p=this.insertKeyframe(l,r.times[u]);l.values[p*f+g]=r.values[u]}}return a.tracks=t,a},toFloat32BufferAttribute:function(a){const e=new d.BufferAttribute(new Float32Array(a.count*a.itemSize),a.itemSize,!1);if(!a.normalized&&!a.isInterleavedBufferAttribute)return e.array.set(a.array),e;for(let t=0,n=a.count;t<n;t++)for(let s=0;s<a.itemSize;s++)e.setComponent(t,s,a.getComponent(t,s));return e}},I.defineComponent({__name:"TerrainGenerator",props:{terrainSize:{},segments:{},heightScaling:{},terrainColor:{},backgroundColor:{},noiseType:{},texturePaths:{},noiseScale:{}},setup(a){const e=a,t=I.ref(null);let n,s,i,r,o;const c=new Map,f=new X;function g(u){const p=u.attributes.position.array;for(let h=0;h<p.length;h+=3){const x=p[h]*e.noiseScale,T=p[h+2]*e.noiseScale,N=f.noise2D(x,T);p[h+1]=N*e.heightScaling}u.computeVertexNormals()}function l(){const u=new _.MeshStandardMaterial({color:e.terrainColor});return Object.entries(e.texturePaths).forEach(([p,h])=>{if(h&&!c.has(h)){const T=new _.TextureLoader().load(h);c.set(h,T)}c.has(h)&&(p==="albedo"&&(u.map=c.get(h)),p==="normal"&&(u.normalMap=c.get(h)),p==="roughness"&&(u.roughnessMap=c.get(h)))}),u}function w(){new B().parse(n,p=>{const h=new Blob([JSON.stringify(p)],{type:"application/json"}),x=URL.createObjectURL(h),T=document.createElement("a");T.style.display="none",T.href=x,T.download="random_terrain.gltf",document.body.appendChild(T),T.click(),document.body.removeChild(T)})}return I.onMounted(()=>{var T;n=new _.Scene,n.background=new _.Color(e.backgroundColor),s=new _.PerspectiveCamera(75,window.innerWidth/window.innerHeight,.1,1e3),s.position.set(0,100,200),i=new _.WebGLRenderer({antialias:!0}),i.setSize(window.innerWidth,window.innerHeight),(T=t.value)==null||T.appendChild(i.domElement);const u=new _.PlaneGeometry(e.terrainSize,e.terrainSize,e.segments,e.segments);u.rotateX(-Math.PI/2),g(u);const p=l();r=new _.Mesh(u,p),n.add(r);const h=new _.DirectionalLight(16777215,1);h.position.set(500,500,500).normalize(),n.add(h);function x(){o=requestAnimationFrame(x),i.render(n,s)}x()}),I.onUnmounted(()=>{cancelAnimationFrame(o),i.dispose(),c.clear()}),(u,p)=>(I.openBlock(),I.createElementBlock("div",null,[I.createElementVNode("button",{onClick:w},"Generate & Download Terrain"),I.createElementVNode("div",{ref_key:"threeContainer",ref:t,style:{width:"100%",height:"100vh"}},null,512)]))}})});
